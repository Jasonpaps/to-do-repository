import { Router } from 'express';
import {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController';

const router = Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.get('/:id', getTodoById);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
