import { Router } from "express";
import taskController from "../controllers/taskController";
import authentication from "../middleware/authentication";

const router=Router()

// api/tasks (obtener tareas)
router.get("/",
    authentication,
    taskController.getTaks)
// api/tasks (Crear nueva tarea)
router.post("/",
    authentication,
    taskController.create)
// api/tasks/{id} (actualizar tarea)
router.put("/:id",
    authentication,
    taskController.update)
// api/tasks/{id} (eliminar tarea)
router.delete("/:id",
    authentication,
    taskController.destroy)

export default router