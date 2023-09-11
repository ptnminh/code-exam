import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct() {
    return this.prismaService.products.create({
      data: {
        title: 'Realme',
        productType: 'Test',
        createdDate: new Date().toUTCString(),
        imageUrl: 'hihiahah',
      },
    });
  }
}
