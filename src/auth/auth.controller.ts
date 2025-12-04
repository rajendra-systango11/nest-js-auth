import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  @HttpCode(200)
  @Post('/login')
  login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('/all-users')
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get('/user-by-id/:id')
  getSingleUser(@Param('id') id: string) {
    return this.authService.getSingleUser(id);
  }
}
