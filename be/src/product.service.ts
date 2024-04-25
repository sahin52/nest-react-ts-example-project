import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Product, Prisma, PinnedProduct } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async post(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: productWhereUniqueInput,
    });
  }

  async products(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async createMockProducts() {
    console.log('Creating mock products');
    let imageUrls = [
      'https://hdwallsbox.com/wallpapers/m/89/animals-animal-world-lemur-nature-m88531.jpg',
      'https://cache.desktopnexus.com/thumbseg/1706/1706298-bigthumbnail.jpg',
      'https://res.allmacwallpaper.com/pic/Thumbnails/18712_360.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Leopard_in_the_Colchester_Zoo.jpg/300px-Leopard_in_the_Colchester_Zoo.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Mimas_Cassini.jpg/600px-Mimas_Cassini.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Daniel_Defoe_Kneller_Style.jpg/501px-Daniel_Defoe_Kneller_Style.jpg',
    ];
    let latestProduct = await this.prisma.product.findFirst({
      orderBy: { id: 'desc' },
    });
    console.log('latestProduct', latestProduct);
    let latestProductId = latestProduct?.id;
    if (!latestProduct) {
      latestProductId = 0;
    }
    console.log('latestProductId', latestProductId);
    let productIds = Array.from(
      { length: 10 },
      (_, i) => i + latestProductId + 1,
    );
    let data: Prisma.ProductCreateInput[] = productIds.map((id, index) => {
      return {
        id: id,
        title: `Product ${id}`,
        description: `Description for product ${id}`,
        price: Math.round(Math.random() * 10000),
        image: imageUrls[Math.round(Math.random() * (imageUrls.length - 1))],
        published: true,
      };
    });
    console.log('data', data);
    return this.prisma.product.createMany({
      data,
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { data, where } = params;
    return this.prisma.product.update({
      data,
      where,
    });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({
      where,
    });
  }

  async pinProduct( productId: number, userId: number): Promise<PinnedProduct> {
    return this.prisma.pinnedProduct.create({
      data: {
        userId: userId,
        productId: productId,
      },
    });
  }

  async unpinProduct( productId: number, userId: number): Promise<PinnedProduct> {
    return this.prisma.pinnedProduct.delete({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });
  }
}
