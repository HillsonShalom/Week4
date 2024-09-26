"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class service {
    static BeeperAsDto(beeper) {
        var _a, _b;
        return {
            id: beeper.id,
            name: beeper.name,
            status: beeper.status,
            created_at: beeper.created_at,
            detonated_at: beeper.detonated_at,
            longitude: ((_a = beeper.location) === null || _a === void 0 ? void 0 : _a.longitude) || 0,
            latitude: ((_b = beeper.location) === null || _b === void 0 ? void 0 : _b.latitude) || 0
        };
    }
    static checkLocation(loc) {
        if (loc.latitude >= 33.01048 &&
            loc.latitude <= 34.6793 &&
            loc.longitude >= 35.04438 &&
            loc.longitude <= 36.6793)
            return true;
        return false;
    }
}
exports.default = service;
