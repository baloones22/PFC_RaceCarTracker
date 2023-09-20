import { Router } from 'express';

import CategoryController from '../controller/CategoryController';

const category_routes = new Router();

category_routes.post('/category', CategoryController.store);

category_routes.get('/category', CategoryController.index);

category_routes.get('/category/:categoryId', CategoryController.show);
category_routes.delete('/category/:categoryId', CategoryController.delete);
export default category_routes;
