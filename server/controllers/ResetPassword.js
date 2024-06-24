const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

// resetPassword Token
const resetPasswordToken = async(req, res) => {
    try {
        
        // get email from the body
        const email = req.body.email;

        // check user for this email
        const user  = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success:false, 
                message:"You are not register with us"
            })
        }

        // generate token using crypto method
        const token  = crypto.randomUUID()    // this token is user to fetch the data 

        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email:email}, {token:token , resetPasswordExpires: Date.now() + 5*60*100}, {new:true})

        // create url
        const url = `https://localhost:3000/update-password/${token}`

        // send mail containing the url
        await mailSender(email, "Password reset Link", `password Reset Link:${url}`)

        return res.status(200).json({
            success:true,
            message:"email successfull, please Check email and change password"
        })

        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"something error in reseting the password"
        })
    }
}

// resetPassword
const resetPassword = async(req, res) => {
    try {
        
            // data fetch
            const {password, confirmPassword, token} = req.body;

            // validation
            if(password !== confirmPassword)
            {
                return res.status(401).json({
                success:false,
                message:"password it not mathced"
            })
            }

            // get user detail from db using Token
            const userDetail = await User.findOne({token: token});

            // if no entry - invalid token
            if(!userDetail)
            {
                return res.status(401).json({
                    success:false,
                    message:"Token is invalid"
                })
            }

            // token time check
            if(userDetail.resetPasswordExpires > Date.now())
            {
                return res.status(401).json({
                    success:false,
                    message:"Time Expired"
                })
            }

            // hash password
            const hashPassword = await bcrypt.hash(password, 10);

            // password update
            await User.findOneAndUpdate({token:token}, {password:hashPassword}, {new:true})

            return res.status(200).json({
                success:true,
                message:"Password is reseted Successfully"
            })

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"password is not changed"
        })
    }
}



module.exports = {resetPasswordToken, resetPassword}