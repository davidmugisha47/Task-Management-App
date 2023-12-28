import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/taskController";

const router = Router();

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTask)
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;