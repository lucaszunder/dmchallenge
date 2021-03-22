import AppError from '@shared/errors/AppError';
import FakeOrderRepository from '../repositories/fakes/FakeOrderRepository';
import ListOrdersService from './ListOrdersService';

describe('ListOrders', () => {
  it('should be able to list all orders', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const getAllOrders = new ListOrdersService(fakeOrderRepository);

    const orders = await getAllOrders.execute();

    expect(orders.length).toBe(1)
    expect(orders[0].total).toBe(11.03)
  });

  it('should raise an error if have no orders', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const getAllOrders = new ListOrdersService(fakeOrderRepository);

    const orders = await getAllOrders.execute();

    expect(orders.length).toBe(1)
    expect(orders[0].total).toBe(11.03)
  });

});
