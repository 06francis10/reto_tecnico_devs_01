import express from "express"

const router=express.Router()

// /api/login
router.post("/login",(req,res)=>{
    res.send(req.body)
})
// /api/register
router.get("/register",(req,res)=>{
    res.send(req.body)
})
// /api/logout
router.get("/logout",(req,res)=>{
    res.send(req.body)
})

export default router;