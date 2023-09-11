-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "created_date" TIMESTAMPTZ(3) NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
