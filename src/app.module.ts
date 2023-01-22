import { Module } from '@nestjs/common';
import { ApplicationsModule } from './api/applications/applications.module';

@Module({
  imports: [ApplicationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
