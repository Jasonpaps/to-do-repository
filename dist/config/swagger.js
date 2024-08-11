"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSwagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const configureSwagger = (app) => {
    const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '../docs/api.yaml'));
    app.use('/api', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
};
exports.configureSwagger = configureSwagger;
//# sourceMappingURL=swagger.js.map