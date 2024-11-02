import { Request, Response } from "express";


const login=async(req:Request,res:Response)=>{
    res.send(req.body)
}
const register=async(req:Request,res:Response)=>{
    res.send(req.body)
}
const logout=async(req:Request,res:Response)=>{
    res.send(req.body)
}

export default {
    login,logout,register
}