/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `Product`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product.name_unique" ON "Product"("name");
