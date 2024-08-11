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
exports.connectToDB = connectToDB;
exports.disconnectDB = disconnectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongod = null;
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let dbUrl = "mongodb+srv://todouser:9vQPENbRQewkVweq@to-do-database.efr2sck.mongodb.net/todo_db?retryWrites=true&w=majority&appName=to-do-database";
            if (process.env.NODE_ENV === "test") {
                mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
                dbUrl = mongod.getUri();
            }
            yield mongoose_1.default.connect(dbUrl);
        }
        catch (err) {
            console.error("Error connecting to MongoDB:", err);
            process.exit(1);
        }
    });
}
function disconnectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.disconnect();
            if (mongod) {
                yield mongod.stop();
            }
        }
        catch (err) {
            console.error("Error disconnecting from MongoDB:", err);
            process.exit(1);
        }
    });
}
//# sourceMappingURL=db.js.map