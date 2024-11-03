import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import { CustomRequest } from "../interfaces/CustomRequest";
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errores: errors.array() })
        return;
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ msg: "El usuario o contraseña no es correcto" })
            return;
        }
        const passCorrect = await bcryptjs.compare(password, user.password)
        if (!passCorrect) {
            res.status(400).json({ msg: "El usuario o contraseña no es correcto" })
            return
        }
        // si todo es correcto, Crear y firmar el json web token
        const payload = {
            user: {
                id: user.id
            }
        }
        // Firmar el token
        jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn:3600
        },(error: Error | null, token: string | undefined)=>{
            if(error) throw error
            // Mensaje de confirmacion;
            res.json({token})
        })
    } catch (error) {
        console.log(error)
        res.status(400).send("Hubo un error")
    }
}

const register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errores: errors.array() })
        return;
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (user) {
            res.status(400).json({ msg: "El usuario ya existe" })
            return;
        }
        user = new User(req.body);

        //
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt)
        // Guardar el nuevo usuario
        await user.save();
        // Crear y firmar el json web token
        const payload = {
            user: {
                id: user.id
            }
        }
        // Firmar el token
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 86400
        }, (error: Error | null, token: string | undefined) => {
            if (error) throw error
            // Mensaje de confirmacion;
            res.json({ token })
        })
    } catch (error) {
        console.log(error)
        res.status(400).send("Hubo un error")
    }
}

const logout = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errores: errors.array() })
        return;
    }
    res.send(req.body)
}

const getAuthUser=async(req:CustomRequest,res:Response)=>{
    try {
        const user=await User.findById(req.user.id).select("-password")
        res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Hubo un error"})
    }
}

export default {
    login, logout, register, getAuthUser
}