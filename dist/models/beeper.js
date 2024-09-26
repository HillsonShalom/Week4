"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Beeper {
    constructor(id, name) {
        this.detonated_at = null;
        this.location = null;
        this.getAsDto = () => {
            var _a, _b;
            return {
                id: this.id,
                name: this.name,
                status: this.status,
                created_at: this.created_at,
                detonated_at: this.detonated_at,
                longitude: ((_a = this.location) === null || _a === void 0 ? void 0 : _a.longitude) || 0,
                latitude: ((_b = this.location) === null || _b === void 0 ? void 0 : _b.latitude) || 0
            };
        };
        this.id = id || 0;
        this.name = name || 'Unknown';
        this.status = 'manufactured';
        this.created_at = new Date();
    }
}
exports.default = Beeper;
