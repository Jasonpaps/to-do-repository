"use strict";
// ROUTE: /utils
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
exports.smartSchedule = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const smartScheduling_1 = require("../utils/smartScheduling");
const smartSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all the incomplete tasks and feed the smartSchedul function
    try {
        const todos = yield todo_1.default.find({ completed: false });
        const scheduledTasks = (0, smartScheduling_1.smartScheduling)(todos);
        res.json(scheduledTasks);
    }
    catch (err) {
        console.error('Error in smartSchedule:', err);
        res.status(500).json({ message: 'An error occured while processing a smart schedule. Please try again later.' });
    }
});
exports.smartSchedule = smartSchedule;
//# sourceMappingURL=utilsController.js.map