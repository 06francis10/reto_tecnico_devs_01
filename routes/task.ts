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
        check("title","El titulo el obligatorio").not().isEmpty(),
        check("description","La descripcion el obligatorio").not().isEmpty(),
        check("status","el estado debe se Pendiente | En Progreso | Completa").isIn(['Pendiente','En Progreso','Completa']),
        check("dueDate","El campo debe ser una fecha").isDate(),
    ],
    taskController.create)

// api/tasks/{id} (actualizar tarea)
router.put("/:id",
    authentication,
    [
        check("id","EL id del proyecto no es valido").isLength({min:24}),
        check("status","El estado debe ser Pendiente | En Progreso | Completa").isIn(['Pendiente','En Progreso','Completa']),
    ],
    taskController.update)
// api/tasks/{id} (eliminar tarea)
router.delete("/:id",
    authentication,
    [
        check("id","EL id del proyecto no es valido").isLength({min:24}),
    ],
    taskController.destroy)

export default router