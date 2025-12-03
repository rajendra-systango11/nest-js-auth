import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModal: Model<User>) {}
  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.UserModal.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern.email)
        throw new ConflictException('Email already exists');
      else {
        throw error;
      }
    }
  }
}
