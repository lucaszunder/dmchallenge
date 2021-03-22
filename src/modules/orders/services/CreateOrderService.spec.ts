import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductRepository';
import AppError from '@shared/errors/AppError';
import FakeOrderRepository from '../repositories/fakes/FakeOrderRepository';
import CreateOrderService from './CreateOrderService';

describe('CreateOrder', () => {
  it('should be able to create a new order', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const fakeProductRepository = new FakeProductRepository();
    const createOrder = new CreateOrderService(
      fakeOrderRepository,
      fakeProductRepository,
    );

    const products = [
      {
        name: 'Kiwi',
        quantity: 1,
      },
      {
        name: 'Fig',
        quantity: 1,
      },
    ];

    const newOrder = await createOrder.execute(products);

    expect(newOrder.id).toBe(2);
  });

  it('should raise an error when the when the stock is insufficient', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const fakeProductRepository = new FakeProductRepository();
    const createOrder = new CreateOrderService(
      fakeOrderRepository,
      fakeProductRepository,
    );

    const products = [
      {
        name: 'Kiwi',
        quantity: 16,
      },
      {
        name: 'Fig',
        quantity: 10,
      },
    ];

    expect(createOrder.execute(products)).rejects.toBeInstanceOf(AppError);
  });
});
