interface IProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

class FakeProductRepository {
  private products: IProduct[] = [
    {
      id: '1',
      name: 'Angelica',
      quantity: 0,
      price: 5.6,
    },
  ];

  public async getByName(name: string): Promise<IProduct | undefined> {
    const product = this.products.find(product => product.name === name)

    return (product)
  }
}

export default FakeProductRepository;
