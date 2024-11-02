import mongoose from "mongoose";
require('dotenv').config()
const connect=async()=>{
    try {
        await mongoose.connect(`${process.env.DB_MONGO}`)
        console.log("MongooDB Connection Success")
    } catch (error) {
        console.log(error)
        process.exit(1) // Detener la app
    }
}
export default connect;