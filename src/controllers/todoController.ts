import { Request, Response } from 'express';
import Todo from '../models/todoModel';
import mongoose from 'mongoose'; // Import mongoose to validate ObjectId

// Create a new todo
export const createTodo = async (req: Request, res: Response) => {
  const newTodo = new Todo(req.body);
  try {
    const todo = await newTodo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ message: 'An error occurred while creating the todo. Please try again later.' });
  }
};

// Get all todos
export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ message: 'An error occurred while fetching todos. Please try again later.' });
  }
};

// Get todo by ID
export const getTodoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    console.error('Error fetching todo:', err);
    res.status(500).json({ message: 'An error occurred while fetching the todo. Please try again later.' });
  }
};

// Update todo by ID
export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ message: 'An error occurred while updating the todo. Please try again later.' });
  }
};

// Delete todo by ID
export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ message: 'An error occurred while deleting the todo. Please try again later.' });
  }
};
