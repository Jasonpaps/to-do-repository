"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
// import todoRoutes from './routes/todoRoutes';
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
const dbUri = 'mongodb+srv://todouser:9vQPENbRQewkVweq@to-do-database.efr2sck.mongodb.net/?retryWrites=true&w=majority&appName=to-do-database';
mongoose_1.default.connect(dbUri).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
