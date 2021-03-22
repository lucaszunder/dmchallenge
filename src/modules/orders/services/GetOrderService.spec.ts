import AppError from '@shared/errors/AppError';
import FakeOrderRepository from '../repositories/fakes/FakeOrderRepository';
import GetOrderService from './GetOrderService';
import ListOrdersService from './ListOrdersService';

describe('GetOrder', () => {
  it('should be able to get one specific order', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const getOneOrder = new GetOrderService(fakeOrderRepository);

    const order = await getOneOrder.execute('1');
    expect(order.id).toBe(1)
    expect(order.total).toBe(11.03);
  });

  it('should raise an error when the ids does not match an order', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const getOneOrder = new GetOrderService(fakeOrderRepository);
    
    expect(getOneOrder.execute('5')).rejects.toBeInstanceOf(AppError);
  });
});
