import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { User as UserModel, Product as ProductModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Get('product/:id')
  async getProductById(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.post({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedProducts(): Promise<ProductModel[]> {
    return this.productService.products({
      where: { published: true },
    });
  }

  @Get('filtered-products/:searchString')
  async getFilteredProducts(
    @Param('searchString') searchString: string,
  ): Promise<ProductModel[]> {
    return this.productService.products({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('product')
  async createDraft(
    @Body() productData: { title: string; content?: string; authorEmail: string },
  ): Promise<ProductModel> {
    const { title, content, authorEmail } = productData;
    return this.productService.createProduct({
      title,
      content,
      owner: {
        connect: { email: authorEmail },
      },
    });
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id')
  async publishProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.updateProduct({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('product/:id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.deleteProduct({ id: Number(id) });
  }
}