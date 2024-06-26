import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateSubscriberDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
