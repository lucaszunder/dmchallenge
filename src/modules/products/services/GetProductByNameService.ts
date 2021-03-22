import AppError from '@shared/errors/AppError';

import IProductRepository from '../repositories/models/IProductRepository'
import { IProduct } from '../interfaces/IProduct';

export default class GetProductByNameService {
  constructor(private productRepository: IProductRepository) {}
  async execute(name: string): Promise<IProduct> {
    const product = await this.productRepository.getByName(name);

    if (!product) {
      throw new AppError('Não existe produto com este nome no estoque', 404);
    }

    return product;
  }
}
