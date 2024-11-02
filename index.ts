import express from "express"
import auth from "./routes/auth"
import connect from "./config/db"
require('dotenv').config()

const app=express()

connect()
// Habilitar express.json
app.use(express.json())
const PORT=process.env.PORT;

app.use("/api/",auth)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})