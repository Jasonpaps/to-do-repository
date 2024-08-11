import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from '../routes/userRoutes';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Mock environment variables
process.env.JWT_SECRET = 'test_secret_key';

// Create a new express application instance
const app = express();
app.use(bodyParser.json());
app.use('/users', userRoutes);

let mongoServer: MongoMemoryServer;

// Connect to the in-memory database
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const dbUri = mongoServer.getUri();
  await mongoose.connect(dbUri);
});

// Clear database before each test
beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

// Close the database connection and stop the server after tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Routes', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({ username: 'testuser', password: 'password' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should not register a user with an existing username', async () => {
    await request(app)
      .post('/users/register')
      .send({ username: 'testuser', password: 'password' });

    const response = await request(app)
      .post('/users/register')
      .send({ username: 'testuser', password: 'password' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Username already taken');
  });

  it('should login a registered user', async () => {
    await request(app)
      .post('/users/register')
      .send({ username: 'testuser', password: 'password' });

    const response = await request(app)
      .post('/users/login')
      .send({ username: 'testuser', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not login an unregistered user', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({ username: 'nonexistentuser', password: 'password' });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });
});
