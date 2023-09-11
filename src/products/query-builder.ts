import { Prisma } from '@prisma/client';
import { PRODUCTS } from './query.type';

export const queryBuilder = (request: { type: number; from: any; to: any }) => {
  let match: any = {};
  switch (request.type) {
    case PRODUCTS.GET_PRODUCT_LIST: {
      const products: Prisma.productsFindManyArgs = {
        where: {
          createdDate: {
            gte: request.from,
            lte: request.to,
          },
        },
        select: {
          createdDate: true,
          id: true,
        },
      };
      match = { ...products };
      break;
    }

    default: {
      break;
    }
  }

  return match;
};
