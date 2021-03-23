import { PrismaClient, Product } from '@prisma/client';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface IProducts {
  name: string;
  quantity: number;
  price: number;
}

async function main(products) {
  try {
    await prisma.product.createMany({
      data: products,
    });
  } catch (err) {
    console.log(err);
  }
}

const csvPath = path.join(__dirname, '..', 'products.csv');
const products: IProducts[] = [];

fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', row => {
    products.push({
      ...row,
      price: parseFloat(row.price),
      quantity: parseInt(row.quantity, 10),
    });
  })
  .on('end', () => {
    main(products)
      .catch(e => {
        console.error(e);
        process.exit(1);
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  });
