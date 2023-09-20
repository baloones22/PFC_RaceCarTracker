import { Router } from 'express';

import CarController from '../controller/CarController';

const car_routes = new Router();

car_routes.post('/cars', CarController.store);
car_routes.get('/cars', CarController.index);
car_routes.get('/car/:carId', CarController.show);
car_routes.delete('/cars/:carId', CarController.delete);
car_routes.get('/cars/:categoryId', CarController.showbycategory);
car_routes.get('/track/current', CarController.current_on_track);
export default car_routes;
