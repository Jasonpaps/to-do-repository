import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Todo from "../models/todo";

const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

// Helper function that chekcs if dependencies exist
const checkDependenciesExist = async (dependencies: mongoose.Types.ObjectId[]): Promise<boolean> => {
  const existingDependencies = await Todo.find({ _id: { $in: dependencies } });
  return existingDependencies.length === dependencies.length;
};

// Validation for Create Todo
export const validateTodo = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    description,
    deadline,
    importance,
    estimatedTime,
    dependencies,
    completed,
  } = req.body;

  // Basic Validation
  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "Invalid title. It must be a non-empty string." });
  }
  if (!description || typeof description !== "string") {
    return res.status(400).json({ message: "Invalid description. It must be a non-empty string." });
  }
  if (!deadline || isNaN(new Date(deadline).getTime())) {
    return res.status(400).json({ message: "Invalid deadline. It must be a valid date." });
  }
  if (typeof importance !== "number" || importance < 1 || importance > 5) {
    return res.status(400).json({ message: "Invalid importance. It must be a number between 1 and 5." });
  }
  if (typeof estimatedTime !== "number" || estimatedTime <= 0) {
    return res.status(400).json({ message: "Invalid estimatedTime. It must be a positive number." });
  }
  if (!Array.isArray(dependencies) || !dependencies.every(isValidObjectId)) {
    return res.status(400).json({ message: "Invalid dependencies. All dependencies must be valid ObjectIds." });
  }
  if (typeof completed !== "boolean") {
    return res.status(400).json({ message: "Invalid completed status. It must be a boolean value." });
  }

  // Dependencies must exist in DB
  if (!(await checkDependenciesExist(dependencies))) {
    return res.status(404).json({ message: "One or more dependencies do not exist." });
  }

  next();
};

// Validation if Id passed has the MongoDB format
export const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  next();
};

// Validation for Update Todo
export const validateUpdateTodo = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    description,
    deadline,
    importance,
    estimatedTime,
    dependencies,
    completed,
  } = req.body;

  // Partial Update is available, hence check if fields exist
  if (title && typeof title !== "string") {
    return res.status(400).json({ message: "Invalid title. It must be a string." });
  }
  if (description && typeof description !== "string") {
    return res.status(400).json({ message: "Invalid description. It must be a string." });
  }
  if (deadline && isNaN(new Date(deadline).getTime())) {
    return res.status(400).json({ message: "Invalid deadline. It must be a valid date." });
  }
  if (importance !== undefined && (typeof importance !== "number" || importance < 1 || importance > 5)) {
    return res.status(400).json({ message: "Invalid importance. It must be a number between 1 and 5." });
  }
  if (estimatedTime !== undefined && (typeof estimatedTime !== "number" || estimatedTime <= 0)) {
    return res.status(400).json({ message: "Invalid estimatedTime. It must be a positive number." });
  }
  if (dependencies !== undefined && (!Array.isArray(dependencies) || !dependencies.every(isValidObjectId))) {
    return res.status(400).json({ message: "Invalid dependencies. All dependencies must be valid ObjectIds." });
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ message: "Invalid completed status. It must be a boolean value." });
  }

  // Dependencies must exist in DB
  if (dependencies && !(await checkDependenciesExist(dependencies))) {
    return res.status(404).json({ message: "One or more dependencies do not exist." });
  }

  next();
};
