/* eslint-disable no-var */
import type { JestPrisma } from '@quramy/jest-prisma-core';
import { PrismaClient } from '@prisma/client';

declare global {
  var jestPrisma: JestPrisma<PrismaClient>;
}
