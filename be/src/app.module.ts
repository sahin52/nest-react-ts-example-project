import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { PrismaService } from './prisma.service';
import { MemberModule } from './member/member.module';
import { MemberService } from './member/member.service';

@Module({
  imports: [MemberModule],
  controllers: [AppController],
  providers: [AppService, UserService, ProductService, PrismaService, MemberService],
})
export class AppModule {}
