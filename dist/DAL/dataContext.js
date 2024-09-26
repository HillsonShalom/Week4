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
        this.statuses = ['manufactured', 'assembled', 'shipped', 'deployed', 'detonated'];
        // מוסיף חדש למערך ומחזיר את המזהה שנוצר
        this.add = (newBeeper) => __awaiter(this, void 0, void 0, function* () {
            newBeeper.id = this.generateId();
            this.beepers.push(newBeeper);
            this.save();
            return newBeeper.id;
        });
        this.findByStatus = (status) => {
            return this.beepers.filter(b => b.status === status);
        };
        this.findAsDto = (id) => {
            var _a, _b;
            const found = this.beepers.find(b => b.id === id);
            if (found) {
                return {
                    id: found.id,
                    name: found.name,
                    status: found.status,
                    created_at: found.created_at,
                    detonated_at: found.detonated_at,
                    latitude: ((_a = found.location) === null || _a === void 0 ? void 0 : _a.latitude) || 0,
                    longitude: ((_b = found.location) === null || _b === void 0 ? void 0 : _b.longitude) || 0
                };
            }
            else {
                return undefined;
            }
        };
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            this.beepers = this.beepers.filter(b => b.id !== id);
            this.save();
        });
        this.updateStatus = (id, status, loc) => __awaiter(this, void 0, void 0, function* () {
            const found = this.beepers.find(b => b.id === id);
            if (!found)
                return false;
            if (this.statuses.includes(status)) {
                found.status = status;
                if (status === 'deployed') {
                    if (!loc)
                        return false;
                    found.location = {
                        latitude: loc.latitude,
                        longitude: loc.longitude
                    };
                    setTimeout(() => {
                        found.status = this.statuses[this.statuses.length - 1];
                        this.save();
                    }, 10000); // עשר שניות
                }
                this.save();
                return true;
            }
            else {
                if (found.status === this.statuses[this.statuses.length - 1])
                    return false;
                found.status = this.statuses[this.statuses.indexOf(found.status) + 1];
                return true;
            }
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
                // פתירת בעיה מטומטמת שיכולה לקרות רק בג'אווה סקריפט!!!
                // בגלל שבזמן ריצה אין טייפים התאריכים מומרים לסטרינג, והקומפיילר לא חשב להעיר על זה
                this.beepers.forEach(b => b.created_at = new Date(b.created_at));
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
