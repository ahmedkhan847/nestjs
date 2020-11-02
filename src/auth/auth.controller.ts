import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserLogin } from './login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: true,
        data: {
          access_token: 'testtoken',
        },
        errors: [],
        message: 'Login Successfull',
      },
    },
  })
  @ApiBody({
    type: UserLogin,
    required: true,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      const token = await this.authService.login(req.user);
      return {
        status: true,
        data: token,
        errors: [],
        message: 'Login Successfull',
      };
    } catch (error) {
      return {
        status: true,
        data: [],
        errors: error,
        message: 'Login Successfull',
      };
    }
  }
}
