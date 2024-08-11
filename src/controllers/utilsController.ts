// ROUTE: /utils

import { Request, Response } from "express";
import Todo from "../models/todo";
import { smartScheduling } from "../utils/smartScheduling";

export const smartSchedule = async (req: Request, res: Response) => {
  // Get all the incomplete tasks and feed the smartSchedul function
  try {
    const todos = await Todo.find({ completed: false });
    const scheduledTasks = smartScheduling(todos);
    res.json(scheduledTasks);
  } catch (err) {
    console.error('Error in smartSchedule:', err)
    res.status(500).json({message: 'An error occured while processing a smart schedule. Please try again later.'});
  }
};
