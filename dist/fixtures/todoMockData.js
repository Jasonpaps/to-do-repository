"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoMockData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.todoMockData = [
    {
        _id: new mongoose_1.default.Types.ObjectId('60b8d295f1b2e1a3f0e02b40'),
        title: 'Finish project report',
        description: 'Complete the final report for the project',
        deadline: new Date('2024-09-15T12:00:00Z'),
        importance: 5,
        estimatedTime: 2,
        dependencies: [],
        completed: false,
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('60b8d295f1b2e1a3f0e02b41'),
        title: 'Prepare presentation',
        description: 'Prepare slides for the project presentation',
        deadline: new Date('2024-09-14T12:00:00Z'),
        importance: 4,
        estimatedTime: 3,
        dependencies: [],
        completed: false,
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('60b8d295f1b2e1a3f0e02b42'),
        title: 'Code review',
        description: 'Review code submitted by team members',
        deadline: new Date('2024-09-12T12:00:00Z'),
        importance: 3,
        estimatedTime: 1,
        dependencies: [],
        completed: false,
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('60b8d295f1b2e1a3f0e02b43'),
        title: 'Client meeting',
        description: 'Discuss project requirements with the client',
        deadline: new Date('2024-09-10T12:00:00Z'),
        importance: 5,
        estimatedTime: 1,
        dependencies: [],
        completed: false,
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('60b8d295f1b2e1a3f0e02b44'),
        title: 'Write documentation',
        description: 'Write technical documentation for the project',
        deadline: new Date('2024-09-20T12:00:00Z'),
        importance: 2,
        estimatedTime: 4,
        dependencies: [new mongoose_1.default.Types.ObjectId('60b8d295f1b2e1a3f0e02b40')],
        completed: false,
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('60b8d295f1b2e1a3f0e02b45'),
        title: 'Deploy to production',
        description: 'Deploy the application to the production environment',
        deadline: new Date('2024-09-01T12:00:00Z'),
        importance: 4,
        estimatedTime: 2,
        dependencies: [new mongoose_1.default.Types.ObjectId('60b8d295f1b2e1a3f0e02b44')],
        completed: false,
    },
];
//# sourceMappingURL=todoMockData.js.map