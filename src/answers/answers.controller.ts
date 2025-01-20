import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Put } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { Answer } from './answer.entity';
import { AnswerDto } from './dto/answer.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('answers')
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
  create(@Body() answerDto: AnswerDto): Promise<Answer> {
    return this.answersService.create(answerDto);
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: UpdateAnswerDto,
  ): Promise<Answer> {
    return await this.answersService.update(id, updateData);
  }
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.answersService.remove(id);
  }
}
