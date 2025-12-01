import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(registerUserDto: RegisterDto) {
    await bcrypt.hash(registerUserDto.password, 10);
    return this.userService.createUser(registerUserDto);
  }
}
