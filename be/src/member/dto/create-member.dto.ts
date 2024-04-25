import { ApiProperty, ApiBody, ApiExtraModels } from '@nestjs/swagger';

export class CreateMemberDto {
    username: string;
    email: string;
    password: string;
}
