# Task Management Application

A modern task management application built with Next.js, featuring a clean UI and robust database integration.

## Features

- ✅ Create, read, update, and delete tasks
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🗄️ Database integration with Knex.js
- 🚀 Built with Next.js 13+ App Router

## Tech Stack

- **Frontend**: Next.js 15.4, React 19.1, TypeScript 5.8
- **Styling**: Tailwind CSS 4.1
- **Database**: Knex.js 3.1 with SQLite3 and PostgreSQL support
- **UI Components**: Radix UI primitives + custom components
- **Icons**: Lucide React
- **Build Tool**: Turbopack (Next.js)
- **Package Manager**: PNPM

## Project Structure

```
task/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/tasks/         # Task-related API endpoints
│   └── tasks/             # Task pages
├── components/            # Reusable React components
│   └── ui/               # UI component library
├── lib/                  # Utility libraries and configurations
│   └── db/               # Database related files
│       ├── migrations/   # Database migration files
│       ├── models/       # Data models
│       └── seeds/        # Database seed files
└── scripts/              # Utility scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM (recommended) or npm
- Database (PostgreSQL)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up your database configuration in `knexfile.ts`

4. Run database migrations:
   ```bash
   pnpm run db:migrate
   ```

5. (Optional) Seed the database with sample data:
   ```bash
   pnpm run db:seed
   ```

6. Start the development server:
   ```bash
   pnpm dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with sample data
- `pnpm db:test-knex` - Test database connection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
