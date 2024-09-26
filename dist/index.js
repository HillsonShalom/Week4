"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const beeperController_1 = __importDefault(require("./controllers/beeperController"));
// load enviroment variables
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/beepers', beeperController_1.default);
app.listen(process.env.PORT, () => console.log(`See you at http::localhost:${process.env.PORT}`));
