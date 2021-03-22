import AppError from '@shared/errors/AppError';

import { UpdateStockDTO } from '../dtos/updateStockDTO';
import IProductRepository from '../repositories/models/IProductRepository';
import { IProduct } from '../interfaces/IProduct';

export default class UpdateStockService {
  constructor(private productRepository: IProductRepository) {}
  async execute({ command, name }: UpdateStockDTO): Promise<IProduct> {
    const product = await this.productRepository.getByName(name);

    if (!product) {
      throw new AppError('Não existe produto com este nome no estoque', 404);
    }

    if (command === 'decremented' && product.quantity === 0) {
      throw new AppError('Este produto não possui itens suficientes no estoque', 422);
    }

    const updatedProduct = await this.productRepository[command](name);

    return updatedProduct;
  }
}
