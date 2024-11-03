import express from "express"
import authController from "../controllers/authController"
import { check } from "express-validator"
import authentication from "../middleware/authentication"

const router=express.Router()

// /api/login
router.post("/login",
    [
        check("email","Agregar un email válido").isEmail(),
        check("password","El password debe ser minimo de 6 caracteres").isLength({min:6})
    ],
    authController.login)
// /api/register
router.post("/register",
    [
        check("name","Agregar un email válido").not().isEmpty(),
        check("email","Agregar un email válido").isEmail(),
        check("password","El password debe ser minimo de 6 caracteres").isLength({min:6}),
        check("role","rol must be admin | user").isIn(['user','admin']),
    ],
    authController.register)
// /api/logout
router.post("/logout",authController.logout)

// /api/user
router.get("/user",authentication, authController.getAuthUser)

export default router;