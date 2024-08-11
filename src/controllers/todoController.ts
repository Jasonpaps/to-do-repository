// ROUTE: /todos

import { Request, Response } from "express";
import Todo from "../models/todo";
import { broadcast } from "../config/websocket";
import {
  validateTodo,
  validateObjectId,
  validateUpdateTodo,
} from "../middleware/validationMiddleware";

// Create a new todo
export const createTodo = [
  validateTodo,
  async (req: Request, res: Response) => {
    const {
      title,
      description,
      deadline,
      importance,
      estimatedTime,
      dependencies,
      completed,
    } = req.body;

    try {
      const newTodo = new Todo({
        title,
        description,
        deadline,
        importance,
        estimatedTime,
        dependencies,
        completed,
      });

      const todo = await newTodo.save();

      // Websocket - Broadcast the new todo to all clients
      broadcast("create", { todo: newTodo });

      res.status(201).json(todo);
    } catch (err) {
      console.error("Error creating todo:", err);
      res.status(500).json({
        message:
          "An error occurred while creating the todo. Please try again later.",
      });
    }
  },
];

// Get all todos
export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({
      message:
        "An error occurred while fetching todos. Please try again later.",
    });
  }
};

// Get todo by ID
export const getTodoById = [
  validateObjectId,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const todo = await Todo.findById(id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } catch (err) {
      console.error("Error fetching todo:", err);
      res.status(500).json({
        message:
          "An error occurred while fetching the todo. Please try again later.",
      });
    }
  },
];

// Update todo by ID
export const updateTodo = [
  validateObjectId,
  validateUpdateTodo,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      // Websocket - Broadcast the new todo to all clients
      broadcast("update", { todo });

      res.json(todo);
    } catch (err) {
      console.error("Error updating todo:", err);
      res.status(500).json({
        message:
          "An error occurred while updating the todo. Please try again later.",
      });
    }
  },
];

// Delete todo by ID
export const deleteTodo = [
  validateObjectId,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      // Websocket - Broadcast the new todo to all clients
      broadcast("delete", { todo });

      res.json({ message: "Todo deleted successfully" });
    } catch (err) {
      console.error("Error deleting todo:", err);
      res.status(500).json({
        message:
          "An error occurred while deleting the todo. Please try again later.",
      });
    }
  },
];
