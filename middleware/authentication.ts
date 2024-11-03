import { NextFunction, Response } from "express"
import { CustomRequest } from "../interfaces/CustomRequest"
import {verify} from "jsonwebtoken"
require('dotenv').config()

const authentication=(req:CustomRequest,res:Response,next:NextFunction)=>{
    // Leer el Token del header
    const token=req.header("x-auth-token")

    //Revisar si no hay token
    if(!token) {
        res.status(400).json({msg:"No hay Token"})
        return
    }

    // Validar el Token
    try {
        const cifrado=verify(token,`${process.env.SECRET_KEY}`)
        // Verificar que 'cifrado' es de tipo JwtPayload y tiene la propiedad 'user'
        if (typeof cifrado !== 'string' && cifrado.user) {
            req.user = cifrado.user;
        }
        next();
    } catch (error) {
        res.status(401).json({msg:"Token no valido"})
    }
}

export default authentication;