import fs from 'fs/promises'
import Beeper from '../models/beeper'
import { beeperDTO } from '../DTO/dtoModels';
import { ibeeper, location } from '../models/interfaces';


class Context {
    statuses = ['manufactured', 'assembled', 'shipped', 'deployed', 'detonated']

    constructor(
        public beepers: ibeeper[] = [],
        public path:    string   = `${__dirname}/../../data/beepers.json`
    ){ this.loadData() }
    
    // מוסיף חדש למערך ומחזיר את המזהה שנוצר
    add      = async (newBeeper: ibeeper): Promise<number> => {
        newBeeper.id = this.generateId();
        this.beepers.push(newBeeper);
        this.save();
        return newBeeper.id;
    }

    findByStatus  = (status: string) => {
        return this.beepers.filter(b => b.status === status)
    }

    findAsDto = (id: number): beeperDTO | undefined => {
        const found: ibeeper | undefined = this.beepers.find(b => b.id === id);
        if (found){
            return {
                id:           found.id,
                name:         found.name,
                status:       found.status,
                created_at:   found.created_at,
                detonated_at: found.detonated_at,
                latitude:     found.location?.latitude  || 0,
                longitude:    found.location?.longitude || 0
            }
        } else {
            return undefined;
        }
    }

    delete  = async (id: number) => {
        this.beepers = this.beepers.filter(b => b.id !== id);
        this.save();
    }

    updateStatus  = async (id: number, status: string, loc?: location): Promise<boolean> => {
        const found = this.beepers.find(b => b.id === id);
        if (!found) return false;
        if (this.statuses.includes(status)){
            found.status! = status;
            if (status === 'deployed') {
                if (!loc) return false;
                found.location = {
                    latitude : loc.latitude,
                    longitude: loc.longitude
                }
                setTimeout(() => {
                    found.status = this.statuses[this.statuses.length - 1];
                    this.save();
                }, 10_000); // עשר שניות
            }
            this.save(); 
            return true;
        } else {
            if (found.status === this.statuses[this.statuses.length - 1]) return false;
            found.status = this.statuses[this.statuses.indexOf(found.status) + 1]
            return true;
        }
    }

    // מייצר מזהה חדש
    private generateId = (): number => {
        if (this.beepers.length < 1) return 1;
        return Math.max(...this.beepers.map(b => b.id)) + 1;
    }

    // מאתחל את מערך הביפרים
    loadData = async () => {
        try{
            const strData: string = await fs.readFile(this.path, 'utf-8');
            this.beepers = JSON.parse(strData) as Beeper[];
            // פתירת בעיה מטומטמת שיכולה לקרות רק בג'אווה סקריפט!!!
            // בגלל שבזמן ריצה אין טייפים התאריכים מומרים לסטרינג, והקומפיילר לא חשב להעיר על זה
            this.beepers.forEach(b => b.created_at = new Date(b.created_at));
        } catch (err) {
            throw new Error('file not found');
        }
    }

    // שומר שינויים
    save     = async () => {
        try{
            const strData: string = JSON.stringify(this.beepers);
            await fs.writeFile(this.path, strData, { encoding: 'utf-8' });
        } catch (err) {
            throw new Error('couldn\'t save');
        }
    }
}

export default Context