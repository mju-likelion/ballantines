import { SendGridModule } from '@anchan828/nest-sendgrid';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationsModule } from './api/applications/applications.module';
import { EmailModule } from './api/email/email.module';
import { UserModule } from './api/managements/managements.module';
import { generateTypeOrmConfig } from './config/typeorm.config';
import { validationSchema } from './config/validationSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
    TypeOrmModule.forRoot(generateTypeOrmConfig(process.env)),
    ApplicationsModule,
    UserModule,
    EmailModule,
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
