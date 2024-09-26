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
const promises_1 = __importDefault(require("fs/promises"));
class Context {
    constructor(beepers = [], path = `${__dirname}/../../data/beepers.json`) {
        this.beepers = beepers;
        this.path = path;
        // מוסיף חדש למערך ומחזיר את המזהה שנוצר
        this.add = (newBeeper) => __awaiter(this, void 0, void 0, function* () {
            newBeeper.id = this.generateId();
            this.beepers.push(newBeeper);
            this.save();
            return newBeeper.id;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            this.beepers = this.beepers.filter(b => b.id !== id);
            this.save();
        });
        // מייצר מזהה חדש
        this.generateId = () => {
            if (this.beepers.length < 1)
                return 1;
            return Math.max(...this.beepers.map(b => b.id)) + 1;
        };
        // מאתחל את מערך הביפרים
        this.loadData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const strData = yield promises_1.default.readFile(this.path, 'utf-8');
                this.beepers = JSON.parse(strData);
            }
            catch (err) {
                throw new Error('file not found');
            }
        });
        // שומר שינויים
        this.save = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const strData = JSON.stringify(this.beepers);
                yield promises_1.default.writeFile(this.path, strData, { encoding: 'utf-8' });
            }
            catch (err) {
                throw new Error('couldn\'t save');
            }
        });
        this.loadData();
    }
}
exports.default = Context;
