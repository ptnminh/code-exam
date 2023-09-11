import { Controller, Get, Body, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/product.dto';
import { HttpService } from '@nestjs/axios';
import { ShopifyProductsResponse } from './product';
import { getTheBegginingOfDay, getTheEndOfDay } from 'src/shared/utils';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly httpService: HttpService,
  ) {}

  @Post('upsert')
  async createProduct(@Body() body: CreateProductDTO) {
    try {
      const { begin, end } = body;

      let products: any = [];
      let since_id: number = 0;
      while (true) {
        const queryString = `/products.json?since_id=${since_id}&created_at_max=${end}&created_at_min=${begin}&limit=250&fields=id,title,created_at,product_type,image`;
        const result = await this.httpService.axiosRef.get(queryString);
        const data: ShopifyProductsResponse[] = result.data.products;
        products = [...products, ...data];
        if (data.length < 250) {
          break;
        }
        since_id = data[data.length - 1].id;
      }

      await this.productService.createProduct(products);
      return this.productService.getProducts(begin, end);
    } catch (error) {
      console.log(error);
    }
  }
}
