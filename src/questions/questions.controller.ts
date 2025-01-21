import { Controller, Get, Param, Post, Put, Body, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './question.entity';
import { QuestionDto, UpdateQuestionStatusDto } from './dto/question.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get a list of all questions',
    description: 'Returns an array of question objects.',
  })
  @ApiResponse({ status: 200, description: 'The list of questions has been successfully received.' })
  findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get question data',
    description: 'Returns a question object by its ID.',
  })
  @ApiParam({ name: 'id', description: 'Question ID', type: Number })
  @ApiResponse({ status: 200, description: 'The question data has been successfully received.' })
  @ApiResponse({ status: 404, description: 'Question with this ID not found.' })
  findOne(@Param('id') id: number): Promise<Question> {
    return this.questionsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new question',
    description: 'Creates a question based on the provided data.',
  })
  @ApiResponse({ status: 201, description: 'The question was successfully created.' })
  @ApiResponse({ status: 400, description: 'Incorrect data for the question.' })
  create(@Body() questionDto: QuestionDto): Promise<Question> {
    return this.questionsService.create(questionDto);
  }

  @Put(':id/status')
  @ApiOperation({
    summary: 'Update question status',
    description: 'Updates the status of a question by ID.',
  })
  @ApiParam({ name: 'id', description: 'Question ID', type: Number })
  @ApiResponse({ status: 200, description: 'The status of the issue has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Incorrect data for status update.' })
  @ApiResponse({ status: 404, description: 'Question with this ID not found.' })
  updateStatus(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateQuestionStatusDto,
  ): Promise<Question> {
    return this.questionsService.updateStatus(id, updateStatusDto.status);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update question details',
    description: 'Updates question data by ID.',
  })
  @ApiParam({ name: 'id', description: 'Question ID', type: Number })
  @ApiResponse({ status: 200, description: 'The question has been updated successfully.' })
  @ApiResponse({ status: 400, description: 'Incorrect data for update.' })
  @ApiResponse({ status: 404, description: 'Question with this ID not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateData: QuestionDto,
  ): Promise<Question> {
    return await this.questionsService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete question',
    description: 'Deletes a question by its ID.',
  })
  @ApiParam({ name: 'id', description: 'Question ID', type: Number })
  @ApiResponse({ status: 200, description: 'The question has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Question with this ID not found.' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.questionsService.delete(id);
    return { message: `Question with ID ${id} has been deleted.` };
  }
}
