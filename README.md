# 🚀 Next.js SaaS Starter

A comprehensive, production-ready starter template for building modern SaaS applications with **Next.js 15**, featuring authentication, payments, team management, and a beautiful dashboard.

**🔗 Live Demo**: [https://next-saas-start.vercel.app/](https://next-saas-start.vercel.app/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nextjs/saas-starter)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Development](#-development)
- [Authentication](#-authentication)
- [Payments (Stripe)](#-payments-stripe)
- [Deployment](#-deployment)
- [API Reference](#-api-reference)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## ✨ Features

### 🔐 Authentication & Authorization
- Email/password authentication with secure JWT tokens
- Role-based access control (Owner, Member roles)
- Protected routes with middleware
- Session management with secure HTTP-only cookies
- Password reset functionality (coming soon)

### 💳 Payment Integration
- Stripe Checkout integration
- Subscription management
- Customer portal for billing
- Webhook handling for subscription events
- Trial periods and proration support

### 👥 Team Management
- Multi-tenant team structure
- Team member invitations
- Role-based permissions
- Team switching (coming soon)

### 📊 Dashboard Features
- Beautiful, responsive dashboard
- User account management
- Security settings
- Activity logging and monitoring
- Real-time data with SWR

### 🎨 UI/UX
- Modern design with Tailwind CSS
- shadcn/ui component library
- Responsive layout
- Dark mode support
- Animated landing page elements

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) |
| **Payments** | [Stripe](https://stripe.com/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) |
| **Authentication** | JWT with [jose](https://github.com/panva/jose) |
| **State Management** | [SWR](https://swr.vercel.app/) |
| **Deployment** | [Vercel](https://vercel.com/) |

## 📁 Project Structure

```
├── app/                          # Next.js 15 App Router
│   ├── (dashboard)/             # Dashboard route group
│   │   ├── dashboard/           # Protected dashboard pages
│   │   │   ├── general/         # Account settings
│   │   │   ├── security/        # Security settings
│   │   │   └── activity/        # Activity logs
│   │   ├── pricing/             # Pricing/subscription page
│   │   └── layout.tsx           # Dashboard layout
│   ├── (login)/                 # Authentication route group
│   │   ├── sign-in/             # Login page
│   │   ├── sign-up/             # Registration page
│   │   ├── actions.ts           # Auth server actions
│   │   └── login.tsx            # Shared login component
│   ├── api/                     # API routes
│   │   ├── stripe/webhook/      # Stripe webhook handlers
│   │   ├── user/                # User API endpoints
│   │   └── team/                # Team API endpoints
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
├── lib/                         # Utility libraries
│   ├── auth/                    # Authentication utilities
│   │   ├── session.ts           # JWT session management
│   │   └── middleware.ts        # Auth middleware helpers
│   ├── db/                      # Database configuration
│   │   ├── schema.ts            # Drizzle schema definitions
│   │   ├── queries.ts           # Database queries
│   │   ├── migrations/          # Database migrations
│   │   ├── drizzle.ts           # Database connection
│   │   ├── setup.ts             # Database setup script
│   │   └── seed.ts              # Database seeding
│   ├── payments/                # Stripe integration
│   │   └── stripe.ts            # Stripe utilities
│   └── utils.ts                 # General utilities
├── components/                  # Reusable components
│   └── ui/                      # shadcn/ui components
├── middleware.ts                # Next.js middleware
├── drizzle.config.ts           # Drizzle ORM configuration
└── package.json                 # Dependencies
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **pnpm**
- **PostgreSQL** database (local or cloud)
- **Stripe** account for payments
- **Git** for version control

### 1. Clone and Install

```bash
git clone https://github.com/nextjs/saas-starter.git
cd saas-starter
pnpm install
```

### 2. Environment Setup

Run the interactive setup script:

```bash
pnpm db:setup
```

This will guide you through:
- Creating your `.env` file
- Setting up Stripe products
- Configuring your database

**Or manually create `.env**:**

```bash
cp .env.example .env
```

### 3. Database Setup

```bash
# Run migrations
pnpm db:migrate

# Seed with sample data
pnpm db:seed
```

### 4. Start Development

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) and sign in with:
- **Email**: `test@test.com`
- **Password**: `admin123`

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```bash
# Database
POSTGRES_URL="postgresql://user:password@localhost:5432/saas_starter"

# Authentication (generate with: openssl rand -base64 32)
AUTH_SECRET="your-secret-key-here"

# App Configuration
BASE_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Optional: Logging
LOG_LEVEL="info"
```

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `POSTGRES_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `AUTH_SECRET` | JWT signing secret (32+ chars) | Generated with `openssl rand -base64 32` |
| `BASE_URL` | Your app's base URL | `http://localhost:3000` (dev) |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook endpoint secret | `whsec_...` |

## 🗄 Database Setup

### Local PostgreSQL with Docker

The easiest way to get started:

```bash
# Start PostgreSQL container
docker compose up -d

# This creates a PostgreSQL instance at:
# Host: localhost
# Port: 54322
# Database: postgres
# Username: postgres
# Password: postgres
```

Your `POSTGRES_URL` should be:
```
POSTGRES_URL="postgresql://postgres:postgres@localhost:54322/postgres"
```

### Cloud Database Options

- **Neon**: Serverless PostgreSQL (Recommended)
- **Supabase**: Full backend platform
- **Railway**: Simple database hosting
- **Vercel Postgres**: Integrated with Vercel

### Schema Overview

The database includes these main tables:

- **users**: User accounts and authentication
- **teams**: Team/organization data
- **team_members**: User-team relationships
- **invitations**: Team member invitations
- **activity_logs**: User activity tracking

## 👨‍💻 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:setup         # Interactive database setup
pnpm db:generate      # Generate migrations from schema changes
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Seed database with sample data
pnpm db:studio        # Open Drizzle Studio (database GUI)

# Stripe
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Database Migrations

When you modify the schema in `lib/db/schema.ts`:

```bash
# Generate new migration
pnpm db:generate

# Apply migrations
pnpm db:migrate
```

### Adding New Features

1. **Database Changes**: Update `lib/db/schema.ts`
2. **API Routes**: Add to `app/api/`
3. **Server Actions**: Add to appropriate `actions.ts` files
4. **UI Components**: Add to `components/` or page-specific components
5. **Database Queries**: Add to `lib/db/queries.ts`

## 🔐 Authentication

### How Authentication Works

1. **JWT Tokens**: Secure tokens signed with `AUTH_SECRET`
2. **HTTP-Only Cookies**: Tokens stored securely in cookies
3. **Middleware Protection**: Routes protected at the edge
4. **Session Refresh**: Automatic token renewal on requests

### Protected Routes

- All `/dashboard/*` routes require authentication
- Unauthenticated users are redirected to `/sign-in`
- Session tokens auto-refresh on each request

### Adding Authentication to New Pages

```typescript
// For pages requiring authentication
import { getUser } from '@/lib/db/queries';

export default async function ProtectedPage() {
  const user = await getUser();
  if (!user) redirect('/sign-in');
  
  // Your page content
}
```

### Server Actions with Authentication

```typescript
import { validatedActionWithUser } from '@/lib/auth/middleware';

export const myAction = validatedActionWithUser(
  schema,
  async (data, formData, user) => {
    // Action implementation with authenticated user
  }
);
```

## 💳 Payments (Stripe)

### Stripe Setup

1. **Create Stripe Account**: [https://stripe.com](https://stripe.com)
2. **Get API Keys**: Dashboard → Developers → API keys
3. **Install Stripe CLI**: [https://docs.stripe.com/stripe-cli](https://docs.stripe.com/stripe-cli)
4. **Login to Stripe CLI**: `stripe login`

### Testing Payments

Use these test card numbers:

| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Visa (succeeds) |
| `4000 0000 0000 0002` | Card declined |
| `4000 0025 0000 3155` | Requires authentication |

- **Expiration**: Any future date
- **CVC**: Any 3-digit number
- **ZIP**: Any 5-digit number

### Webhook Testing (Local Development)

```bash
# In a separate terminal
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret to your .env
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Subscription Plans

The seed script creates two default plans:

- **Base Plan**: $8/month, 7-day trial
- **Plus Plan**: $12/month, 7-day trial

Modify plans in `lib/db/seed.ts` or create them in Stripe Dashboard.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

3. **Environment Variables**:
   Set all variables from your `.env` file in Vercel dashboard

4. **Database**:
   - Use Vercel Postgres or external provider
   - Update `POSTGRES_URL` to production database

5. **Stripe Webhook**:
   - Create production webhook in Stripe Dashboard
   - Point to: `https://yourdomain.com/api/stripe/webhook`
   - Update `STRIPE_WEBHOOK_SECRET`

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed to:
- **Netlify**: With Next.js runtime
- **Railway**: Full-stack deployment
- **DigitalOcean**: App Platform
- **AWS**: Amplify or custom setup

### Production Checklist

- [ ] Set strong `AUTH_SECRET` (32+ random characters)
- [ ] Configure production database
- [ ] Set up Stripe production webhook
- [ ] Update `BASE_URL` to your domain
- [ ] Configure proper CORS settings
- [ ] Set up monitoring and logging
- [ ] Review and update rate limiting
- [ ] Test payment flows thoroughly

## 📚 API Reference

### Authentication Endpoints

```typescript
// Get current user
GET /api/user
Response: User | null

// Get user's team
GET /api/team  
Response: Team | null
```

### Stripe Webhooks

```typescript
// Handle subscription changes
POST /api/stripe/webhook
Headers: stripe-signature
Body: Stripe event payload
```

### Server Actions

Key server actions for common operations:

- `signIn(data)` - User authentication
- `signUp(data)` - User registration
- `updateAccount(data)` - Update user profile
- `updatePassword(data)` - Change password
- `deleteAccount(data)` - Delete user account
- `checkoutAction(data)` - Create Stripe checkout

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
Error: POSTGRES_URL environment variable is not set
```
**Solution**: Ensure `.env` file exists with correct `POSTGRES_URL`

**Stripe Webhook Verification Failed**
```bash
Webhook signature verification failed
```
**Solutions**:
- Check `STRIPE_WEBHOOK_SECRET` is correct
- Ensure webhook endpoint is accessible
- Verify Stripe CLI is running for local development

**Session/Auth Issues**
```bash
User is not authenticated
```
**Solutions**:
- Clear browser cookies
- Check `AUTH_SECRET` is set and consistent
- Verify JWT token hasn't expired

**Build Errors**
```bash
Type errors in TypeScript
```
**Solutions**:
- Run `pnpm build` to check all TypeScript errors
- Ensure all environment variables are typed
- Check for missing imports

### Getting Help

1. **Check Issues**: [GitHub Issues](https://github.com/nextjs/saas-starter/issues)
2. **Discussions**: [GitHub Discussions](https://github.com/nextjs/saas-starter/discussions)
3. **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
4. **Stripe Docs**: [docs.stripe.com](https://docs.stripe.com)

### Debug Mode

Enable detailed logging:

```bash
# In .env
LOG_LEVEL="debug"

# Or run with debug
DEBUG=* pnpm dev
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `pnpm install`
4. Create a feature branch: `git checkout -b feature/amazing-feature`
5. Make your changes
6. Test thoroughly
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Stripe API Documentation](https://docs.stripe.com/api)
- [shadcn/ui Documentation](https://ui.shadcn.com)

### Similar Projects
- [Achromatic](https://achromatic.dev) - Full-featured SaaS starter
- [ShipFast](https://shipfa.st) - Next.js boilerplate
- [MakerKit](https://makerkit.dev) - SaaS starter kit
- [ZeroToShipped](https://zerotoshipped.com) - Complete SaaS template

---

**Made with ❤️ by the Next.js team**

*This template is designed to be a learning resource and starting point for your SaaS application. Feel free to customize it to match your specific needs!*#   t a s k  
 