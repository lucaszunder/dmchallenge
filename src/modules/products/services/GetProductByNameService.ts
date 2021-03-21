import AppError from '@shared/errors/AppError';

import { Product } from '.prisma/client';

import ProductRepository from '../infra/prisma/repositories/ProductRepository';

interface IRequest {
  name: string;
}

export default class GetProductByNameService {
  constructor(private productRepository: ProductRepository) {}
  async execute({ name }: IRequest): Promise<Product> {
    const product = await this.productRepository.getByName(name);

    if (!product) {
      throw new AppError('Não existe produto com este nome no estoque', 404);
    }

    return product;
  }
}
