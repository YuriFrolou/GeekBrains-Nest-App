import {Controller, Get, Post, Body, Patch, Param, Delete, Res} from '@nestjs/common';
import {Response} from 'express';
import {NewsService} from './news.service';
import {CreateNewsDto} from './dto/create-news.dto';
import {UpdateNewsDto} from './dto/update-news.dto';
import {ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {
    }

    @Post()
    @ApiTags('news')
    @ApiBody({type:CreateNewsDto})
    @ApiResponse({
        status:201,
        description:'create new news',
        type:[CreateNewsDto]
    })
    create(@Body() createNewsDto: CreateNewsDto) {
        return this.newsService.create(createNewsDto);
    }

    @Get()
    @ApiTags('news')
    @ApiResponse({
        status:200,
        description:'get all news',
        type:[CreateNewsDto]
    })
    findAll(@Res() response: Response) {
       const res=this.newsService.findAll();
        if(res){
            return response.status(200).send(res);
        }
       return response.status(500).send('Что-то пошло не так. Попробуйте повторить запрос');

    }

    @Get(':id')
    @ApiTags('news')
    @ApiResponse({
        status:200,
        description:'get news by id',
        type:CreateNewsDto
    })
    findOne(@Param('id') id: number) {
        return this.newsService.findOne(id);
    }

    @Patch(':id')
    @ApiTags('news')
    @ApiBody({type:UpdateNewsDto})
    @ApiResponse({
        status:200,
        description:'update news',
        type:"Новость успешно обновлена"
    })
    @ApiResponse({
        status:500,
        description:'incorrect id',
        type:"По передаваемому ID новость не найдена"
    })
    update(@Param('id') id: number, @Body() updateNewsDto: UpdateNewsDto, @Res() response: Response) {
        const res = this.newsService.update(id, updateNewsDto);
        if (res) {
            return response.status(200).send('Новость успешно обновлена');
        }
        return response.status(500).send('По передаваемому ID новость не найдена');

    }

    @Delete(':id')
    @ApiTags('news')
    @ApiResponse({
        status:200,
        description:'delete news by id',
        type:"is successful"
    })
    remove(@Param('id') id: number): string {
        const isRemoved = this.newsService.remove(id);
        return isRemoved ? 'Новость успешно удалена' : 'Новость не найдена';
    }
}
