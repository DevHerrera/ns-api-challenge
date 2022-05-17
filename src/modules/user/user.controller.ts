import {
  Controller,
  Post,
  Get,
  HttpCode,
  Body,
  Put,
  Param,
  UseGuards,
  Query,
  Req,
  Patch,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guard';

import { FollowCreatorManagerDto } from './dto/followCreatorManager.dto';

import { GetUser } from '../auth/decorators';
import { UserService } from './services/user.service';

@UseGuards(JwtGuard)
@Controller('account')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('creators/follow-management/:creatorId')
  public async followCreatorManager(
    @Param('creatorId') creatorId: number,
    @Body() data: FollowCreatorManagerDto,
    @GetUser('id') userId: number,
  ) {
    return this.userService.followCreatorManager(
      creatorId,
      userId,
      data.follow,
    );
  }
}
