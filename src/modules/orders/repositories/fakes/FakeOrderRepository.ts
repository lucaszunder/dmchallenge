import { CreateOrderDTO } from '@modules/orders/dtos/CreateOrderDTO';
import { IOrder } from '@modules/orders/interfaces/IOrder';

export default class FakeOrderRepository {
  private orders: IOrder[] = [
    {
      id: 1,
      products: [
        { name: 'Kiwi', price: 9.21, quantity: 1 },
        { name: 'Fig', price: 1.82, quantity: 1 },
      ],

      total: 11.03,
      createdAt: new Date(),
    },
  ];

  public async create(
    products: CreateOrderDTO,
    total: number,
  ): Promise<IOrder> {
    const order = {
      id: this.orders.length + 1,
      products: products,
      total: total,
      createdAt: new Date(),
    };
    this.orders.push(order)
    return order
  }

  public async list(): Promise<IOrder[]> {
    return this.orders;
  }

  public async findById(id: number): Promise<IOrder | undefined> {
    const order = this.orders.find(order => order.id === id);

    return order;
  }
}
