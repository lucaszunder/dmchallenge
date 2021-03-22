import AppError from '@shared/errors/AppError';

import IOrderRepository from '../repositories/models/IOrderRepository';
import IProductRepository from '@modules/products/repositories/models/IProductRepository';
import { IOrder } from '../interfaces/IOrder';
import { CreateOrderDTO } from '../dtos/CreateOrderDTO';

export default class CreateOrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
  ) {}
  async execute(products: CreateOrderDTO[]): Promise<IOrder> {
    const itens = await Promise.all(
      products.map(async item => {
        const product = await this.productRepository.getByName(item.name);
        if (product.quantity < item.quantity) {
          throw new AppError(
            `O produto ${item.name} não possui quantidade suficiente no estoque. Estoque atual: ${product.quantity}`,
          );
        }
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
}
