import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Post()
  create(@Body() commentDto: CommentDto): Promise<Comment> {
    return this.commentsService.create(commentDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: UpdateCommentDto,
  ): Promise<Comment> {
    return await this.commentsService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.commentsService.remove(id);
  }
}
