import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { WebClient } from '@slack/web-api';
import slackbotConfig from 'src/config/slackbotConfig';

@Injectable()
export class SlackbotService {
  constructor(
    @Inject(slackbotConfig.KEY)
    readonly config: ConfigType<typeof slackbotConfig>,
  ) {}
  async sendSlackApplicationNotific(name: string, part: string) {
    const client = new WebClient(this.config.sbBot);

    await client.chat.postMessage({
      channel: '#application-notifications',
      text: `${name}님께서 ${part}파트에 지원하셨습니다!`,
    });
    return;
  }
}
