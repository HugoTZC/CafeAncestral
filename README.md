# Cafe Ancestral - Web Application

Modern, artisanal coffee shop web application built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🎨 Premium, rustic design with Olive/Sepia color palette
- 📱 Fully responsive (mobile, tablet, desktop)
- 🗄️ Dynamic menu with Supabase backend
- 🎯 Special offers system
- 📝 Blog/Events integration
- 🛒 Shopping cart with WhatsApp checkout
- 🔐 Admin dashboard (coming soon)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL from `schema.sql` in your Supabase SQL Editor
3. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```
4. Add your Supabase credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 4. Build for Production

```bash
npm run build
npm start
```

## Database Schema

The app uses the following tables:
- `categories` - Menu categories (drinks, food, etc.)
- `products` - Menu items with prices, ingredients, allergens
- `offers` - Special time-limited offers
- `blog_posts` - Blog posts and events

See `schema.sql` for the complete schema.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **State**: Zustand
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Project Structure

```
src/
├── app/              # Next.js pages
├── components/       # React components
│   ├── layout/      # Header, Footer
│   └── ui/          # Hero, Cards, etc.
├── lib/             # Utilities and database functions
├── store/           # Zustand stores
└── types/           # TypeScript types
```

## License

Private project for Cafe Ancestral.
