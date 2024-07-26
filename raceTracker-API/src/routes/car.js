import { Router } from 'express';

import CarController from '../controller/CarController';

const car_routes = new Router();

car_routes.post('/cars', CarController.store);
car_routes.get('/cars', CarController.index);
car_routes.get('/car/:carId', CarController.show);
car_routes.delete('/car/:carId', CarController.delete);
car_routes.get('/cars/:categoryId', CarController.showbycategory);
car_routes.get('/current', CarController.current_on_track);
car_routes.post('/track/', CarController.on_track);
car_routes.delete('/track/:carId', CarController.out_track);
export default car_routes;
