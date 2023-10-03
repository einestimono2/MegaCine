import nodeMailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';

import { type IEmailOptions } from '../interfaces';

export const SendMail = async (options: IEmailOptions) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: parseInt(process.env.SMPT_PORT ?? '587'),
    service: process.env.SMPT_SERVICE,
    secure: true,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD
    }
  });

  const { email, subject, template, data } = options;

  // Template path
  const templatePath = path.join(__dirname, '../views', template);

  // Render template
  const html: string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: email,
    subject,
    html
  };

  await transporter.sendMail(mailOptions);
};
