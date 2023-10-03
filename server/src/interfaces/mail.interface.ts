export interface IEmailOptions {
  email: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}
