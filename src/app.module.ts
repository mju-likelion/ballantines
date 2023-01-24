import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationsModule } from './api/applications/applications.module';
import { generateTypeOrmConfig } from './config/typeorm.config';
import { validationSchema } from './config/validationSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
    TypeOrmModule.forRoot(generateTypeOrmConfig(process.env)),
    ApplicationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
