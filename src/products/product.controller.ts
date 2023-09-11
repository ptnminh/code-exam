import { Controller, Get, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async createProduct(@Body() body: CreateProductDTO) {
    try {
      const { begin, end } = body;
      const queryString = `/products.json?since_id=0&created_at_max=${end}&created_at_min=${begin}&limit=250&fields=id,created_at,product_type,image`;

      return this.productService.createProduct();
    } catch (error) {
      console.log(error);
    }
  }
}
