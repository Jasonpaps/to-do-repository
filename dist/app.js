"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const utilsRoutes_1 = __importDefault(require("./routes/utilsRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const websocket_1 = require("./config/websocket");
const swagger_1 = require("./config/swagger");
const database_1 = require("./config/database");
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
app.use(body_parser_1.default.json());
// Initialize WebSocket server
(0, websocket_1.setupWebSocketServer)(server);
// Establish connection with DB
const dbUri = process.env.DB_URI || '';
(0, database_1.connectToDatabase)(dbUri);
// Swagger setup
(0, swagger_1.configureSwagger)(app);
// Routes - Smart Scheduling is in Utils
app.use('/users', userRoutes_1.default);
app.use('/todos', authMiddleware_1.authMiddleware, todoRoutes_1.default);
app.use('/utils', authMiddleware_1.authMiddleware, utilsRoutes_1.default);
// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});
// Start server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=app.js.map