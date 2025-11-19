import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  register(registerUserDto: RegisterDto) {
    return this.userService.createUser(registerUserDto);
  }
}
