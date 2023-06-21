import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API WS- HUNTY JOSE ZARATE')
    .setDescription('Proyecto desarrollado para aplicar a vacante')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  console.log(`APLICACIÓN CORRIENDO POR EL PUERTO: ${await app.getUrl()}`);
  console.log(`SWAGGER: ${await app.getUrl()}/api`);
}
bootstrap();