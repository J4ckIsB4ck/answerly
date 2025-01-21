import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(userDto: UserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['questions', 'answers', 'comments'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    console.log('Deleting user and related entities:', user);

    try {
      await this.userRepository.remove(user);
      console.log(`User with ID ${id} and related data deleted successfully`);
    } catch (error) {
      console.error('Error during user deletion:', error);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

}
