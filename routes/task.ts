import { Router } from "express";
import taskController from "../controllers/taskController";
import authentication from "../middleware/authentication";
import { check } from "express-validator";

const router=Router()

// api/tasks (obtener tareas)
router.get("/",
    authentication,
    taskController.getTaks)
// api/tasks (Crear nueva tarea)
router.post("/",
    authentication,
    [
        check("title", "El título es obligatorio y debe tener entre 3 y 50 caracteres")
            .isLength({ min: 3, max: 50 }),
        check("description", "La descripción es obligatoria y debe tener entre 5 y 100 caracteres")
            .isLength({ min: 5, max: 100 }),
        check("status", "El estado debe ser Pendiente | En Progreso | Completa")
            .isIn(['Pendiente', 'En Progreso', 'Completa']),
        check("dueDate", "El campo debe ser una fecha válida")
            .isDate(),
        check("id", "El id del usuario no es válido")
            .isLength({ min: 24, max: 24 }).isHexadecimal(),
    ],
    taskController.create
);


// api/tasks/{id} (actualizar tarea)
router.put("/:id",
    authentication,
    [
        check("id", "El id del proyecto no es válido")
            .isLength({ min: 24, max: 24 })
            .isHexadecimal(),
        check("status","El estado debe ser Pendiente | En Progreso | Completa")
            .isIn(['Pendiente','En Progreso','Completa']),
    ],
    taskController.update)
// api/tasks/{id} (eliminar tarea)
router.delete("/:id",
    authentication,
    [
        check("id", "El id del proyecto no es válido")
            .isLength({ min: 24, max: 24 })
            .isHexadecimal(),
    ],
    taskController.destroy)

export default router