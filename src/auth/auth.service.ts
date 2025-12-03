import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerUserDto: RegisterDto) {
    const hashPass = await bcrypt.hash(registerUserDto.password, 10);
    registerUserDto.password = hashPass;
    const user = this.userService.createUser(registerUserDto);
    const payload = { sub: (await user)._id };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
  async login(loginDto: any) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (user) {
      const isMatch = await bcrypt.compare(loginDto.password, user.password);
      if (isMatch) {
        const payload = { sub: user._id };
        const token = await this.jwtService.signAsync(payload);
        return token;
      }
    }
    throw new UnauthorizedException('Invalid credentials');
  }
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
