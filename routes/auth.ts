import express from "express";
import authController from "../controllers/authController";
import { check } from "express-validator";

const router = express.Router();

// /api/login
router.post(
    "/login",
    [
        check("email", "El email es obligatorio")
            .isEmail().withMessage("Debe ser un email válido")
            .isLength({ min: 5, max: 50 }).withMessage("El email debe tener entre 5 y 50 caracteres"),
        check("password", "El password es obligatorio").not().isEmpty()
    ],
    authController.login
);

// /api/register
router.post(
    "/register",
    [
        check("name", "El nombre es obligatorio").not().isEmpty().isLength({ max: 50 }).withMessage("El nombre no puede tener más de 50 caracteres"),
        check("email", "El email es obligatorio")
            .isEmail().withMessage("Debe ser un email válido")
            .isLength({ min: 5, max: 50 }).withMessage("El email debe tener entre 5 y 50 caracteres"),
        check("password", "El password debe tener al menos 6 caracteres")
            .isLength({ min: 6 }).withMessage("El password debe tener al menos 6 caracteres")
            .isLength({ max: 100 }).withMessage("El password no puede tener más de 100 caracteres")
    ],
    authController.register
);

// /api/logout
router.post("/logout", authController.logout);

export default router;
