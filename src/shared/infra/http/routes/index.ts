import orderRoutes from '@modules/orders/infra/http/routes/order.routes';
import productRoutes from '@modules/products/infra/http/routes/product.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRoutes);
routes.use('/orders', orderRoutes)

export default routes;
