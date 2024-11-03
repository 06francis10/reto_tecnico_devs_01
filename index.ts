import express from "express"
import auth from "./routes/auth"
import connect from "./config/db"
import task from "./routes/task"
require('dotenv').config()

const app=express()

connect()
// Habilitar express.json
app.use(express.json())
const PORT=process.env.PORT;

app.use("/api/",auth)
app.use("/api/tasks",task)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})