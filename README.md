[![中文说明](https://img.shields.io/badge/文档-中文-blue?style=flat-square)](./README.zh-CN.md)

# Hello City Client

A modern frontend project powered by Next.js 14, React 18, TypeScript, Tailwind CSS and Jest.

## Requirements

- Node.js: **>=18.x** (LTS recommended)
- Package manager: npm (v9+ recommended), or yarn/pnpm/bun

## Getting Started

1. **Clone the project and enter the directory:**

   ```bash
   git clone <repo-url/ssh>
   cd HelloCityUserPortal
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or yarn dev / pnpm dev / bun dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000) **in your browser.**

## Unit Tests

Unit tests must be passed before creating a pull request.

Run the tests from your terminal with the following scripts (All commands are already defined in package.json):

```bash
# run all tests once
npm run test

# watch mode (reruns on file changes)
npm run test:watch // will run unit test

# generate a coverage report
npm run test:coverage
```

By default, Jest looks for tests in either of these places:

- Any file inside a `__tests__` directory (recursive search)
- Any file whose name matches one of the patterns:
  `*.test.ts`, `*.test.tsx`, `*.spec.ts`,` *.spec.tsx`

5. **Run Storybook**
## Command
Storybook is an application that allows developers to create samples of frontend elements

The interactive components allows developers to see different variations of elements efficiently
By default, Storybook renders for .stories.tsx files in:

- `stories` directory (recursive search)

Add new packages to Storybook is done in `main.ts` under `.storybook` directory
```bash
npm run storybook
```
## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MUI](https://mui.com/)
- [Jest](https://jestjs.io/)
- [Storybook](https://storybook.js.org/)

## Project Structure

- `src/app/`: Main app directory (pages, global styles, layouts, etc.)
- `src/app/globals.css`: Global styles with Tailwind config
- `src/app/layout.tsx`: Global layout and metadata
- `src/app/page.tsx`: Home page entry
- `tailwind.config.ts`, `postcss.config.mjs`: Styling configuration
- `theme.ts`: MUI Styling configuration
- `jest.config.ts`,`jest.setup.ts`: Jest (Unit Tests) config

## Notes

- To customize fonts, favicon, or SEO, edit files in `src/app/fonts/`, `src/app/layout.tsx`, and `src/app/favicon.ico`.
- TypeScript config: see `tsconfig.json`.
