import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const SwaggerConfig = new DocumentBuilder()
  .setTitle('Video Creators Platform')
  .setDescription('NicaSource assestment')
  .setVersion('1.0')
  .build();

export { SwaggerConfig };
