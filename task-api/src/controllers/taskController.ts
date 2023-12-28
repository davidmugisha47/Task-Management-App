import { RequestHandler } from "express";
import { Task } from "../models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
    let tasks = await Task.findAll();
    res.status(200).json(tasks);
}

export const createTask: RequestHandler = async (req, res, next) => {

    let newTask: Task = req.body;

    if (newTask.title) {
        let created = await Task.create(newTask);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const getTask: RequestHandler = async (req, res, next) => {
    let taskId = req.params.id;
    let task = await Task.findByPk(taskId);
    if (task) {
        res.status(200).json(task);
    }
    else {
        res.status(404).json({});
    }
}

export const updateTask: RequestHandler = async (req, res, next) => {

    let taskId = req.params.id;
    let newTask: Task = req.body;
    
    let foundTask = await Task.findByPk(taskId);
    
    if (foundTask && foundTask.taskId == newTask.taskId
        && newTask.title) {
            await Task.update(newTask, {
                where: { taskId: taskId }
            });
            res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}

export const deleteTask: RequestHandler = async (req, res, next) => {

    let taskId = req.params.id;
    let found = await Task.findByPk(taskId);
    
    if (found) {
        await Task.destroy({
                where: { taskId: taskId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}