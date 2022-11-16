import {IsInt, IsOptional, IsString} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateNewsDto {
    @ApiPropertyOptional({type:Number})
    @IsInt()
    @IsOptional()
    id?: number;

    @ApiProperty({type:String})
    @IsString()
    title: string;

    @ApiProperty({type:String})
    @IsString({
        message:'Поле description должно быть строкой'
    })
    description: string;

    @ApiProperty({type:String})
    @IsString()
    author: string;

    @ApiPropertyOptional({type:Number})
    @IsInt()
    @IsOptional()
    countView?: number;
}
