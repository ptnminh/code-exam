import {
  Controller,
  Body,
  Post,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CrawlProductDTO, CreateProductDTO } from './dto/product.dto';
import { HttpService } from '@nestjs/axios';
import { ShopifyProductsResponse } from './product';
import { formatData, getImageAndVariantIndex } from './query-builder';

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
      throw new InternalServerErrorException();
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
        const { image: imagesResponse, variants: variantsResponse } = product;

        const createProductRequest = await this.httpService.axiosRef.post(
          '/products.json',
          formatData(product),
        );

        const createProductResponse = createProductRequest.data;
        const { product: productReponse } = createProductResponse;

        // connect variant to image
        // Lỗi
        // if (productReponse) {
        //   if (!!imagesResponse.variant_ids.length) {
        //     imagesResponse.variant_ids.map((_, index) => {
        //       let variantId: number = productReponse.variants[index].id;
        //       console.log({
        //         id: variantId,
        //         image_id: imagesResponse.id,
        //       });
        //       return this.httpService.axiosRef.put(
        //         `/variants/${variantId}.json`,
        //         {
        //           variant: {
        //             id: variantId,
        //             image_id: imagesResponse.id,
        //           },
        //         },
        //       );
        //     });
        //   }
        // }

        // create product for return to user

        const productToResponseToUser = await this.productService.createProduct(
          [
            {
              title: product.title,
              product_type: product.product_type,
              created_at: product.created_at,
              image: product.iamge,
            },
          ],
        );
        return {
          product_id: productToResponseToUser[0].id,
        };
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
