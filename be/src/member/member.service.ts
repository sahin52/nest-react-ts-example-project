import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService){}
  create(createMemberDto: CreateMemberDto) {
    return createMemberDto;
  }

  findAll() {
    return [] as CreateMemberDto[];
  }

  findOne(id: number) {
    return {email: "test@test.com",username: "test"} as CreateMemberDto;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return updateMemberDto;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
