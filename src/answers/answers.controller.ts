import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { Answer } from './answer.entity';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get()
  findAll(): Promise<Answer[]> {
    return this.answersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Answer> {
    return this.answersService.findOne(id);
  }

  @Post()
  create(@Body() answer: Partial<Answer>): Promise<Answer> {
    return this.answersService.create(answer);
  }
}
