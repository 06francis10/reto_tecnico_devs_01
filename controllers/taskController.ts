import { Response } from "express"
import { CustomRequest } from "../interfaces/CustomRequest"

const create=(req:CustomRequest,res:Response)=>{
    res.send(req.body)
}
const getTaks=(req:CustomRequest,res:Response)=>{
    res.send(req.body)
}
const update=(req:CustomRequest,res:Response)=>{
    res.send(req.body)
}
const destroy=(req:CustomRequest,res:Response)=>{
    res.send(req.body)
}
export default {
    create, getTaks, update, destroy
}