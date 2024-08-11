"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcast = exports.setupWebSocketServer = void 0;
const ws_1 = __importDefault(require("ws"));
let wss;
const setupWebSocketServer = (server) => {
    wss = new ws_1.default.Server({ server });
    wss.on('connection', (ws) => {
        console.log('New WebSocket connection');
        ws.on('message', (message) => {
            console.log(`Received message => ${message}`);
        });
        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });
};
exports.setupWebSocketServer = setupWebSocketServer;
const broadcast = (action, payload) => {
    const message = JSON.stringify(Object.assign({ action }, payload));
    wss.clients.forEach((client) => {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(message);
        }
    });
};
exports.broadcast = broadcast;
//# sourceMappingURL=websocket.js.map