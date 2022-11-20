import { IsArray, IsInt, IsNumberString, IsOptional, IsString } from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateCommentDto {

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    id?: number;

    @ApiProperty({type: String})
    @IsString({
        message: 'Поле message должно быть строкой'
    })
    message: string;

    @ApiProperty({type: String})
    @IsString()
    author: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    reply?: CreateCommentDto[];
}

export type Comments = Record<string | number, CreateCommentDto[]>;