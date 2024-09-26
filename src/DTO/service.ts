import { ibeeper, location } from "../models/interfaces";
import { beeperDTO } from "./dtoModels";

class service {
    static BeeperAsDto(beeper: ibeeper): beeperDTO {
        return {
            id:           beeper.id,
            name:         beeper.name, 
            status:       beeper.status,
            created_at:   beeper.created_at,
            detonated_at: beeper.detonated_at,
            longitude:    beeper.location?.longitude || 0,
            latitude:     beeper.location?.latitude  || 0
        }
    }

    static checkLocation(loc: location): boolean {
        if (loc.latitude   >=  33.01048 &&
            loc.latitude   <=  34.6793  &&
            loc.longitude  >=  35.04438 &&
            loc.longitude  <=  36.6793
        ) return true;
        return false;
    }
}

export default service