import exp, { Request, Response, Router } from 'express'
import Context from '../DAL/dataContext';
import { ibeeper } from '../models/interfaces';
import { beeperDTO } from '../DTO/dtoModels';
import Beeper from '../models/beeper';

const router = exp.Router();
const context = new Context();

// create new beeper
router.post('/', async (
    req: Request<any, any, beeperDTO>,
    res: Response
) => {
    const beeper = new Beeper(0, req.body.name);
    const n = context.add(beeper);
    res.send(n);
});

// get all beepers
router.get('/', async (req, res) => {
    res.send(context.beepers)
});

// get by id
router.get('/:id', (req, res) => {
    res.send(context.beepers.find(b => b.id === Number(req.params.id)))
})

// update
router.put('/:id/status', (
    req: Request<any, any, beeperDTO>,
    res: Response
) => {

});

// delete by id
router.delete('/:id', (req, res) => {
    context.delete(Number(req.params.id))
    // !!!
});

// get by status
router.get('/status/:status')

export default router;