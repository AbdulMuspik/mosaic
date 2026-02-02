# Tech Stack

## Core Technologies
- **Runtime**: Bun (package manager and runtime)
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **React**: v19.2.3
- **Backend**: Convex (real-time database and backend)
- **Authentication**: Clerk + Convex integration

## UI & Styling
- **CSS Framework**: Tailwind CSS v4
- **Component Library**: Radix UI primitives + shadcn/ui patterns
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Theme**: next-themes for dark/light mode

## Code Quality
- **Linter/Formatter**: Biome (replaces ESLint + Prettier)
- **Form Handling**: React Hook Form + Zod validation
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Common Commands

### Development
```bash
bun run dev          # Run both Next.js and Convex dev servers
bun run web          # Run Next.js dev server only
bun run convex       # Run Convex dev server only
```

### Build & Deploy
```bash
bun run build        # Build for production
bun run start        # Start production server
```

### Code Quality
```bash
bun run lint         # Check code with Biome
bun run format       # Format code with Biome
```

## Environment Variables
- `NEXT_PUBLIC_CONVEX_URL`: Convex deployment URL
- `CLERK_JWT_ISSUER_DOMAIN`: Clerk JWT issuer for auth

## Path Aliases
- `@/*` maps to `./src/*`
