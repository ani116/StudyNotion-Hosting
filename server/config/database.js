const mongoose = require("mongoose")
require("dotenv").config()

const dbconnect = () => {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })

    .then( () => console.log("Database conncection is Successfull") )

    .catch( (error) => {
        console.log("Db connection is Failed",error);
        process.exit(1)
    } )
}

module.exports = dbconnect