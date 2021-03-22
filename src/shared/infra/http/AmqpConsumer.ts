import { Product } from '.prisma/client';
import AppError from '@shared/errors/AppError'
import IAmqpServer from '@shared/providers/rabbitmqprovider/models/IAmqpServer';
import ProductRepository from '@modules/products/infra/prisma/repositories/ProductRepository';
import UpdateStockService from '@modules/products/services/UpdateStockService';

interface UpdateStockDTO {
  name: string;
  command: string;
}

export default class AmqpConsumer {
  constructor(private server: IAmqpServer) {}
  public async execute(): Promise<any> {
    await this.server.start().catch(error => this.callConnectError(error));
    await this.server.consume('stock', message =>
      this.callUpdateStockService({
        name: message.content.toString('utf-8').replace(/^"|"$/g, ''),
        command: message.fields.routingKey,
      }).catch(error => console.log(error)),
    );
  }

  private async callUpdateStockService({
    name,
    command,
  }: UpdateStockDTO): Promise<Product> {
    const productRepository = new ProductRepository();
    const updateStockService = new UpdateStockService(productRepository);
    const updatedProduct = await updateStockService.execute({
      name,
      command,
    });
    return updatedProduct;
  }

  private async callConnectError(error): Promise<any> {
    throw new AppError(error, 504)
  }
}
