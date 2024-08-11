import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import dotenv from 'dotenv';

import todoRoutes from './routes/todoRoutes';
import userRoutes from './routes/userRoutes';
import utilsRoutes from './routes/utilsRoutes';
import { authMiddleware } from './middleware/authMiddleware';
import { setupWebSocketServer, broadcast } from './config/websocket';
import { configureSwagger } from './config/swagger';
import { connectToDatabase } from './config/database';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
app.use(bodyParser.json());

// Initialize WebSocket server
setupWebSocketServer(server);

// Establish connection with DB
const dbUri = process.env.DB_URI || '';
connectToDatabase(dbUri);

// Swagger setup
configureSwagger(app); 

// Routes - Smart Scheduling is in Utils
app.use('/users', userRoutes);
app.use('/todos', authMiddleware, todoRoutes);
app.use('/utils', authMiddleware, utilsRoutes);

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
