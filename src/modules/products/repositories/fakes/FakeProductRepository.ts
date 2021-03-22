import { IProduct } from '@modules/products/interfaces/IProduct';

class FakeProductRepository {
  private products: IProduct[] = [
    {
      id: '1',
      name: 'Angelica',
      quantity: 1,
      price: 5.6,
    },
    { id: '2', name: 'Kiwi', quantity: 2, price: 9.21 },
    { id: '3', name: 'Fig', quantity: 2, price: 1.82 },
  ];

  public async getByName(name: string): Promise<IProduct | undefined> {
    const product = this.products.find(product => product.name === name);

    return product;
  }

  public async incremented(name: string): Promise<IProduct | undefined> {
    const index = this.products.findIndex(product => product.name === name);

    const product = this.products.find(product => product.name === name);

    product.quantity++;

    this.products.splice(index, 1, product);

    return product;
  }

  public async decremented(name: string): Promise<IProduct | undefined> {
    const index = this.products.findIndex(product => product.name === name);

    const product = this.products.find(product => product.name === name);

    product.quantity--;

    this.products.splice(index, 1, product);

    return product;
  }
}

export default FakeProductRepository;
