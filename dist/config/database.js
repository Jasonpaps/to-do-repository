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
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const todo_1 = __importDefault(require("../models/todo"));
const todoMockData_1 = require("../fixtures/todoMockData");
const connectToDatabase = (dbUri) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(dbUri);
        console.log('Connected to MongoDB');
        // Clear and seed database
        yield todo_1.default.deleteMany({});
        console.log('Cleared existing ToDo items');
        yield todo_1.default.insertMany(todoMockData_1.todoMockData);
        console.log('Inserted mock ToDo items');
    }
    catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
});
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=database.js.map