import { v4 } from 'uuid'
import { ibeeper, location } from "./interfaces";
import { beeperDTO } from '../DTO/dtoModels';

class Beeper implements ibeeper {
    id:             number;
    name:           string;
    status:         string;
    created_at:     Date;
    detonated_at:   Date     | null = null;
    location:       location | null = null;
    constructor(name?: string){
        this.id         = 0;
        this.name       = name   || 'Unknown';
        this.status     = 'manufactured';
        this.created_at = new Date();
    }

    getAsDto = (): beeperDTO => {
        return {
            id:           this.id,
            name:         this.name, 
            status:       this.status,
            created_at:   this.created_at,
            detonated_at: this.detonated_at,
            longitude:    this.location?.longitude || 0,
            latitude:     this.location?.latitude  || 0
        }
    }
}

export default Beeper