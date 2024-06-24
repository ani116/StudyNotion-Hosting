
import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";


const {
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    SIGNUP_API,
    SENDOTP_API,
    LOGIN_API
} = endpoints

export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) => {
         
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {email}) // email is taken because in backend you fetch the email using req.body.email

            console.log("RESET PASSword is successffull", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            
            setEmailSent(true)

            toast.success("Email Sent")

        } 
        catch (error) {
            console.log("Reset password token error", error)
            toast.error("Error in Sending The Email")
        }
        dispatch(setLoading(false))
    }
}

export function getresetPassword(password, confirmPassword, token){
    return async(dispatch) => {
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token})

            console.log("Reset Password Response", response)

            if(!response.data.success)
            {
                throw new Error(response.data.message)   
            }

            toast.success("Password Reset Successfull")
        } 
        catch (error) {
            console.log("Reset password token error", error)
            toast.error("Unable to Reset Password")
        }
        dispatch(setLoading(false))
    }
}

export function signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate){
    return async(dispatch) => {
        dispatch(setLoading(true))
        
        try {
            const response = await apiConnector("POST", SIGNUP_API, {accountType, firstName, lastName, email, password, confirmPassword, otp})
            
            console.log("Reset Password Response", response)

            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }

            toast.success("sign up successfully")

        } 
        catch (error) {
            console.log("sign up error", error)
            toast.error("sign up error")
            navigate("/signup")
        }
        dispatch(setLoading(false))
    }
}

export function sendOtp(email, navigate){
    return async(dispatch) => {

        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", SENDOTP_API, {email})

            console.log("SENDOTP API RESPONSE............", response)

            console.log(response.data.success)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        } 
        catch (error) {
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))

    }
}

export function login(email, password, navigate){
    return async(dispatch) => {
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", LOGIN_API, {email, password})

            console.log("logged in response", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Logged In Successfully")
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }))
            
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")
            
        } 
        catch (error) {
            console.log("Log in error............", error)
            toast.error("Could Not Log in")
        }
        dispatch(setLoading(false))
    }
}

export function logout(navigate){
    return async(dispatch) => 
    {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("logged out")
        navigate("/")
    }
}