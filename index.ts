import express from "express"
import auth from "./routes/auth"
const app=express()

// Habilitar express.json
app.use(express.json())
const PORT=3000;

app.use("/api/",auth)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})