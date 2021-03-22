import CreateOrderService from '@modules/orders/services/CreateOrderService';
import GetOrderService from '@modules/orders/services/GetOrderService';
import ListOrdersService from '@modules/orders/services/ListOrdersService';
import ProductRepository from '@modules/products/infra/prisma/repositories/ProductRepository';
import { Request, Response } from 'express';
import OrderRepository from '../../prisma/repositories/OrderRepository';

export default class OrderController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { products } = request.body;
    
    const orderRepository = new OrderRepository();
    const productRepository = new ProductRepository()
    const createOrderService = new CreateOrderService(orderRepository, productRepository);

    const newOrder = await createOrderService.execute(products);

    return response.json(newOrder);
  }

  public async list(
    request: Request,
    response: Response,
  ): Promise<Response> {    
    const orderRepository = new OrderRepository();
    const listOrdersService = new ListOrdersService(orderRepository);

    const orders = await listOrdersService.execute();

    return response.json(orders);
  }

  public async getOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    
    const orderRepository = new OrderRepository();
    const getOrderService = new GetOrderService(orderRepository);

    const Order = await getOrderService.execute(id);

    return response.json(Order);
  }
}
