# Email configuration and setup

Required environment variables (see `.env.example`):

- `SMTP_HOST` — SMTP server host (e.g. `smtp.gmail.com`).
- `SMTP_PORT` — SMTP port (587 for TLS, 465 for SSL).
- `SMTP_SECURE` — `true` if using SSL (port 465), otherwise `false`.
- `SMTP_USER` — SMTP username (optional for unauthenticated servers).
- `SMTP_PASS` — SMTP password.
- `EMAIL_FROM` — Optional `From` address (defaults to `no-reply@<APP_DOMAIN>`).
- `APP_DOMAIN` — App domain used to build default `From` address.

Install dependencies and run:

```bash
cd Backend
npm install

# start in dev
npm run dev
```

Notes:
- The implementation uses `nodemailer` with a provider adapter `src/services/email/providers/nodemailerProvider.js`.
- To switch to a transactional email API (Brevo/Resend), implement a new provider under `src/services/email/providers/` that exposes the same `send({to,subject,html,text,from})` API and update `emailService` to use it.
- Emails are sent on payment verification and on order status changes. Failures are logged but do not block the API response.
