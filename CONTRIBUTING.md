# 🤝 Contributing to Next.js SaaS Starter

We love your input! We want to make contributing to the Next.js SaaS Starter as easy and transparent as possible, whether it's:

- Reporting bugs
- Discussing the current state of the code
- Submitting fixes
- Proposing new features
- Becoming a maintainer

## 📋 Table of Contents

- [Development Process](#development-process)
- [Getting Started](#getting-started)
- [Code Style Guidelines](#code-style-guidelines)
- [Submitting Changes](#submitting-changes)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)
- [Security Issues](#security-issues)

## 🔄 Development Process

We use GitHub to host code, track issues and feature requests, and accept pull requests.

### Pull Request Process

1. **Fork** the repo and create your branch from `main`
2. **Install** dependencies: `pnpm install`
3. **Set up** your development environment (see below)
4. **Make** your changes
5. **Test** your changes thoroughly
6. **Update** documentation if needed
7. **Submit** a pull request

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **pnpm**
- **PostgreSQL** (local or Docker)
- **Stripe** account (for payment testing)
- **Git** for version control

### Setup Development Environment

1. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/saas-starter.git
   cd saas-starter
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment**:
   ```bash
   cp .env.example .env
   # Fill in your environment variables
   ```

4. **Set up database**:
   ```bash
   # Start PostgreSQL (Docker)
   docker compose up -d
   
   # Run migrations and seed
   pnpm db:migrate
   pnpm db:seed
   ```

5. **Start development server**:
   ```bash
   pnpm dev
   ```

### Development Workflow

```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make your changes...

# Test your changes
pnpm build  # Check for TypeScript errors
pnpm dev    # Test in development

# Commit with clear message
git commit -m "feat: add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Create pull request on GitHub
```

## 📝 Code Style Guidelines

### TypeScript

- **Use TypeScript**: All new code should be written in TypeScript
- **Strict Types**: Enable strict mode and avoid `any` types
- **Interfaces**: Use interfaces for object types
- **Enums**: Use enums for constants when appropriate

```typescript
// ✅ Good
interface User {
  id: number;
  email: string;
  name?: string;
}

// ❌ Avoid
const user: any = { id: 1, email: "test@test.com" };
```

### React Components

- **Functional Components**: Use function components with hooks
- **TypeScript Props**: Always type your props
- **Default Exports**: Use default exports for page components
- **Named Exports**: Use named exports for utility components

```typescript
// ✅ Good - Page Component
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function DashboardPage({ searchParams }: PageProps) {
  return <div>Dashboard</div>;
}

// ✅ Good - Utility Component
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

### Database & Server Actions

- **Server Actions**: Use server actions for mutations
- **Validation**: Always validate inputs with Zod
- **Error Handling**: Handle errors gracefully
- **Types**: Use Drizzle's inferred types

```typescript
// ✅ Good
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100)
});

export const createUser = validatedAction(
  createUserSchema,
  async (data) => {
    try {
      const user = await db.insert(users).values(data).returning();
      return { success: "User created successfully" };
    } catch (error) {
      return { error: "Failed to create user" };
    }
  }
);
```

### File Naming

- **Pages**: `page.tsx`, `layout.tsx`, `loading.tsx`
- **Components**: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `formatDate.ts`)
- **Constants**: `SCREAMING_SNAKE_CASE.ts`

### Import Organization

```typescript
// 1. React and Next.js imports
import { useState } from 'react';
import { redirect } from 'next/navigation';

// 2. Third-party imports
import { z } from 'zod';

// 3. Internal imports (absolute paths)
import { db } from '@/lib/db/drizzle';
import { Button } from '@/components/ui/button';

// 4. Relative imports
import './styles.css';
```

## 📤 Submitting Changes

### Pull Request Guidelines

1. **Clear Title**: Use a descriptive title
2. **Description**: Explain what changes were made and why
3. **Screenshots**: Include screenshots for UI changes
4. **Testing**: Describe how you tested your changes
5. **Breaking Changes**: Highlight any breaking changes

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Local testing completed
- [ ] Database migrations work
- [ ] Stripe integration tested (if applicable)

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat: add new feature`
- `fix: resolve bug in authentication`
- `docs: update README with setup instructions`
- `style: fix formatting in components`
- `refactor: improve database query performance`
- `test: add tests for user creation`

## 🐛 Bug Reports

Use GitHub Issues to report bugs. Include:

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Node.js version: [e.g. 18.17.0]
- Package manager: [e.g. pnpm 8.6.0]

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

We welcome feature requests! Use GitHub Issues with the "enhancement" label.

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives considered**
Other solutions you've considered.

**Additional context**
Screenshots, mockups, or examples.
```

## 🔒 Security Issues

Please **DO NOT** report security vulnerabilities in public issues.

Instead, email us at: [security@example.com](mailto:security@example.com)

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## 🧪 Testing Guidelines

### Manual Testing

Before submitting a PR, test:

1. **Authentication Flow**:
   - Sign up new user
   - Sign in existing user
   - Password validation
   - Session persistence

2. **Dashboard Features**:
   - User profile updates
   - Security settings
   - Activity logs

3. **Payment Flow** (if applicable):
   - Stripe checkout
   - Subscription management
   - Webhook handling

4. **Responsive Design**:
   - Mobile devices
   - Tablet view
   - Desktop view

### Database Testing

- Test migrations on fresh database
- Verify seed data loads correctly
- Check foreign key constraints
- Test data integrity

## 📚 Documentation

### What to Document

- **API Changes**: Update API documentation
- **New Features**: Add to README features section
- **Configuration**: Update environment variables
- **Breaking Changes**: Clear migration guide

### Documentation Style

- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Update table of contents

## 🏆 Recognition

Contributors are recognized in:

- GitHub contributors list
- Release notes for significant contributions
- Special mentions for major features

## 📞 Getting Help

- **GitHub Discussions**: For questions and discussions
- **GitHub Issues**: For bugs and feature requests
- **Discord**: [Join our community](https://discord.gg/nextjs) (if available)

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes**:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable behavior includes**:
- Trolling, insulting comments, and personal attacks
- Public or private harassment
- Publishing private information without permission
- Other conduct inappropriate in a professional setting

---

Thank you for contributing to make this project better! 🙏 