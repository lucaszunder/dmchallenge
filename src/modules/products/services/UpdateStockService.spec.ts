import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import GetProductByNameService from './GetProductByNameService';
import AppError from '@shared/errors/AppError';
import UpdateStockService from './UpdateStockService';

describe('UpdateStock', () => {
  it('should be able to increment a product quantity', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const incrementProduct = new UpdateStockService(fakeProductRepository);

    const product = await incrementProduct.execute({
      command: 'incremented',
      name: 'Angelica',
    });

    expect(product.quantity).toBe(2);
  });

  it('should be able to increment a product quantity', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const decrementProduct = new UpdateStockService(fakeProductRepository);

    const product = await decrementProduct.execute({
      command: 'decremented',
      name: 'Angelica',
    });

    expect(product.quantity).toBe(0);
  });

  it('should not be able to decrement a product quantity', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const decrementProduct = new UpdateStockService(fakeProductRepository);

    const product = await decrementProduct.execute({
      command: 'decremented',
      name: 'Angelica',
    });

    expect(product.quantity).toBe(0);
    expect(
      decrementProduct.execute({
        command: 'decremented',
        name: 'Angelica',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to decrement a inexistent product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const decrementProduct = new UpdateStockService(fakeProductRepository);

    expect(
      decrementProduct.execute({
        command: 'decremented',
        name: 'test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
