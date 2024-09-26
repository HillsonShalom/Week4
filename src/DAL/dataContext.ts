import fs from 'fs/promises'
import Beeper from '../models/beeper'


class Context {
    constructor(
        public beepers: Beeper[] = [],
        public path:    string   = `${__dirname}/../../data/beepers.json`
    ){ this.loadData() }
    
    // מוסיף חדש למערך ומחזיר את המזהה שנוצר
    add      = async (newBeeper: Beeper): Promise<number> => {
        newBeeper.id = this.generateId();
        this.beepers.push(newBeeper);
        this.save();
        return newBeeper.id;
    }

    delete  = async (id: number) => {
        this.beepers = this.beepers.filter(b => b.id !== id);
        this.save();
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