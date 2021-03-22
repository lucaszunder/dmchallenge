import { CreateOrderDTO } from '@modules/orders/dtos/CreateOrderDTO';
import { IOrder } from '@modules/orders/interfaces/IOrder';

export default interface IOrderRepository {
  create(products: CreateOrderDTO, total: number): Promise<IOrder>;
  list(): Promise<IOrder[]>;
  findById(id: number): Promise<IOrder>;
}
