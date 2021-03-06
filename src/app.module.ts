import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { VideoModule } from './modules/video/video.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigService } from './config/database.config.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfigService.getTypeOrmConfig()),
    AuthModule,
    UserModule,
    VideoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
