import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}


export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  constructor(){}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, html, attachments = [] } = options;

    try {
      const sendInformation = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html,
        attachments,
      })

      // console.log(sendInformation);
      // const log = new LogEntity({
      //   level: LogSeverityLevel.low,
      //   message: `Email enviado para ${to}`,
      //   origin: 'email-service.ts',
      // })



      return true
    } catch (error) {
      // const log = new LogEntity({
      //   level: LogSeverityLevel.low,
      //   message: `Email no enviado para ${to}`,
      //   origin: 'email-service.ts',
      // })


      return false
    }
  }

  async sendEmailWithAttachment(to: string | string[]) {
    const subject = 'Teste de envio de email com anexo';
    const html = `
    <h3>Log de Sistema - NOC</h3>
    <p>Teste de log de sistema</p>
    <p>Ver logs adjuntos</p>
    `;
    const attachments: Attachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
    ];

    return this.sendEmail({ to, subject, html, attachments });

  }
}
