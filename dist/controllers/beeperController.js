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
const express_1 = __importDefault(require("express"));
const dataContext_1 = __importDefault(require("../DAL/dataContext"));
const beeper_1 = __importDefault(require("../models/beeper"));
const router = express_1.default.Router();
const context = new dataContext_1.default();
// create new beeper
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beeper = new beeper_1.default(0, req.body.name);
    const n = context.add(beeper);
    res.send(n);
}));
// get all beepers
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(context.beepers);
}));
// get by id
router.get('/:id', (req, res) => {
    res.send(context.beepers.find(b => b.id === Number(req.params.id)));
});
// update
router.put('/:id/status', (req, res) => {
});
// delete by id
router.delete('/:id', (req, res) => {
    context.delete(Number(req.params.id));
    // !!!
});
// get by status
router.get('/status/:status');
exports.default = router;
