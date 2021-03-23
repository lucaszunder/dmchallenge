import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

class ProductRepository {
  public async getByName(name: string): Promise<Product> {
    const product = await prisma.product.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    return product;
  }

  public async incremented(name: string): Promise<Product> {
    const product = await prisma.product
      .update({
        where: {
          name: name,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      })
      .catch(e => {
        console.error(e);
        process.exit(1);
      })
      .finally(async () => {});

    return product;
  }

  public async decremented(name: string, value = 1): Promise<Product> {
    const product = await prisma.product
      .update({
        where: {
          name: name,
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      })
      .catch(e => {
        console.error(e);
        process.exit(1);
      })
      .finally(async () => {});

    return product;
  }
}

export default ProductRepository;
