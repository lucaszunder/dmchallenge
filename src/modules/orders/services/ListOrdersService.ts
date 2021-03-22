import AppError from '@shared/errors/AppError';

import IOrderRepository from '../repositories/models/IOrderRepository';
import { IOrder } from '../interfaces/IOrder';


export default class ListOrdersService {
  constructor(private orderRepository: IOrderRepository) {}
  async execute(): Promise<IOrder[]> {
    const orders = await this.orderRepository.list();

    return orders;
  }
}
