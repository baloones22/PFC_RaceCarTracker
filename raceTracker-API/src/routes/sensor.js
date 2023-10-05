import { Router } from 'express';
import SensorController from '../controller/SensorController';

const sensor_routes = new Router();
sensor_routes.post('/sensor', SensorController.store);
sensor_routes.get('/sensors', SensorController.index);
sensor_routes.get('/sensor/:sensorId', SensorController.show);
sensor_routes.delete('/sensors/:sensorId', SensorController.delete);
export default sensor_routes;
