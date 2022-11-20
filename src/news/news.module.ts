import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { CommentsModule } from './comments/comments.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [CommentsModule],
  exports:[NewsService]
})
export class NewsModule {}
