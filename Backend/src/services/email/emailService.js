import nodemailerProvider from './providers/nodemailerProvider.js';
import renderOrderStatusEmail from './templates/orderStatusTemplate.js';

class EmailService {
  constructor(provider) {
    this.provider = provider;
  }

  async sendMail({ to, subject, html, text, from }) {
    if (!to) throw new Error('Recipient `to` is required');
    return this.provider.send({ to, subject, html, text, from });
  }

  async sendOrderStatusEmail(order, subjectOverride) {
    if (!order) throw new Error('Order object is required');
    const html = renderOrderStatusEmail(order);
    const subject = subjectOverride || `Order ${order.orderId} - ${order.status}`;
    const to = String(order.customerEmail || '').trim().toLowerCase();
    const from = process.env.EMAIL_FROM || `no-reply@${process.env.APP_DOMAIN || 'example.com'}`;
    return this.sendMail({ to, subject, html, from });
  }
}

const emailService = new EmailService(nodemailerProvider);
export default emailService;
