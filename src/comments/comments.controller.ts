import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get a list of all comments',
    description: 'Returns an array of comment objects.',
  })
  @ApiResponse({ status: 200, description: 'The list of comments was successfully retrieved.' })
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get comment data',
    description: 'Returns a comment object by its ID.',
  })
  @ApiParam({ name: 'id', description: 'Comment ID', type: Number })
  @ApiResponse({ status: 200, description: 'Comment data successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Comment with this ID not found.' })
  findOne(@Param('id') id: number): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new comment',
    description: 'Creates a comment based on the given data.',
  })
  @ApiResponse({ status: 201, description: 'Comment successfully created.' })
  @ApiResponse({ status: 400, description: 'Incorrect data for comment.' })
  create(@Body() commentDto: CommentDto): Promise<Comment> {
    return this.commentsService.create(commentDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update comment details',
    description: 'Updates comment data by ID.',
  })
  @ApiParam({ name: 'id', description: 'Comment ID', type: Number })
  @ApiResponse({ status: 200, description: 'Comment updated successfully.' })
  @ApiResponse({ status: 400, description: 'Incorrect data for update.' })
  @ApiResponse({ status: 404, description: 'Comment with this ID not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateData: UpdateCommentDto,
  ): Promise<Comment> {
    return await this.commentsService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete comment',
    description: 'Deletes a comment by its ID.',
  })
  @ApiParam({ name: 'id', description: 'Comment ID', type: Number })
  @ApiResponse({ status: 200, description: 'Comment successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Comment with this ID not found.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.commentsService.remove(id);
  }
}
