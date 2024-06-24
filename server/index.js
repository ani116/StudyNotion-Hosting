const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT || 4000
const dbconnect = require("./config/database")
const cloudinaryConnect = require("./config/cloudinary")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const fileUpload = require("express-fileupload")  // usage => When you upload a file, the file will be accessible from req.files.

const userRoute = require("./routes/User")
const courseRoute = require("./routes/Course")
const paymentRoute = require("./routes/Payment")
const profileRoute = require("./routes/Profile")
const contactRoute = require("./routes/Contact")


// dbConnection 
dbconnect();


// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: "http://localhost:3000"    // the request coming from frontend, we have to entertaint it
    }
))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
}))

// cloudinary connection
cloudinaryConnect();

// api router
app.use("/api/v1/auth", userRoute)
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/profile", profileRoute)
app.use("/api/v1/payment", paymentRoute)
app.use("/api/v1/contactus", contactRoute)


// def route
app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:"your server is up and running"
    })
})

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}` )
})