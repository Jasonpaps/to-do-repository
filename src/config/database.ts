import mongoose from 'mongoose';
import Todo from '../models/todo';
import { todoMockData } from '../fixtures/todoMockData';

export const connectToDatabase = async (dbUri: string) => {
  try {
    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB');
    
    // Clear and seed database
    await Todo.deleteMany({});
    console.log('Cleared existing ToDo items');
    
    await Todo.insertMany(todoMockData);
    console.log('Inserted mock ToDo items');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};
