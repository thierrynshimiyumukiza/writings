# Hacker's Blog - Futuristic Security Research Platform

A production-ready, futuristic hacker-themed blog website with terminal aesthetics, built for security researchers and reverse engineers.

## 🚀 Features

- **Dark Terminal Theme**: Deep indigo/blue color scheme with matrix effects and scanlines
- **Advanced Animations**: Typewriter effects, glowing elements, and smooth transitions
- **Complete Blog System**: Full CRUD operations with markdown support
- **Admin Panel**: Secure content management with real-time preview
- **Authentication**: Replit Auth integration for secure access
- **Responsive Design**: Works perfectly on all devices
- **SEO Optimized**: Complete meta tags and social media integration
- **Syntax Highlighting**: Code blocks with copy functionality
- **Archive System**: Posts organized by date and tags

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS with custom animations
- Wouter for routing
- TanStack Query for state management
- Shadcn/UI components

### Backend
- Express.js with TypeScript
- Replit Auth for authentication
- PostgreSQL with Drizzle ORM
- RESTful API design

### Features
- Markdown rendering
- Real-time preview
- Image upload support
- Tag-based organization
- Search functionality

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Replit account (for authentication)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   DATABASE_URL=your_postgres_connection_string
   SESSION_SECRET=your_session_secret
   REPL_ID=your_replit_app_id
   REPLIT_DOMAINS=your_domain.com
   ```

4. Push database schema:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   