import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductResponse, ShopifyProductsResponse } from './product';
import { queryBuilder } from './query-builder';
import { PRODUCTS } from './query.type';
import {
  dateDiffInDays,
  getTheBegginingOfDay,
  getTheEndOfDay,
} from 'src/shared/utils';
const moment = require('moment-timezone');
@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(products: ShopifyProductsResponse[]) {
    return Promise.all(
      products.map(async (product: ShopifyProductsResponse) => {
        return this.prismaService.products.create({
          data: {
            title: product.title.replaceAll('s/\x00//g', ''),
            createdDate: product.created_at,
            productType: product.product_type,
            imageUrl: product.image?.src ?? '',
          },
        });
      }),
    );
  }

  async getProducts(begin: string, end: string): Promise<any> {
    const dateDiff = Array(dateDiffInDays(begin, end) + 2).fill(0);
    const beginDate = new Date(begin);
    let result: ProductResponse[] = [];
    let from = begin;
    let to = getTheEndOfDay(begin);
    for (let _ of dateDiff) {
      const products = await this.prismaService.products.findMany(
        queryBuilder({
          type: PRODUCTS.GET_PRODUCT_LIST,
          from,
          to,
        }),
      );
      result = [
        ...result,
        {
          date: moment(from).format('YYYY-MM-DD'),
          numOfProducts: products.length,
          productIds: products.map((product) => product.id),
        },
      ];
      beginDate.setDate(beginDate.getDate() + 1);
      from = getTheBegginingOfDay(new Date(beginDate).toISOString());
      to = getTheEndOfDay(new Date(beginDate).toISOString());
    }
    return result;
  }
}
