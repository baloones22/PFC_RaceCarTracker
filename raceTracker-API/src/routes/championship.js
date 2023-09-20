import { Router } from 'express';

import ChampionshipController from '../controller/ChampionshipController';

const championship_routes = new Router();

championship_routes.post('/championship', ChampionshipController.store);

championship_routes.get('/championship', ChampionshipController.index);

championship_routes.get('/championship/:champId', ChampionshipController.show);
championship_routes.delete('/championship/:champId', ChampionshipController.delete);

export default championship_routes;
