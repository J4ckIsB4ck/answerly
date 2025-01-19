import { Controller, Get, Param, Post, Put, Body } from '@nestjs/common';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';
import { Question } from './question.entity';
import { QuestionDto, UpdateQuestionStatusDto } from './dto/question.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Question> {
    return this.questionsService.findOne(id);
  }

  @Post()
  create(@Body() questionDto: QuestionDto): Promise<Question> {
    return this.questionsService.create(questionDto);
  }

  @Put(':id/status')
  updateStatus(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateQuestionStatusDto,
  ): Promise<Question> {
    return this.questionsService.updateStatus(id, updateStatusDto.status);
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: UpdateQuestionDto,
  ): Promise<Question> {
    return await this.questionsService.update(id, updateData);
  }
}
