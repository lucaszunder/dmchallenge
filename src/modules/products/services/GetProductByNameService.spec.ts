import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import GetProductByNameService from './GetProductByNameService';
import AppError from '@shared/errors/AppError';

describe('GetProductByName', () => {
  it('should be able to get a specific product by name', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const getProduct = new GetProductByNameService(fakeProductRepository);

    const product = await getProduct.execute('Angelica');

    expect(product).toHaveProperty('id');
    expect(product.price).toBe(5.6);
  });

  it('should not be able to get a specific product by wrong name', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const getProduct = new GetProductByNameService(fakeProductRepository);

    expect(getProduct.execute('ola')).rejects.toBeInstanceOf(AppError);
  });
});
