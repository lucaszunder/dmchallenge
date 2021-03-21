import productRoutes from '@modules/products/infra/http/routes/product.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRoutes);

export default routes;
