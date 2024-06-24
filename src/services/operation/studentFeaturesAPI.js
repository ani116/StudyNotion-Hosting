import toast from "react-hot-toast";
import { studentEndpoint } from "../apis";
import { apiConnector } from "../apiconnector";
// import rzpLogo from "../../assets/Logo/rzpLogo"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
// import { options } from "../../../server/routes/Payment";


const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoint


function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src
        
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    console.log("token given to buycourse", token)
    const toastId = toast.loading("Loading...")
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            toast.error("Razorpay SDK failed to load")
            return
        }
        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses, },{ Authorization:`Bearer ${token}`})

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }

        console.log("printing the order response", orderResponse)
        // create option
        const option = {
            key: process.env.RAZORPAY_KEY ,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "StudyNotion",
            description: "Thank you for purchasing the course",
            // image: ,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response){
                // send successful via email
                console.log("before given to sendPaymentSuccessEmail", token)
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token)

                // verify paymment
                verifyPayment({...response, courses}, token, navigate, dispatch)
            },

        }

        const paymentObject = new window.Razorpay(option)
        paymentObject.open()
        paymentObject.on("payment failed", function(response) {
            toast.error("Oops, payment failed")
            console.log(response.error)
        })

        
    } 
    catch (error) {
        console.log("Payment API error", error)
        toast.error("Could not make payment")
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response, amount, token){
    try {

        const payload = {
            orderId:response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        }

        const headers = {
            Authorization: `Bearer ${token}`
        };
        console.log("Sending payment success email with payload:", payload)

        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, payload, headers)
        
    } 
    catch (error) {
        console.log("Payment success email error", error)
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch){
    
    const toastId = toast.loading("Loading...")
    dispatch(setPaymentLoading(true))

    try {
        
        console.log("befor sending to verify", bodyData)
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {Authorization: `Bearer ${token}`})
        console.log("after sending to verify", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        
        
        toast.success("payment successfull, you are added to course")
        navigate("/dashboard/enrolledCourses")
        dispatch(resetCart())

    } 
    catch (error) {
        console.log("Payment verify error", error)
        toast.error("could not verify payment")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))

}