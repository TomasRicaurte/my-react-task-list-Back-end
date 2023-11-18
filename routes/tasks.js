const express = require("express");
const tasksRouter = express.Router();
const tasksModel = require("../models/tasksModel");

tasksRouter.get("/", async (req, res) => {
  const tasks = await tasksModel.find();
  res.json(tasks);
});
tasksRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await tasksModel.findById(id);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(401).json(`La tarea con id ${id} no fue encontrada`);
  }
});
tasksRouter.post("/", async (req, res) => {
  const reqTask = req.body;
  console.log(reqTask)
  const newTask = new tasksModel(reqTask);
  newTask.save();
  res.status(201).json(`La tarea ${newTask.title} creada con exito`);
});
tasksRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  const updateTaks = await tasksModel.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true }
  );
  if (updateTaks) {
    res.status(200).json(updateTaks);
  } else {
    res.status(401).json(`La tarea con id ${id} no fue encontrada`);
  }
});
tasksRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteTask = await tasksModel.findByIdAndDelete(id);
  if (deleteTask) {
    res
      .status(200)
      .json(`La tarea con id ${id} fue eliminada del servidor ${deleteTask}`);
  } else {
    res.status(401).json(`La tarea con id ${id} no fue elimanada`);
  }
});

module.exports = tasksRouter;
