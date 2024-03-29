"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const task_1 = require("../models/task");
const getAllTasks = async (req, res, next) => {
    let tasks = await task_1.Task.findAll();
    res.status(200).json(tasks);
};
exports.getAllTasks = getAllTasks;
const createTask = async (req, res, next) => {
    let newTask = req.body;
    if (newTask.title) {
        let created = await task_1.Task.create(newTask);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createTask = createTask;
const getTask = async (req, res, next) => {
    let taskId = req.params.id;
    let task = await task_1.Task.findByPk(taskId);
    if (task) {
        res.status(200).json(task);
    }
    else {
        res.status(404).json({});
    }
};
exports.getTask = getTask;
const updateTask = async (req, res, next) => {
    let taskId = req.params.id;
    let newTask = req.body;
    let foundTask = await task_1.Task.findByPk(taskId);
    if (foundTask && foundTask.taskId == newTask.taskId
        && newTask.title) {
        await task_1.Task.update(newTask, {
            where: { taskId: taskId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res, next) => {
    let taskId = req.params.id;
    let found = await task_1.Task.findByPk(taskId);
    if (found) {
        await task_1.Task.destroy({
            where: { taskId: taskId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteTask = deleteTask;
