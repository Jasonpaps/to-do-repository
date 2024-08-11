"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartScheduling = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Use environment variable for working hours
// Validate the value
dotenv_1.default.config();
const workingHours = parseInt(process.env.WORKING_HOURS_PER_DAY || "8", 10);
if (isNaN(workingHours)) {
    throw new Error("Invalid WORKING_HOURS_PER_DAY environment variable. Must be a number.");
}
// Prioritize Deadline > Importance > Estimated Time
const smartScheduling = (todos) => {
    todos.sort((a, b) => {
        if (a.deadline !== b.deadline) {
            return a.deadline.getTime() - b.deadline.getTime();
        }
        if (a.importance !== b.importance) {
            return b.importance - a.importance;
        }
        return a.estimatedTime - b.estimatedTime;
    });
    const scheduledTasks = [];
    let currentTime = new Date();
    const addTaskToSchedule = (task) => {
        skipWeekends(currentTime);
        const start = new Date(currentTime);
        const end = new Date(currentTime);
        end.setHours(end.getHours() + task.estimatedTime);
        scheduledTasks.push({ task, start, end });
        currentTime = new Date(end);
        // If the current time exceeds the working hours, move to the next day
        if (currentTime.getHours() >= 17) {
            currentTime.setHours(workingHours, 0, 0, 0);
            currentTime.setDate(currentTime.getDate() + 1);
            skipWeekends(currentTime);
        }
    };
    const skipWeekends = (date) => {
        // Working hours do not include weekends
        // If day is Saturday <6> or Sunday <0>, go to Monday
        while (date.getDay() === 6 || date.getDay() === 0) {
            date.setDate(date.getDate() + (date.getDay() === 6 ? 2 : 1));
        }
    };
    const scheduleTaskWithDependencies = (task, todos, PlannedTasks) => {
        // Schedule dependencies first if exist
        task.dependencies.forEach((depId) => {
            const dependency = todos.find(t => t._id.toString() === depId.toString());
            if (dependency && !PlannedTasks.has(dependency._id.toString())) {
                scheduleTaskWithDependencies(dependency, todos, PlannedTasks);
            }
        });
        // Schedule the current task
        if (!PlannedTasks.has(task._id.toString())) {
            addTaskToSchedule(task);
            PlannedTasks.add(task._id.toString());
        }
    };
    // Set of tasks that have a schedule
    const PlannedTasks = new Set();
    // Schedule all tasks
    todos.forEach(task => {
        if (!PlannedTasks.has(task._id.toString())) {
            scheduleTaskWithDependencies(task, todos, PlannedTasks);
        }
    });
    return scheduledTasks;
};
exports.smartScheduling = smartScheduling;
//# sourceMappingURL=smartScheduling.js.map