-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'EMPLOYEE', 'USER');

-- CreateEnum
CREATE TYPE "ServicesStatus" AS ENUM ('DONE', 'PENDING', 'PROGRESS');

-- CreateTable
CREATE TABLE "users" (
    "id" STRING NOT NULL,
    "role" "Roles" NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" STRING NOT NULL,
    "username" STRING NOT NULL,
    "phone_number" INT4 NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addreess" (
    "id" STRING NOT NULL,
    "number" INT4 NOT NULL,
    "street" STRING NOT NULL,
    "neighborhood" STRING NOT NULL,
    "complement" STRING NOT NULL,

    CONSTRAINT "addreess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" STRING NOT NULL,
    "customer_id" STRING NOT NULL,
    "details" STRING NOT NULL,
    "value" INT4 NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "status" "ServicesStatus" NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
