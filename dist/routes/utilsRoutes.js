"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utilsController_1 = require("../controllers/utilsController");
const router = express_1.default.Router();
router.get('/smart-schedule', utilsController_1.smartSchedule);
exports.default = router;
//# sourceMappingURL=utilsRoutes.js.map