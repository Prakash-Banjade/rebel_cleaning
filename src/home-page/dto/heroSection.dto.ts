import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { MemoryStoredFile } from "nestjs-form-data";

export class HeroSectionDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    subtitle: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    image: MemoryStoredFile | string
    
}