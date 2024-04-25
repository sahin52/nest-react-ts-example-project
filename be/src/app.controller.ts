import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { User as UserModel, Product as ProductModel, PinnedProduct } from '@prisma/client';

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
  async getPublishedProducts(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('sort') sort: 'asc' | 'desc' = 'asc',
  ): Promise<ProductModel[]> {
    const skip = (page - 1) * pageSize;
    const orderBy = { price: sort };    
    
    return this.productService.products({
      // where: { published: true },
      take: Number(pageSize),
      skip: skip,
      orderBy: orderBy,
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
            description: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('product')
  async createDraft(
    @Body() productData: { title: string; description?: string; authorEmail: string },
  ): Promise<ProductModel> {
    const { title, description, authorEmail } = productData;
    return this.productService.createProduct({
      title,
      description: description,
      owner: {
        connect: { email: authorEmail },
      },
      price: Math.round(Math.random() * 10000),
    });
  }

  @Get('create-mock-products')
  async createMockProducts() {
    return this.productService.createMockProducts();
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
  @Post('pin/:id/:userId')
  async pinProduct(@Param('id') id: number, @Param ('userId') userId: number): Promise<PinnedProduct> {
    return this.productService.pinProduct(id, userId);
  }
  @Post('unpin/:id/:userId')
  async unpinProduct(@Param('id') id: number, @Param ('userId') userId: number): Promise<PinnedProduct> {
    return this.productService.unpinProduct(id, userId);
  }
}