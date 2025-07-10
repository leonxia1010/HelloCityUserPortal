[![English Version](https://img.shields.io/badge/Docs-English-green?style=flat-square)](./README.md)

# Hello City Client

一个基于 Next.js 14、React 18、TypeScript 和 Tailwind CSS 的现代前端项目。

## 环境要求

- Node.js 版本：**>=18.x**（建议使用 LTS 版本）
- 包管理工具：npm（推荐 9.x 及以上），也可用 yarn、pnpm、bun

## 快速开始

1. **安装依赖：**

   ```bash
   npm install
   # 或者
   yarn install
   # 或者
   pnpm install
   # 或者
   bun install
   ```

2. **本地开发启动：**

   ```bash
   npm run dev
   # 或 yarn dev / pnpm dev / bun dev
   ```

3. **在浏览器中访问** [http://localhost:3000](http://localhost:3000)。

## 构建与生产环境运行

1. **构建项目：**

   ```bash
   npm run build
   ```

2. **启动生产环境服务：**

   ```bash
   npm start
   ```

## 主要技术栈

- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 目录结构简述

- `src/app/`：应用主目录（页面、全局样式、布局等）
- `src/app/globals.css`：全局样式，含 Tailwind 配置
- `src/app/layout.tsx`：全局布局与元数据
- `src/app/page.tsx`：首页入口
- `tailwind.config.ts`、`postcss.config.mjs`：样式相关配置

## 其他说明

- 如需自定义字体、favicon、SEO 信息等，请在 `src/app/fonts/`、`src/app/layout.tsx`、`src/app/favicon.ico` 等文件中修改。
- TypeScript 配置见 `tsconfig.json`。
