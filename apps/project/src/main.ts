import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@app/common/pipes/validation.pipe'


async function start() {
  
  const app = await NestFactory.create(AppModule)

  const PORT = process.env.PORT || 5000;

  console.log("Port ",PORT)

  const config = new DocumentBuilder()
    .setTitle('Todo aplication backend')
    .setDescription('Documentation of Todo application Backend')
    .setVersion('1.0.0')
    .addTag('Todo')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your Bearer token',
    })
    .addSecurityRequirements('bearer')    
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  app.useGlobalPipes(new ValidationPipe())

  await app.startAllMicroservices();

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))

}

start();