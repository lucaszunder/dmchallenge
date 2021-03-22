import { CreateOrderDTO } from '@modules/orders/dtos/CreateOrderDTO';
import { IOrder } from '@modules/orders/interfaces/IOrder';
import { IProduct } from '@modules/products/interfaces/IProduct';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class OrderRepository {
  public async list(): Promise<IOrder[]> {
    const order = await prisma.order
      .findMany()
      .catch(e => {
        console.error(e);
        process.exit(1);
      })
      .finally(async () => {});
    return order;
  }

  public async create(
    products: CreateOrderDTO,
    total: number,
  ): Promise<IOrder> {
    const order = await prisma.order
      .create({
        data: {
          products: products,
          total,
        },
        select: {
          id: true,
          products: true,
          total: true,
        },
      })
      .catch(e => {
        console.error(e);
        process.exit(1);
      })
      .finally(async () => {});

    return order;
  }

  public async findById(id: number): Promise<IOrder> {
    const order = await prisma.order
      .findUnique({
        where: {
          id,
        },
      })
      .catch(e => {
        console.error(e);
        process.exit(1);
      })
      .finally(async () => {});

    return order;
  }
}

export default OrderRepository;
