import {Body, Controller, Delete, Get, Param, Patch, Post, Res} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateNewsDto} from "../dto/create-news.dto";
import {Response} from "express";
import {UpdateNewsDto} from "../dto/update-news.dto";
import {Comments, CreateCommentDto} from "./dto/create-comment.dto";

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService:CommentsService) {
    }

    @Post("/:newsId")
    @ApiTags('comments')
    @ApiBody({type:CreateCommentDto})
    @ApiResponse({
        status:201,
        description:'create new comment',
        type:[CreateCommentDto]
    })
    create(@Param('newsId') newsId:number, @Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(newsId, createCommentDto);
    }

    @Get("/:newsId")
    @ApiTags('comments')
    @ApiResponse({
        status:200,
        description:'get all comments by news id',
        type:[CreateCommentDto]
    })
    findAll(@Param('newsId') newsId:number) {
        return this.commentsService.findAll(newsId);

    }

    @Get('/:newsId/:commentId')
    @ApiTags('comments')
    @ApiResponse({
        status:200,
        description:'get comment by newsId and commentId',
        type:CreateCommentDto
    })
    findOne(@Param('newsId') newsId:number,@Param('commentId') commentId:number):CreateCommentDto|string {
        return this.commentsService.findOne(newsId,commentId);
    }

    // @Patch(':id')
    // @ApiTags('news')
    // @ApiBody({type:UpdateNewsDto})
    // @ApiResponse({
    //     status:200,
    //     description:'update news',
    //     type:"Новость успешно обновлена"
    // })
    // @ApiResponse({
    //     status:500,
    //     description:'incorrect id',
    //     type:"По передаваемому ID новость не найдена"
    // })
    // update(@Param('id') id: number, @Body() updateNewsDto: UpdateNewsDto, @Res() response: Response) {
    //     const res = this.commentsService.update(id, updateNewsDto);
    //     if (res) {
    //         return response.status(200).send('Новость успешно обновлена');
    //     }
    //     return response.status(500).send('По передаваемому ID новость не найдена');
    //
    // }
    //
    // @Delete(':id')
    // @ApiTags('news')
    // @ApiResponse({
    //     status:200,
    //     description:'delete news by id',
    //     type:"is successful"
    // })
    // remove(@Param('id') id: number): string {
    //     const isRemoved = this.commentsService.remove(id);
    //     return isRemoved ? 'Новость успешно удалена' : 'Новость не найдена';
    // }
}
