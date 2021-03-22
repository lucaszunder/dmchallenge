import { Message } from 'amqplib';

export default interface IAmqpServer {
  start(): Promise<void>;
  consume(queue: string, callback: (message: Message) => void);
}
