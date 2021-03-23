import AppError from '@shared/errors/AppError';

import IOrderRepository from '../repositories/models/IOrderRepository';
import IProductRepository from '@modules/products/repositories/models/IProductRepository';
import { IOrder } from '../interfaces/IOrder';
import { CreateOrderDTO } from '../dtos/CreateOrderDTO';
import { IProduct } from '@modules/products/interfaces/IProduct';

export default class CreateOrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
  ) {}
  public async execute(products: CreateOrderDTO[]): Promise<IOrder> {
    const itens = await Promise.all(
      products.map(async item => {
        const product = await this.productRepository.getByName(item.name);
        if (product.quantity < item.quantity) {
          throw new AppError(
            `O produto ${item.name} não possui quantidade suficiente no estoque. Estoque atual: ${product.quantity}`,
          );
        }
        await this.decrementProducts(product.name, item.quantity);
        Object.assign(item, { price: product.price });
        return item.quantity * product.price;
      }),
    );
    const total = itens.reduce(
      (total: number, nextValue: number) => (total += nextValue),
    );
    const orders = await this.orderRepository.create(products, total);

    return orders;
  }

  private async decrementProducts(name, quantity): Promise<void> {
    const decrementedProduct = await this.productRepository.decremented(
      name,
      quantity,
    );
    if (!decrementedProduct) {
      throw new AppError('Erro no consumo do estoque', 400);
    }
    return;
  }
}
