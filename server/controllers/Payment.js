const {instance} = require("../config/razorpay")
const Course = require("../models/Course")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentEmail")
const { default: mongoose } = require("mongoose")
const { verify } = require("jsonwebtoken")
const crypto = require("crypto")
const CourseProgress = require("../models/CourseProgress")



// initiate the razorpay order
exports.capturePayment = async(req, res) => {

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.status(401).json({
            success:false,
            message:"Please provide the courseId"
        })
    }

    let totalAmount = 0;
    for(const course_id of courses){
        let course;
        try {
            course = await Course.findById(course_id)
            if(!course){
                return res.status(401).json({
                    success:false,
                    message:"could not find the courses"
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(401).json({
                    success:false,
                    message:"Student is already enrolled"
                })
            }

            totalAmount += course.price
        } 
        catch (error) {
            console.log(error)
            return res.status(401).json({
                success:false,
                message:error.message
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt:Math.random(Date.now()).toString()

    }

    // creating order
    try {
        const paymentResponse = await instance.orders.create(options)
        res.json({
            success:true,
            message:paymentResponse
        })
    } 
    catch (error) {
        console.log(error)
        return res.status(401).json({
            success:false,
            message:"could not initiate order"
        })
    }

}

// verify the Payment
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const {courses} = req.body?.courses
    const userId = req.user.id

    if(!userId){
        return res.status(401).json({
            success:false,
            message:"please provide the user"
        })
    }

    if( !razorpay_order_id || 
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ){
        return res.status(401).json({
            success:false,
            message:"Payment failed 1 please provide all the detail"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex")

    if(expectedSignature = razorpay_signature){
        // enroll the student
        await enrolledStudents(courses, userId, res)

        // return the responst
        return res.status(200).json({
            success:true,
            message:"Payment Varified"
        })
    }
    return res.status(401).json({
        success:false,
        message:"Payment Failed"
    })
}


const enrolledStudents = async(courses, userId, res) => {
    if(
        !courses ||
        !userId      
    )
    {
        return res.status(401).json({
            success:false,
            message:"Please provide the data for course and user"
        })
    }

    for(const courseId of courses){
        try {
            
            // find the courses and add the user in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {id:courseId},
                {$push:{studentEnrolled:userId}},
                {new:true}
            )

            if(!enrolledCourse){
                return res.status(401).json({
                    success:false,
                    message:"course not found"
                })
            }

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
              })

            // find the user and insert the course in it
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push:{
                        courses:courseId,
                        courseProgress:courseProgress
                    }
                },
                {new:true}
            )
            if(!enrolledStudent){
                return res.status(401).json({
                    success:false,
                    message:"user not found"
                })
            }

            // send email to student
            const emailResponse = await mailSender(
                enrolledStudents.email,
                `Successfully enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
            )

            // console.log("email send Successfully", emailResponse.response)


        } 
        catch (error) {
            console.log(error)
            return res.status(401).json({
                success:false,
                message:error.message
            })
        }
    }

    

    
}

exports.sendPaymentSuccessEmail = async(req, res) => {

    const {orderId, paymentId, amount} = req.body
    const {userId} = res.user || req.user.id
    console.log("Request Body:", req.body);
    console.log("the user id in backend",userId)

    if(!orderId){
        return res.status(404).json({
            success:false,
            message:"Please Provide orderId"
        })
    }
    if(!paymentId){
        return res.status(404).json({
            success:false,
            message:"Please Provide paymentId"
        })
    }
    if(!amount){
        return res.status(404).json({
            success:false,
            message:"Please Provide amount"
        })
    }
    if(!userId){
        return res.status(404).json({
            success:false,
            message:"Please Provide user"
        })
    }

    try {
        
        const enrolledStudent = await User.findById(userId)
        await mailSender(
                enrolledStudent.email,
                "Payment Recieved",
                paymentSuccessEmail(`${enrolledStudent.firstName}`,
                amount/100, orderId, paymentId
            )
        )

    } 
    catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:"could Not Send Email"
        })
    }
}



// capture the payment and initiate the Razorpay Order
// exports.capturePayment = async (req, res) => {
    
//     // get courseId and UserId
//     const {courseId} = req.body;
//     const {userId} = req.user.id;
//     let course  = await Course.findById({courseId})
//     // validation
//     if(!courseId, !userId)
//     {
//         return res.status(401).json({
//             success:false,
//             message:"Enter the Valid detail"
//         })
//     }

//     try {
        
//         // valid courseDetails
        
//         if(!course)
//         {
//             return res.status(401).json({
//                 success:false,
//                 message:"Course id is not recognized"
//             })
//         }

//         // validate student already purchased the course
//         const uid = new mongoose.Types.ObjectId(userId)     // it will convert userId into Object from string

//         if(course.studentEnrolled.includes(uid))
//         {
//             return res.status(401).json({
//                 success:false,
//                 message:"student is already enrollled"
//             })        
        
//         }

        


//     }
//      catch (error) {
//         return res.status(401).json({
//             success:false,
//             message: console.log(error)
//         }) 
//     }

//     // Create Order
//     const amount = course.price;
//     const currency = "INR";

//     const option = {
//         amount : amount * 100,    // mandatory
//         currency : currency,      // mandatory
//         notes:{
//             courseId: courseId,
//             userId
//         }

//     } 

//     try {
        
//         // initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(option)
//         console.log(paymentResponse)

//         return res.status(200).json({
//             success:true, 
//             courseName: course.courseName,
//             orderId: paymentResponse.id,
//             amount:paymentResponse.amount / 100,
//             message:"Payment successFull"
//         }) 

//     } 
//     catch (error) {
//         return res.status(401).json({
//             success:false,
//             message: "could Not initiate the order"
//         }) 
//     }
// }

// // (signature Authorization)
// // verify signature of server and razorpay , Add the course
// exports.verifySignature = async(req, res) => {
//     const webHookSecret = "12345678";

//     const signature = req.headers["x-razorpay-signature"]

//     // converting the webhooksecret into the signature format

//     crypto.createHmac("shah256", webHookSecret)   // creating webhooksecret key in a encripted format

//     shasum.update(JSON.stringify(req.body))  // converting it to string

//     const digest = shasum.digest("hex")  // digest into the hex value

//     if (signature === digest) 
//     {
//         console.log("payment is authorized")

        
//         // now payment is done your next tast is to show the purchased course in the User or student Ui
//         // now we have to fetch the courseId and UserId => 
//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try {
            
//             // find the course and add the user(student) in the enrolled courses
//             const enrolledCourse = await Course.findOneAndUpdate(
//                                                                     {_id: courseId},
//                                                                     {   $push:{
//                                                                             studentEnrolled: userId
//                                                                         }
//                                                                     }, 
//                                                                     {new:true}
//                                                                     )
            
//             // find the student and add the course to their enrolled course list
//              const enrolledStudent = await User.findOneAndUpdate(
//                                                                     {_id: userId},
//                                                                     {
//                                                                         $push: {
//                                                                             courses: courseId
//                                                                         }
//                                                                     },
//                                                                     {new: true}
//              )

//              // send the confirmation email
//              const emailResponse = await mailSender(
//                                                         enrolledStudent.email,
//                                                         "Congratulation From StudyNotion",
//                                                         "Congratulation you are onBoarded to new StudyNotion Course",

//              )

//              console.log(emailResponse)

//              return res.status(200).json({
//                 success:true,
//                 message:"Signature verified and Course Added"
//              })
//         } 
        
//         catch (error) {
//             return res.status(200).json({
//                 success:false,
//                 message: console.log(error)
//              })
//         }
        

//     }
//     else
//     {
//         return res.status(200).json({
//             success:false,
//             message: "Sorry Secret Key is Not Mathced"
//          })
//     }
// }
