import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes';
import userRoutes from './routes/userRoutes';
import { authMiddleware } from './middleware/authMiddleware';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const dbUri = 'mongodb+srv://todouser:9vQPENbRQewkVweq@to-do-database.efr2sck.mongodb.net/todo_db?retryWrites=true&w=majority&appName=to-do-database';
mongoose.connect(dbUri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// User routes
app.use('/users', userRoutes);  // Use userRoutes

// Todo routes with authentication middleware
app.use('/todos', authMiddleware, todoRoutes);

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
