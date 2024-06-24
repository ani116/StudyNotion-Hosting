const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Profile = require("../models/Profile")
require("dotenv").config()

// send otp
const sendOtp = async(req, res) => {
    try {
        console.log("hi")
        const {email} = req.body;
        const existenceUser = await User.findOne({email});

        if(existenceUser)
        {
            return res.status(401).json({
                success:false,
                message:"User already exist"
            })
        }

        // generate Otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        console.log("OTP generated successfully", otp);

        // check it is unique otp or not
        const check = await OTP.findOne({otp: otp})

        while(check){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            
        }

        // create entry in database 
        const otpPayload = {email, otp}
        const otpBody = await OTP.create(otpPayload)
        console.log(otpBody)
        
        res.status(200).json({
            success:true,
            message:"Otp sent successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"issue in generation of OTP"
        })
    }
}

// sign up
const signUp = async(req, res) => {
    try {
        
        const {email, firstName, lastName, password, confirmPassword, accountType, contactNumber, otp, profile} = req.body;

        if(!email || !firstName || !lastName || !password || !otp || !confirmPassword){
            res.status(401).json({
                success:false,
                message:"Please Fill all the Data"
            })
        }

        const exsistingUser = await User.findOne({email});

        if(exsistingUser)
        {
            res.status(401).json({
                success:false,
                message:"User already existed"
            })
        }

        if(password !== confirmPassword)
        {
            res.status(401).json({
                success:false,
                message:"Please enter The Same Password"
            })
        }

        // find most recent otp stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp)

        // validate Otp
        if(recentOtp.length === 0)
        {
            res.status(401).json({
                success:false,
                message:"Otp is not Generated"
            })
        }
        else if(recentOtp[0].otp !== otp)
        {
            // invalide Otp
            res.status(401).json({
                success:false,
                message:"Otp Entered is not Matched"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);


        // Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});

        const user = await User.create({
            email, 
            firstName,
            lastName,
            password:hashPassword,
            accountType:accountType,
            additionalDetails: profileDetails._id,
            approved:approved,
            contactNumber,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`  // it is used to generate dummy image

        })
        

        res.status(200).json({
            success:true,
            user,
            message:"User created successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"User is not created successfully"
        })
    }
}

// log in
const logIn = async(req, res) => {
    try {
        
        const {email, password} = req.body;

        if(!email || !password)
        {
            res.status(500).json({
                success:false,
                message:"Enter all details"
            })   
        }

        const user = await User.findOne({email}).populate("additionalDetails")

        if(!user)
        {
            res.status(500).json({
                success:false,
                message:"User is not register Please Sign up first"
            })
        }

        const plaintextPassword = String(password);
        const hashedPassword = String(user.password);

        if(await bcrypt.compare(plaintextPassword, hashedPassword))
        {
            const payload = {
                email:user.email,
                id: user._id,
                accountType: user.accountType
            } 

            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2h"})

            
            user.token = token
            user.password = undefined

            const option = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true
            }

            res.cookie("token", token, option).status(200).json({
                success:true,
                user,
                token,
                message:"user logged in successfull"
            })

        }
        else
        {
            res.status(401).json({
                success:false,
                message:"Password is not Matched"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Loggin failure Please try again",
            
        })
    }
}

// changePassword

const changePassword = async(req, res) => {
    try {
        // get data from the req body
        const userDetail = await User.findById(req.user.id) 

        //get oldPassword, newPassword, ConfirmNewPassword
        const {oldPassword, newPassword, confirmPassword} = req.body;

        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetail.password
        )

        
        if(!isPasswordMatch)
        {
            return res.status(401).json({
                success:false,
                message:"the password is incorrect"
            })
        }

        //validation
        if(newPassword !== confirmPassword)
        {
            return res.status(401).json({
                success:false,
                message:"Password is not matched"
            })
        }
        if(oldPassword === newPassword )
        {
            return res.status(401).json({
                success:false,
                message:"Try New Password"
            })
        }

        // hash the password
        const hashPassword = await bcrypt.hash(newPassword, 10)

        // create entry in Db
    
        const updatedUserDetails = await User.findOneAndUpdate(req.user.id, {password:hashPassword}, {new:true})

        try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}


        return res.status(200).json({
            success:true,
            message:"Password Changed successfully"
           
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Password is not Changed"
        })
    }
}


module.exports = {sendOtp, signUp, logIn, changePassword}