import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Put } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { Answer } from './answer.entity';
import { AnswerDto } from './dto/answer.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';


@ApiTags('Answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get a list of all answers',
    description: 'Returns an array of answer objects.',
  })
  @ApiResponse({ status: 200, description: 'The list of answers was successfully received.' })
  findAll(): Promise<Answer[]> {
    return this.answersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get answer data',
    description: 'Returns the answer object by its ID.',
  })
  @ApiParam({ name: 'id', description: 'answer ID', type: Number })
  @ApiResponse({ status: 200, description: 'Answer data received successfully.' })
  @ApiResponse({ status: 404, description: 'No answer found with this ID.' })
  findOne(@Param('id') id: number): Promise<Answer> {
    return this.answersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new answer',
    description: 'Creates an answer based on the passed data.',
  })
  @ApiResponse({ status: 201, description: 'Answer successfully created.' })
  @ApiResponse({ status: 400, description: 'Incorrect data.' })
  create(@Body() answerDto: AnswerDto): Promise<Answer> {
    return this.answersService.create(answerDto);
  }
  @Put(':id')
  @ApiOperation({
    summary: 'Update answer details',
    description: 'Updates answer data by ID.',
  })
  @ApiParam({ name: 'id', description: 'ID response', type: Number })
  @ApiResponse({ status: 200, description: 'The answer has been updated successfully.' })
  @ApiResponse({ status: 400, description: 'Incorrect data for update.' })
  @ApiResponse({ status: 404, description: 'No answer found with this ID.' })
  async update(
    @Param('id') id: number,
    @Body() updateData: UpdateAnswerDto,
  ): Promise<Answer> {
    return await this.answersService.update(id, updateData);
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete answer',
    description: 'Deletes an answer by its ID.',
  })
  @ApiParam({ name: 'id', description: 'answer ID', type: Number })
  @ApiResponse({ status: 200, description: 'The answer has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'No answer found with this ID.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.answersService.remove(id);
  }
}
