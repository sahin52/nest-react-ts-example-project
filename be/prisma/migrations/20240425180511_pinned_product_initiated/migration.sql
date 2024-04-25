-- CreateTable
CREATE TABLE "PinnedProduct" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "PinnedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PinnedProduct_userId_productId_key" ON "PinnedProduct"("userId", "productId");

-- AddForeignKey
ALTER TABLE "PinnedProduct" ADD CONSTRAINT "PinnedProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PinnedProduct" ADD CONSTRAINT "PinnedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
