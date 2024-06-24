const jwt = require("jsonwebtoken")
require("dotenv").config()


// auth
const auth = async (req, res, next) => {
    try {
        
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");

        console.log("tokken is ", token)

        if(!token || token === undefined)
        {
            res.status(400).json({
                success:false,
                message:"token is missing "
            })
        }

        try {
            
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode
            next()
        } catch (error) {
            res.status(401).json({
                success:false,
                message:"Token is inValid",
                error:console.log(error)
            })
        }
        

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something Went wrong, while verifying the token ",
            error: console.log(error)
        })
    }
}

//isStudent
const isStudent = async (req, res, next) => {
    try {
        
        if(req.user.accountType !== "Student")
        {
            res.status(401).json({
                success:false,
                message:"This is proctected Route for Student"
            })
        }

        next()
    } catch (error) {
        res.status(401).json({
            success:false,
            message:"User cannot be verified"
        })
    }
}

// isInstructor
const isInstructor = async(req, res, next) => {
    try {
        
        if(req.user.accountType !== "Instructor")
        {
            res.status(401).json({
                success:false,
                message:"This is proctected Route for Instructor"
            })
        }

        next()
    } catch (error) {
        res.status(401).json({
            success:false,
            message:"User cannot be verified"
        })
    }
}

//isAdmin
const isAdmin = async(req, res, next) => {
    try {
        
        if(req.user.accountType !== "Admin")
        {
            res.status(401).json({
                success:false,
                message:"This is proctected Route for Admin"
            })
        }

        next()
    } catch (error) {
        res.status(401).json({
            success:false,
            message:"User cannot be verified"
        })
    }
}


module.exports = { auth, isStudent, isInstructor, isAdmin}