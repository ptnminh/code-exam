import { Injectable } from '@nestjs/common';
import instance from 'src/api';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct() {
    const products = await instance.get(
      '/products.json?since_id=7978591715569&created_at_max=2023-08-07T23:59:59-07:00&created_at_min=2023-08-01T00:00:00-07:00&limit=250&fields=id,created_at',
    );
    return products;
  }
}
