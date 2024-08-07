import { Router } from 'express';
import {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController';

const router = Router();

router.get('/', (req, res) => {
  getTodos(req, res);
});

router.post('/', (req, res) => {
  createTodo(req, res);
});

router.get('/:id', (req, res) => {
  getTodoById(req, res);
});

router.patch('/:id', (req, res) => {
  updateTodo(req, res);
});

router.delete('/:id', (req, res) => {
  deleteTodo(req, res);
});

export default router;
