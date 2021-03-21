import GetProductByNameService from '@modules/products/services/GetProductByNameService';
import { Request, Response } from 'express';
import ProductRepository from '../../prisma/repositories/ProductRepository';

export default class ProductController {
  public async getByName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name } = request.params;
    
    const productRepository = new ProductRepository();
    const getProductService = new GetProductByNameService(productRepository);

    const product = await getProductService.execute({ name });

    return response.json(product);
  }
}
