import { Router } from 'express';

import RoundController from '../controller/RoundController';

const round_routes = new Router();

round_routes.post('/rounds', RoundController.store);
round_routes.get('/rounds', RoundController.index);
round_routes.get('/rounds/:roundsId', RoundController.show);
round_routes.delete('/rounds/:roundsId', RoundController.delete);
export default round_routes;
