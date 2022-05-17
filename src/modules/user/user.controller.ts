import {
  Controller,
  Post,
  Get,
  HttpCode,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { JwtGuard } from '../auth/guard';

import { FollowCreatorManagerDto } from './dto/followCreatorManager.dto';

import { GetUser } from '../auth/decorators';
import { UserService } from './services/user.service';

@ApiTags('Account')
@ApiBearerAuth('jwt')
@UseGuards(JwtGuard)
@Controller('account')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get account information from logged in user' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })

  /**
   * [Get general account information,
   * uploaded videos, followers and likes]
   * @route GET[/account]
   */
  @Get()
  getAccountInformation(@GetUser('id') userId: number) {
    return this.userService.getAccountInformation(userId);
  }

  @ApiOperation({ summary: 'Get liked videos from logged in user' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'No videos found' })
  @ApiQuery({ required: false, name: 'take', description: 'Limit request' })
  @ApiQuery({ required: false, name: 'skip', description: 'Offset request' })

  /**
   * [Get liked videos]
   * @route GET[/account/liked-videos]
   */
  @Get('liked-videos')
  getLikedVideos(
    @Query('take') take: number,
    @Query('skip') skip: number,
    @GetUser('id') userId: number,
  ) {
    return this.userService.getLikedVideos(userId, {
      skip,
      take,
    });
  }

  @ApiOperation({ summary: 'Follow or Unfollow a creator' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Creator not found' })
  @ApiResponse({ status: 409, description: 'Cannot follow yourself' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({
    required: true,
    name: 'follow',
    type: 'boolean',
    description: 'Flag true or false',
  })

  /**
   * [Follow a creator]
   * @route POST[/account/creators/follow-management/:creatorId]
   */
  @Post('creators/follow-management/:creatorId')
  @HttpCode(200)
  followCreatorManager(
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
