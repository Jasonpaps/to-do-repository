import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import todoRoutes from "../routes/todoRoutes";
import mongoose from "mongoose";
import Todo from "../models/todo";
import { MongoMemoryServer } from "mongodb-memory-server";
import { authMiddleware } from "../middleware/authMiddleware";
import { IUser } from "../models/user";

// Mock websocket middleware
jest.mock('../config/websocket', () => ({
    broadcast: jest.fn(),
    setupWebSocketServer: jest.fn(),
  }));
  
// Mock authentication middleware
jest.mock("../middleware/authMiddleware", () => ({
  authMiddleware: (req: Request, res: Response, next: NextFunction) => {
    req.user = { _id: "test"} as IUser;
    next();
  },
}));

const app = express();
app.use(bodyParser.json());
app.use("/todos", authMiddleware, todoRoutes);

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
});

// Close the database connection and stop the server after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Todo Routes", () => {
  it("should create a new todo", async () => {
    const response = await request(app).post("/todos").send({
      title: "Test Todo",
      description: "This is a test todo",
      deadline: new Date().toISOString(),
      importance: 3,
      estimatedTime: 2,
      dependencies: [],
      completed: false,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("title", "Test Todo");
  });

  it("should get all todos", async () => {
    await Todo.create({
      title: "Test Todo",
      description: "This is a test todo",
      deadline: new Date(),
      importance: 3,
      estimatedTime: 2,
      dependencies: [],
      completed: false,
    });

    const response = await request(app).get("/todos");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("should get a todo by id", async () => {
    const todo = await Todo.create({
      title: "Test Todo",
      description: "This is a test todo",
      deadline: new Date(),
      importance: 3,
      estimatedTime: 2,
      dependencies: [],
      completed: false,
    });

    const response = await request(app).get(`/todos/${todo._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Test Todo");
  });

  it("should return 400 for invalid object id in get todo by id", async () => {
    const response = await request(app).get("/todos/invalid-id");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid ID format");
  });

  it("should update a todo by id", async () => {
    const todo = await Todo.create({
      title: "Test Todo",
      description: "This is a test todo",
      deadline: new Date(),
      importance: 3,
      estimatedTime: 2,
      dependencies: [],
      completed: false,
    });

    const response = await request(app)
      .patch(`/todos/${todo._id}`)
      .send({ title: "Updated Todo" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Updated Todo");
  });

  it("should return 400 for invalid data in update todo", async () => {
    const todo = await Todo.create({
      title: "Test Todo",
      description: "This is a test todo",
      deadline: new Date(),
      importance: 3,
      estimatedTime: 2,
      dependencies: [],
      completed: false,
    });

    const response = await request(app)
      .patch(`/todos/${todo._id}`)
      .send({ importance: 6 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should delete a todo by id", async () => {
    const todo = await Todo.create({
      title: "Test Todo",
      description: "This is a test todo",
      deadline: new Date(),
      importance: 3,
      estimatedTime: 2,
      dependencies: [],
      completed: false,
    });

    const response = await request(app).delete(`/todos/${todo._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Todo deleted successfully");
  });

  it("should return 400 for invalid object id in delete todo", async () => {
    const response = await request(app).delete("/todos/invalid-id");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid ID format");
  });
});
