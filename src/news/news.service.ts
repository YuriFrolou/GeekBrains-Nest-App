import {Injectable} from '@nestjs/common';
import {CreateNewsDto} from './dto/create-news.dto';
import {UpdateNewsDto} from './dto/update-news.dto';
import {getRandomInt} from "../helpers/helpers";

@Injectable()
export class NewsService {

    private readonly news: CreateNewsDto[] = [
        {
            id: 1,
            title: "Первая новость",
            description: "Ура! Наша первая новость",
            author: "Владислав",
            countView: 12
        }
    ];

    create(createNewsDto: CreateNewsDto): CreateNewsDto[] {
        const newId = getRandomInt(1,10000);
        const newNews = {
            id: newId,
            ...createNewsDto
        };
        this.news.push(newNews);
        return this.news;
    }

    findAll(): CreateNewsDto[] {
        return this.news;
    }

    findOne(id: number): CreateNewsDto | undefined {
        return this.news.find(item => item.id === id);
    }

    update(id: number, updateNewsDto: UpdateNewsDto) {
        const indexUpdateNews=this.news.findIndex(item=>item.id===id);
        if(indexUpdateNews!==-1){
           this.news[indexUpdateNews]={
               ...this.news[indexUpdateNews],
               ...updateNewsDto
           }
            return true;
        }
        return false;
    }

    remove(id: number):boolean {
        const indexRemoveNews=this.news.findIndex(item=>item.id===id);
        if(indexRemoveNews!==-1){
            this.news.splice(indexRemoveNews,1);
            return true;
        }
        return false;
    }
}
