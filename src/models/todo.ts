import mongoose, { Schema, model } from 'mongoose';

export interface ITodo extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  deadline: Date;
  importance: number;
  estimatedTime: number; // In hours
  dependencies: mongoose.Types.ObjectId[];
  completed: boolean;
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  importance: { type: Number, required: true },
  estimatedTime: { type: Number, required: true },
  dependencies: [{ type: mongoose.Types.ObjectId, ref: 'Todo' }],
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;