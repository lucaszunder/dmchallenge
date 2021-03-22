import AppError from '@shared/errors/AppError';
import IOrderRepository from '../repositories/models/IOrderRepository';
import { IOrder } from '../interfaces/IOrder';


export default class GetOrderService {
  constructor(private orderRepository: IOrderRepository) {}
  async execute(id: string): Promise<IOrder> {
    const product = await this.orderRepository.findById(parseInt(id));

    if (!product) {
      throw new AppError('Não existe um pedido com este id', 404);
    }

    return product;
  }
}
