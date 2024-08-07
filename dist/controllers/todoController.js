"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.getTodos = exports.createTodo = void 0;
const todoModel_1 = __importDefault(require("../models/todoModel"));
const mongoose_1 = __importDefault(require("mongoose")); // Import mongoose to validate ObjectId
// Create a new todo
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTodo = new todoModel_1.default(req.body);
    try {
        const todo = yield newTodo.save();
        res.status(201).json(todo);
    }
    catch (err) {
        console.error('Error creating todo:', err);
        res.status(500).json({ message: 'An error occurred while creating the todo. Please try again later.' });
    }
});
exports.createTodo = createTodo;
// Get all todos
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoModel_1.default.find();
        res.json(todos);
    }
    catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({ message: 'An error occurred while fetching todos. Please try again later.' });
    }
});
exports.getTodos = getTodos;
// Get todo by ID
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Check if the ID is valid
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    try {
        const todo = yield todoModel_1.default.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (err) {
        console.error('Error fetching todo:', err);
        res.status(500).json({ message: 'An error occurred while fetching the todo. Please try again later.' });
    }
});
exports.getTodoById = getTodoById;
// Update todo by ID
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Check if the ID is valid
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    try {
        const todo = yield todoModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).json({ message: 'An error occurred while updating the todo. Please try again later.' });
    }
});
exports.updateTodo = updateTodo;
// Delete todo by ID
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Check if the ID is valid
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    try {
        const todo = yield todoModel_1.default.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    }
    catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ message: 'An error occurred while deleting the todo. Please try again later.' });
    }
});
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todoController.js.map