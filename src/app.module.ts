import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApplicationsModule } from './api/applications/applications.module';
import { validationSchema } from './config/validationSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
    ApplicationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
