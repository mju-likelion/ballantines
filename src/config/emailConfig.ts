import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
}));
