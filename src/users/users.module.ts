import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Импортируем репозиторий User
  providers: [UsersService],                  // Добавляем сервис UsersService
  controllers: [UsersController],             // Добавляем контроллер
  exports: [TypeOrmModule],                   // Экспортируем TypeOrmModule
})
export class UsersModule {}
