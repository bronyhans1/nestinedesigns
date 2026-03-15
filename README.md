# Nestine Designs Website

Official website for Nestine Designs Fashion Training Institute.

This platform allows applicants to:
- Apply for fashion training programs
- Pay for application forms online
- Download admission forms as PDF
- Contact the institute
- Manage applications through an admin dashboard

## Technology Stack

- Next.js (App Router)
- TypeScript
- MongoDB (Mongoose)
- Paystack (payments)
- Resend (email delivery)
- Vercel (hosting)

## Environment Variables

Create a `.env.local` file and add the following:

MONGODB_URI=
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_SECRET=

PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=

RESEND_API_KEY=

## Deployment

This project is deployed on **Vercel**.

Steps:
1. Push code to GitHub
2. Import repository into Vercel
3. Add environment variables
4. Deploy

## Admin Dashboard

Admin panel available at:

/admin

Login credentials are set through environment variables.

## Author

Website developed by Brony Hans.