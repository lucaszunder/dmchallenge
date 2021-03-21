import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

class ProductRepository {
  public async getByName(name: string): Promise<Product> {
    const product = await prisma.product
      .findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive',
          },
        },
      })
      .catch(e => {
        console.error(e);
        process.exit(1);
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return product;
  }
}

export default ProductRepository;
