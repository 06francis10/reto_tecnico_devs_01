import { Response } from "express"
import { CustomRequest } from "../interfaces/CustomRequest"
import { validationResult } from "express-validator";
// import User from "../models/User";
import Task from "../models/Task";

const create = async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errores: errors.array() })
        return;
    }
    try {
        if (req.user.role === "user" || req.user.role === undefined) {
            res.status(403).json({ msg: "No tiene permiso para realizar la accion" })
            return
        }
        const task = new Task(req.body);
        task.assignedTo = req.user.id;
        task.save()
        res.status(200).json({
            msg: "Tarea Creada Correctamente",
            task
        })
    } catch (error) {
        console.log(error)
        res.status(400).send("Hubo un error")
    }
}

const getTaks = async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errores: errors.array() })
        return;
    }
    try {
        const tasks = await Task.find()
        res.send(tasks)
    } catch (error) {
        console.log(error)
        res.status(400).send("Hubo un error")
    }
}

const update = async (req: CustomRequest, res: Response) => {

    // Verificar si existen errores en el request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errores: errors.array() })
        return;
    }

    try {
        const task = await Task.findById(req.params.id)
        // Verificar si la tarea existe
        if (!task) {
            res.status(404).json({ msg: "No se ha encontrado el registro" })
            return
        }
        // Verificar si la tarea te pertenece
        if (task.assignedTo.toString() !== req.user.id) {
            res.status(403).json({ msg: "La tarea no le pertenece" })
            return
        }
        // Actualizado el estado de la tarea
        task.status = req.body.status;
        task.save()
        res.json({ msg: "Registro Actualizado correctamente", task })
    } catch (error) {
        console.log(error)
        res.status(400).send("Hubo un error")
    }
}

const destroy = async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errores: errors.array() })
        return;
    }
    try {


        // verificar si es admin
        if (req.user.role !== "admin") {
            res.status(403).json({ msg: "No tiene permiso para realizar la accion" })
        }
        // verificar si el task existe
        const task=await Task.findById(req.params.id)
        if(!task){
            res.status(404).json({msg:"El registro no existe"})
            return
        }
        await Task.deleteOne({_id:req.params.id})
        res.json({msg:"Registro eliminado correctamente"})
    } catch (error) {

    }
}

export default {
    create, getTaks, update, destroy
}