import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductModule } from './products/product.module';
import { ProductService } from './products/product.service';
import { ConfigModule } from '@nestjs/config';
import { ShopifyCoreModule } from '@nestjs-shopify/core';
import { ApiVersion } from '@shopify/shopify-api';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),

    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
