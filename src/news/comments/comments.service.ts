import {Injectable} from '@nestjs/common';
import {CreateNewsDto} from "../dto/create-news.dto";
import {getRandomInt} from "../../helpers/helpers";
import {UpdateNewsDto} from "../dto/update-news.dto";
import {Comments, CreateCommentDto} from "./dto/create-comment.dto";

@Injectable()
export class CommentsService {

    private readonly comments:Comments = {
        1: [{
            id: 123,
            message: "Ура! Наш первый комментарий",
            author: "Маша"
        }]
    };

    create(newsId:string|number,comment:CreateCommentDto): CreateCommentDto[]|string {
       if(this.comments[newsId]){
           this.comments[newsId].push(comment);
           return this.comments[newsId];
       }

        return "Комментарии не найдены";
    }

    findAll(newsId: string|number): CreateCommentDto[] {
        return this.comments[newsId];
    }

    findOne(newsId:number,commentId: number): CreateCommentDto | string {
        if(!this.comments[newsId]){
            return "Новость с данным id не найдена";
        }
        const comment=this.comments[newsId].find(comment=>comment.id===commentId);
        if(!comment){
            return "Комментарий не найден";
        }
        return comment;
    }

    // update(id: number, updateNewsDto: UpdateNewsDto) {
    //     const indexUpdateNews = id in this.news;
    //     if (indexUpdateNews) {
    //         this.news[id] = {
    //             ...updateNewsDto
    //         };
    //         return true;
    //     }
    //     return false;
    // }
    //
    // remove(id: number): boolean {
    //     const indexRemoveNews = id in this.news;
    //     if (indexRemoveNews) {
    //         delete this.news[id];
    //         return true;
    //     }
    //     return false;
    // }
}
