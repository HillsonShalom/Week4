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
const service_1 = __importDefault(require("../DTO/service"));
const router = express_1.default.Router();
const context = new dataContext_1.default();
// create new beeper
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.name)
            throw new Error();
        const beeper = {
            id: 0, name: req.body.name,
            status: '', created_at: new Date(),
            detonated_at: null, location: null
        }; //new Beeper(req.body.name);
        const newId = yield context.add(beeper);
        const newBeeper = service_1.default.BeeperAsDto(beeper);
        res.send(newBeeper);
    }
    catch (err) {
        res.status(400).send('I expect to receive an object like this - { "name": "<your-choice>" } \'cause everything else is meaningless...');
    }
}));
// get all beepers
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(new beeper_1.default('test'));
        console.log(context.beepers[0]);
        res.send(context.beepers.map(b => service_1.default.BeeperAsDto(b)));
    }
    catch (err) {
        res.sendStatus(400); // so, really, no way you'll get here...
    }
}));
// get by id
router.get('/:id', (req, res) => {
    try {
        const found = context.beepers.find(b => b.id === Number(req.params.id));
        if (!found) {
            throw new Error();
        }
        res.send(found);
    }
    catch (err) {
        res.send('There\'s no such beeper that hold that id...');
    }
});
// update
router.put('/:id/:status', (req, res) => {
    try {
        const id = Number(req.params.id) || undefined;
        const status = req.params.status || undefined;
        const loc = req.body || undefined;
        if (loc) {
            if (!service_1.default.checkLocation(loc))
                throw new Error('wrong location!');
        }
        if (!id)
            throw new Error('please enter id!');
        if (status) {
            if (!context.updateStatus(id, status, loc))
                throw new Error();
        }
        res.sendStatus(201);
    }
    catch (err) {
        res.status(400).send('think to your self why did you do that is don\'t working...');
    }
});
// delete by id
router.delete('/:id', (req, res) => {
    context.delete(Number(req.params.id))
        .then(() => res.sendStatus(204))
        .catch(() => res.status(400).send('wrong id!'));
});
// get by status
router.get('/status/:status', (req, res) => {
    try {
        res.send(context.findByStatus(req.params.status)
            .map(b => service_1.default.BeeperAsDto(b)));
    }
    catch (err) {
        res.sendStatus(400);
    }
});
exports.default = router;
