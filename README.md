[![中文说明](https://img.shields.io/badge/文档-中文-blue?style=flat-square)](./README.zh-CN.md)

# Hello City Client

A modern frontend project powered by Next.js 14, React 18, TypeScript, and Tailwind CSS.

## Requirements

- Node.js: **>=18.x** (LTS recommended)
- Package manager: npm (v9+ recommended), or yarn/pnpm/bun

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   # or yarn dev / pnpm dev / bun dev
   ```

3. **Open** [http://localhost:3000](http://localhost:3000) **in your browser.**

## Build & Run for Production

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Start the production server:**

   ```bash
   npm start
   ```

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Project Structure

- `src/app/`: Main app directory (pages, global styles, layouts, etc.)
- `src/app/globals.css`: Global styles with Tailwind config
- `src/app/layout.tsx`: Global layout and metadata
- `src/app/page.tsx`: Home page entry
- `tailwind.config.ts`, `postcss.config.mjs`: Styling configuration

## Notes

- To customize fonts, favicon, or SEO, edit files in `src/app/fonts/`, `src/app/layout.tsx`, and `src/app/favicon.ico`.
- TypeScript config: see `tsconfig.json`.
