import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendGridModule } from '@anchan828/nest-sendgrid';

import { ApplicationsModule } from './api/applications/applications.module';
import { AssetsModule } from './api/assets/assets.module';
import { generateTypeOrmConfig } from './config/typeorm.config';
import { validationSchema } from './config/validationSchema';
import { ManagerModule } from './api/managements/managements.module';
import { EmailModule } from './api/email/email.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
    TypeOrmModule.forRoot(generateTypeOrmConfig(process.env)),
    ApplicationsModule,
    AssetsModule,
    ManagerModule,
    EmailModule,
    AuthModule,
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
