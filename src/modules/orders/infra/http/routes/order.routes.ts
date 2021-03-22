import { Router } from 'express';

import OrderController from '../controllers/OrderController';

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.post('/', orderController.create)
orderRoutes.get('/', orderController.list)
orderRoutes.get('/:id', orderController.getOne)

export default orderRoutes;
