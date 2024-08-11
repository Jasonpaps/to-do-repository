"use strict";
// ROUTE: /todos
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
const todo_1 = __importDefault(require("../models/todo"));
const websocket_1 = require("../config/websocket");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
// Create a new todo
exports.createTodo = [
    validationMiddleware_1.validateTodo,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, description, deadline, importance, estimatedTime, dependencies, completed, } = req.body;
        try {
            const newTodo = new todo_1.default({
                title,
                description,
                deadline,
                importance,
                estimatedTime,
                dependencies,
                completed,
            });
            const todo = yield newTodo.save();
            // Websocket - Broadcast the new todo to all clients
            (0, websocket_1.broadcast)("create", { todo: newTodo });
            res.status(201).json(todo);
        }
        catch (err) {
            console.error("Error creating todo:", err);
            res.status(500).json({
                message: "An error occurred while creating the todo. Please try again later.",
            });
        }
    }),
];
// Get all todos
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.json(todos);
    }
    catch (err) {
        console.error("Error fetching todos:", err);
        res.status(500).json({
            message: "An error occurred while fetching todos. Please try again later.",
        });
    }
});
exports.getTodos = getTodos;
// Get todo by ID
exports.getTodoById = [
    validationMiddleware_1.validateObjectId,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const todo = yield todo_1.default.findById(id);
            if (!todo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            res.json(todo);
        }
        catch (err) {
            console.error("Error fetching todo:", err);
            res.status(500).json({
                message: "An error occurred while fetching the todo. Please try again later.",
            });
        }
    }),
];
// Update todo by ID
exports.updateTodo = [
    validationMiddleware_1.validateObjectId,
    validationMiddleware_1.validateUpdateTodo,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const todo = yield todo_1.default.findByIdAndUpdate(id, req.body, { new: true });
            if (!todo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            // Websocket - Broadcast the new todo to all clients
            (0, websocket_1.broadcast)("update", { todo });
            res.json(todo);
        }
        catch (err) {
            console.error("Error updating todo:", err);
            res.status(500).json({
                message: "An error occurred while updating the todo. Please try again later.",
            });
        }
    }),
];
// Delete todo by ID
exports.deleteTodo = [
    validationMiddleware_1.validateObjectId,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const todo = yield todo_1.default.findByIdAndDelete(id);
            if (!todo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            // Websocket - Broadcast the new todo to all clients
            (0, websocket_1.broadcast)("delete", { todo });
            res.json({ message: "Todo deleted successfully" });
        }
        catch (err) {
            console.error("Error deleting todo:", err);
            res.status(500).json({
                message: "An error occurred while deleting the todo. Please try again later.",
            });
        }
    }),
];
//# sourceMappingURL=todoController.js.map