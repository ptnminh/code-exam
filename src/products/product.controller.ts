import { Controller, Body, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CrawlProductDTO, CreateProductDTO } from './dto/product.dto';
import { HttpService } from '@nestjs/axios';
import { ShopifyProductsResponse } from './product';

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
      // return products.length;
      await this.productService.createProduct(products);
      return this.productService.getProducts(begin, end);

      // const queryString = `/products.json?since_id=0&created_at_max=${end}&created_at_min=${begin}&limit=250&fields=id,title,created_at,product_type,image`;
      // const result = await this.httpService.axiosRef.get(queryString);

      // return {
      //   length: result.data.products.length,
      //   item: result.data.products[result.data.products.length - 1].id,
      // };
    } catch (error) {
      console.log(error);
    }
  }

  @Post('crawl-create')
  async crawlProduct(@Body() body: CrawlProductDTO) {
    try {
      const { link } = body;
      const request = await this.httpService.axiosRef.get(link);
      const response = request.data;
      const { product } = response;
      if (product) {
        // const { title, body_html, vendor, product_type }: CreateProduct =
        //   product;
        const t = await this.httpService.axiosRef.post('/products.json', {
          product: {
            title: product.title,
            body_html: product.body_html,
            vendor: product.vendor,
            product_type: product.product_type,
            handle: product.handle,
            tags: product.tags,
            variants: product.variants.map(
              ({ id, created_at, updated_at, quantity_rule, ...variant }) => ({
                ...variant,
              }),
            ),
          },
        });

        return t.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
