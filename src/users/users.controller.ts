import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse,ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get list of all users',
    description: 'Returns an array of user objects.',
  })
  @ApiResponse({ status: 200, description: 'The user list has been successfully retrieved.' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user data',
    description: 'Returns a user object by its ID.',
  })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  @ApiResponse({ status: 200, description: 'User data successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'User with this ID not found.' })
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a user based on the provided data.',
  })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Incorrect data.' })
  create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes a user by their ID and associated data.',
  })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User with this ID not found.' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.usersService.delete(id);
    return { message: `User with ID ${id} and all related data have been deleted.` };
  }
}
