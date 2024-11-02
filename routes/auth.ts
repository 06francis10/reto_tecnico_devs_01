import express from "express"
import authController from "../controllers/authController"
const router=express.Router()

// /api/login
router.post("/login",authController.login)
// /api/register
router.get("/register",authController.register)
// /api/logout
router.get("/logout",authController.logout)

export default router;