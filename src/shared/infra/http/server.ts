import RabbitmqServer from '@shared/providers/rabbitmqprovider/implementations/rabbitMqServer';
import express, { Request, Response, NextFunction, response } from 'express';

import 'express-async-errors';
import AppError from '../../errors/AppError';
import AmqpConsumer from './AmqpConsumer';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

const Amqp = () => {
  const server = new RabbitmqServer('amqp://guest:guest@host.docker.internal:5672');
  const amqpConsumer = new AmqpConsumer(server);
  amqpConsumer.execute().then(
    success =>
      app.listen(3333, () => {
        console.log(`🚀 Server started on port 3333`);
      }),
    err =>
      setTimeout(() => {
        console.log(
          'Erro de conexão com servidor AMQP, tentando novamente em 5 segundos.',
        );
        Amqp();
      }, 5000),
  );
};

Amqp();

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Ocorreu um erro interno no servidor',
  });
});
