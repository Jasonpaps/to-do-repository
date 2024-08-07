"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController_1 = require("../controllers/todoController");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    (0, todoController_1.getTodos)(req, res);
});
router.post('/', (req, res) => {
    (0, todoController_1.createTodo)(req, res);
});
router.get('/:id', (req, res) => {
    (0, todoController_1.getTodoById)(req, res);
});
router.patch('/:id', (req, res) => {
    (0, todoController_1.updateTodo)(req, res);
});
router.delete('/:id', (req, res) => {
    (0, todoController_1.deleteTodo)(req, res);
});
exports.default = router;
//# sourceMappingURL=todoRoutes.js.map