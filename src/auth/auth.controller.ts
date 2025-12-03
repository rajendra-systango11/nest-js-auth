import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }
  // @Get('/hello')
  // helloFun() {
  //   return this.authService.register();
  // }

  @Post('/register')
  register(@Body() registerUserDto: RegisterDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('/all-users')
  getAllUsers() {
    return this.authService.getAllUsers();
  }
}
