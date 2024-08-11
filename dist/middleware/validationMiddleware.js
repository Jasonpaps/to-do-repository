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
exports.validateUpdateTodo = exports.validateObjectId = exports.validateTodo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const todo_1 = __importDefault(require("../models/todo"));
const isValidObjectId = (id) => mongoose_1.default.Types.ObjectId.isValid(id);
const checkDependenciesExist = (dependencies) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDependencies = yield todo_1.default.find({ _id: { $in: dependencies } });
    return existingDependencies.length === dependencies.length;
});
const validateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, deadline, importance, estimatedTime, dependencies, completed, } = req.body;
    if (!title || typeof title !== "string") {
        return res.status(400).json({ message: "Invalid title. It must be a non-empty string." });
    }
    if (!description || typeof description !== "string") {
        return res.status(400).json({ message: "Invalid description. It must be a non-empty string." });
    }
    if (!deadline || isNaN(new Date(deadline).getTime())) {
        return res.status(400).json({ message: "Invalid deadline. It must be a valid date." });
    }
    if (typeof importance !== "number" || importance < 1 || importance > 5) {
        return res.status(400).json({ message: "Invalid importance. It must be a number between 1 and 5." });
    }
    if (typeof estimatedTime !== "number" || estimatedTime <= 0) {
        return res.status(400).json({ message: "Invalid estimatedTime. It must be a positive number." });
    }
    if (!Array.isArray(dependencies) || !dependencies.every(isValidObjectId)) {
        return res.status(400).json({ message: "Invalid dependencies. All dependencies must be valid ObjectIds." });
    }
    if (typeof completed !== "boolean") {
        return res.status(400).json({ message: "Invalid completed status. It must be a boolean value." });
    }
    if (!(yield checkDependenciesExist(dependencies))) {
        return res.status(404).json({ message: "One or more dependencies do not exist." });
    }
    next();
});
exports.validateTodo = validateTodo;
const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    next();
};
exports.validateObjectId = validateObjectId;
const validateUpdateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, deadline, importance, estimatedTime, dependencies, completed, } = req.body;
    // Partial Update is available, hence check if fields exist
    if (title && typeof title !== "string") {
        return res.status(400).json({ message: "Invalid title. It must be a string." });
    }
    if (description && typeof description !== "string") {
        return res.status(400).json({ message: "Invalid description. It must be a string." });
    }
    if (deadline && isNaN(new Date(deadline).getTime())) {
        return res.status(400).json({ message: "Invalid deadline. It must be a valid date." });
    }
    if (importance !== undefined && (typeof importance !== "number" || importance < 1 || importance > 5)) {
        return res.status(400).json({ message: "Invalid importance. It must be a number between 1 and 5." });
    }
    if (estimatedTime !== undefined && (typeof estimatedTime !== "number" || estimatedTime <= 0)) {
        return res.status(400).json({ message: "Invalid estimatedTime. It must be a positive number." });
    }
    if (dependencies !== undefined && (!Array.isArray(dependencies) || !dependencies.every(isValidObjectId))) {
        return res.status(400).json({ message: "Invalid dependencies. All dependencies must be valid ObjectIds." });
    }
    if (completed !== undefined && typeof completed !== "boolean") {
        return res.status(400).json({ message: "Invalid completed status. It must be a boolean value." });
    }
    if (dependencies && !(yield checkDependenciesExist(dependencies))) {
        return res.status(404).json({ message: "One or more dependencies do not exist." });
    }
    next();
});
exports.validateUpdateTodo = validateUpdateTodo;
//# sourceMappingURL=validationMiddleware.js.map