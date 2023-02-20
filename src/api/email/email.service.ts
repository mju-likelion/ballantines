import { Injectable } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';

@Injectable()
export class EmailService {
  constructor(private readonly sendGrid: SendGridService) {}

  async sendVerifyCodeEmail(to: string, name: string, code: string) {
    this.sendHtmlToEmail(
      to,
      this.generateSubjectEmail(name),
      this.generateCodeEmail(code),
    );
  }

  private generateCodeEmail(code: string) {
    return `<h1>Hello<h1> 
    <h3>please click this link<h3>
    <h3>${code}<h3>`;
  }
  private generateSubjectEmail(name: string) {
    return `안녕하세요 ${name}님. 멋쟁이 사자처럼 명지대학교 입니다.`;
  }

  private async sendHtmlToEmail(to: string, subject: string, html: string) {
    const mail = {
      to,
      subject,
      from: process.env.SENDGRID_FROM_EMAIL,
      html,
    };
    await this.sendGrid.send(mail);
    return;
  }
}
