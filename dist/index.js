"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const beeperController_1 = __importDefault(require("./controllers/beeperController"));
// load enviroment variables
require("dotenv/config");
const app = (0, express_1.default)();
const corsOps = {
    origin: `http://localhost:${process.env.PORT}`
};
app.use(express_1.default.json());
app.use('/api/beepers', (0, cors_1.default)(corsOps), beeperController_1.default);
app.listen(process.env.PORT, () => console.log(`See you at http::localhost:${process.env.PORT}`));
