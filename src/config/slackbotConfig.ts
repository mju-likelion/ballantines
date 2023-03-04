import { registerAs } from '@nestjs/config';

export default registerAs('slackbot', () => ({
  sbUser: process.env.SLACK_USER_TK,
  sbBot: process.env.SLACK_BOT_TK,
}));
