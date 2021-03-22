import { Router } from 'express';

import ProductController from '../controllers/ProductController';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get('/:name', productController.getByName);

export default productRoutes;
