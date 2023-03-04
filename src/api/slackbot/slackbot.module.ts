import { Module } from '@nestjs/common';
import { SlackbotService } from './slackbot.service';

@Module({
  providers: [SlackbotService],
  exports: [SlackbotService],
})
export class SlackbotModule {}
