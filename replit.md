# Hacker's Blog - Security Research Platform

## Overview

This is a futuristic, hacker-themed blog website built as a full-stack application targeting security researchers and reverse engineers. The platform features a dark terminal aesthetic with advanced animations, complete blog management capabilities, and secure authentication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom terminal-themed design system
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Shadcn/UI component library with custom hacker-themed modifications
- **Build Tool**: Vite with custom configuration for client-side bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript throughout
- **Authentication**: Replit Auth with OpenID Connect integration
- **Session Management**: PostgreSQL-backed session storage
- **API Design**: RESTful endpoints with proper error handling

### Database Architecture
- **Primary Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM with type-safe queries
- **Schema Management**: Drizzle Kit for migrations and schema updates
- **Connection**: Connection pooling with @neondatabase/serverless

## Key Components

### Authentication System
- **Provider**: Replit Auth (OpenID Connect)
- **Session Storage**: PostgreSQL sessions table with connect-pg-simple
- **Security**: HTTP-only cookies with secure flag
- **User Management**: Automatic user creation/update on login

### Blog Management
- **Content**: Markdown support with custom rendering
- **CRUD Operations**: Full create, read, update, delete for posts
- **Publishing**: Draft/published state management
- **Organization**: Tag-based categorization and date-based archiving
- **SEO**: Slug-based URLs and meta tag optimization

### UI/UX Design
- **Theme**: Deep indigo/blue hacker aesthetic with no light mode
- **Typography**: Inter font family for readability
- **Animations**: Typewriter effects, glowing elements, matrix background
- **Responsive**: Mobile-first design with proper breakpoints
- **Accessibility**: Semantic HTML and ARIA labels

### Content Management
- **Editor**: Rich text editing with live preview
- **Media**: Image upload support with featured images
- **Metadata**: Title, excerpt, tags, and publication status
- **Search**: Full-text search across posts

## Data Flow

### Authentication Flow
1. User clicks login → redirects to /api/login
2. Replit Auth handles OAuth flow
3. User info stored in PostgreSQL users table
4. Session created and stored in sessions table
5. User redirected to authenticated app

### Blog Post Flow
1. Admin creates/edits posts via /admin interface
2. Posts stored in PostgreSQL posts table
3. Published posts visible on public blog pages
4. Posts rendered with custom markdown parser
5. SEO-optimized URLs using slugs

### Data Validation
- **Backend**: Zod schemas for request/response validation
- **Frontend**: React Hook Form with Zod resolvers
- **Database**: Drizzle schema with proper constraints

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **passport**: Authentication middleware
- **express-session**: Session management

### UI Dependencies
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **wouter**: Lightweight routing

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking
- **@replit/vite-plugin-***: Replit-specific tooling

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Neon PostgreSQL with development database
- **Authentication**: Replit Auth with development credentials
- **Asset Serving**: Vite handles static asset serving

### Production Build
- **Frontend**: Vite builds React app to dist/public
- **Backend**: esbuild bundles Express server to dist/
- **Database**: Production Neon PostgreSQL instance
- **Sessions**: PostgreSQL-backed session storage
- **Static Assets**: Served by Express in production

### Configuration Management
- **Environment Variables**: DATABASE_URL, SESSION_SECRET, REPLIT_DOMAINS
- **Build Scripts**: Separate dev, build, and production scripts
- **Asset Handling**: Proper asset resolution with @assets alias

### Security Considerations
- **Authentication**: Secure OAuth flow with Replit
- **Sessions**: HTTP-only cookies with secure flag
- **Database**: Parameterized queries via Drizzle ORM
- **CORS**: Proper configuration for Replit environment
- **Environment**: Sensitive data in environment variables

The application follows a clean separation of concerns with shared utilities in the `/shared` directory, making it easy to maintain and extend while providing a robust platform for security research content.