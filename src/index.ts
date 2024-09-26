import exp, { Express } from 'express';
import cors from 'cors'
import beeperController from './controllers/beeperController'

// load enviroment variables
import 'dotenv/config';

const app: Express = exp();

const corsOps = {
    origin: `http://localhost:${process.env.PORT}`
}
app.use(exp.json());
app.use('/api/beepers', cors(corsOps), beeperController);

app.listen(process.env.PORT, ():void => console.log(`See you at http::localhost:${process.env.PORT}`));

