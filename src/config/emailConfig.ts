import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
}));
