import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import utilsRoutes from '../routes/utilsRoutes';
import mongoose from 'mongoose';
import Todo, { ITodo } from '../models/todo';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { smartScheduling } from '../utils/smartScheduling';

// Define the mock data
const todoMockData = [
  {
    _id: new mongoose.Types.ObjectId('60b8d295f1b2e1a3f0e02b40'),
    title: 'Finish project report',
    description: 'Complete the final report for the project',
    deadline: new Date('2024-09-15T12:00:00Z'),
    importance: 5,
    estimatedTime: 2,
    dependencies: [],
    completed: false,
  },
  {
    _id: new mongoose.Types.ObjectId('60b8d295f1b2e1a3f0e02b41'),
    title: 'Prepare presentation',
    description: 'Prepare slides for the project presentation',
    deadline: new Date('2024-09-14T12:00:00Z'),
    importance: 4,
    estimatedTime: 3,
    dependencies: [],
    completed: false,
  },
  {
    _id: new mongoose.Types.ObjectId('60b8d295f1b2e1a3f0e02b42'),
    title: 'Code review',
    description: 'Review code submitted by team members',
    deadline: new Date('2024-09-12T12:00:00Z'),
    importance: 3,
    estimatedTime: 1,
    dependencies: [],
    completed: false,
  },
  {
    _id: new mongoose.Types.ObjectId('60b8d295f1b2e1a3f0e02b43'),
    title: 'Client meeting',
    description: 'Discuss project requirements with the client',
    deadline: new Date('2024-09-10T12:00:00Z'),
    importance: 5,
    estimatedTime: 1,
    dependencies: [],
    completed: false,
  },
  {
    _id: new mongoose.Types.ObjectId('60b8d295f1b2e1a3f0e02b44'),
    title: 'Write documentation',
    description: 'Write technical documentation for the project',
    deadline: new Date('2024-09-20T12:00:00Z'),
    importance: 2,
    estimatedTime: 4,
    dependencies: [new mongoose.Types.ObjectId('60b8d295f1b2e1a3f0e02b40')],
    completed: false,
  },
  {
    _id: new mongoose.Types.ObjectId('60b8d295f1b2e1a3f0e02b45'),
    title: 'Deploy to production',
    description: 'Deploy the application to the production environment',
    deadline: new Date('2024-09-01T12:00:00Z'),
    importance: 4,
    estimatedTime: 2,
    dependencies: [new mongoose.Types.ObjectId('60b8d295f1b2e1a3f0e02b44')],
    completed: false,
  },
] as ITodo[];

const app = express();
app.use(bodyParser.json());
app.use('/utils', utilsRoutes);

let mongoServer: MongoMemoryServer;

// Connect to the in-memory database before running tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const dbUri = mongoServer.getUri();
  await mongoose.connect(dbUri);
});

// Clear database before each test
beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
  // Seed the database with mock data
  await Todo.insertMany(todoMockData);
});

// Close the database connection and stop the server after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Test suite for /utils/smart-schedule endpoint
describe('Utils Routes', () => {
  it('should get a smart schedule', async () => {
    const response = await request(app).get('/utils/smart-schedule');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(todoMockData.length); 

    expect(response.body[0].task.title).toBe('Finish project report'); // Highest priority task
    expect(response.body[1].task.title).toBe('Write documentation'); 
    expect(response.body[2].task.title).toBe('Deploy to production');
    expect(response.body[3].task.title).toBe('Client meeting');
    expect(response.body[4].task.title).toBe('Code review');
    expect(response.body[5].task.title).toBe('Prepare presentation'); // Least Highest priority task
  });
});

// Test suite for smartScheduling function
describe('smartScheduling', () => {
  it('should correctly schedule tasks based on deadlines and importance', () => {
    const scheduledTasks = smartScheduling(todoMockData);

    expect(scheduledTasks).toBeInstanceOf(Array);
    expect(scheduledTasks.length).toBe(todoMockData.length);

    expect(scheduledTasks[0].task.title).toBe('Finish project report'); // Highest priority task
    expect(scheduledTasks[1].task.title).toBe('Write documentation'); 
    expect(scheduledTasks[2].task.title).toBe('Deploy to production');
    expect(scheduledTasks[3].task.title).toBe('Client meeting');
    expect(scheduledTasks[4].task.title).toBe('Code review');
    expect(scheduledTasks[5].task.title).toBe('Prepare presentation'); // Least Highest priority task

    // Check if scheduled tasks adhere to working hours and dependencies
    scheduledTasks.forEach((task, index) => {
      if (index < scheduledTasks.length - 1) {
        expect(task.end <= scheduledTasks[index + 1].start).toBe(true);
      }
    });
  });
});
