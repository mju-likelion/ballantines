import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import emailConfig from 'src/config/emailConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [emailConfig],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
