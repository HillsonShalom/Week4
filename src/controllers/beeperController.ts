import exp, { Request, Response, Router } from 'express'
import Context from '../DAL/dataContext';
import { ibeeper, location } from '../models/interfaces';
import { beeperDTO, createReq } from '../DTO/dtoModels';
import Beeper from '../models/beeper';
import service from '../DTO/service';

const router = exp.Router();
const context = new Context();

// create new beeper
router.post('/', async (
    req: Request<createReq>,
    res: Response
) => {
    try{
        if (!req.body.name) throw new Error()
        const beeper: ibeeper = {
            id          : 0,       name      : req.body.name,
            status      : '',      created_at: new Date(),
            detonated_at: null,    location  : null
        }//new Beeper(req.body.name);
        const newId = await context.add(beeper);
        const newBeeper = service.BeeperAsDto(beeper);
        res.send(newBeeper);
    } catch(err) {
        res.status(400).send('I expect to receive an object like this - { "name": "<your-choice>" } \'cause everything else is meaningless...');
    }
    
});

// get all beepers
router.get('/', async (req, res: Response<beeperDTO[]>) => {
    try {
        console.log(new Beeper('test'));
        console.log(context.beepers[0]);
        res.send(context.beepers.map(b => service.BeeperAsDto(b)));
    } catch (err) {
        res.sendStatus(400); // so, really, no way you'll get here...
    }
});

// get by id
router.get('/:id', (req, res) => {
    try {
        const found = context.beepers.find(b => b.id === Number(req.params.id))
        if (!found) { throw new Error() }
        res.send(found)
    } catch(err) {
        res.send('There\'s no such beeper that hold that id...')
    }
})

// update
router.put('/:id/:status', (
    req: Request<any, any, location>,
    res: Response
) => {
    try {
        const id     = Number(req.params.id) || undefined;
        const status = req.params.status     || undefined;
        const loc    = req.body              || undefined;
        if (loc) { if (!service.checkLocation(loc)) throw new Error('wrong location!') }
        if (!id) throw new Error('please enter id!');
        if (status){
            if (!context.updateStatus(id, status, loc)) throw new Error()
        }
        res.sendStatus(201);
    } catch(err) {
        res.status(400).send('think to your self why did you do that is don\'t working...');
    }
});

// delete by id
router.delete('/:id', (req, res) => {
    context.delete(Number(req.params.id))
    .then ( () => res.sendStatus(204))
    .catch( () => res.status(400).send('wrong id!'));
});

// get by status
router.get('/status/:status', (req, res: Response<beeperDTO[]>) => {
    try {
        res.send(context.findByStatus(req.params.status)
            .map(b => service.BeeperAsDto(b)));
    } catch(err) {
        res.sendStatus(400);
    }
});

export default router;