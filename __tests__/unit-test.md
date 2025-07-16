# 🧪 Frontend Unit Testing Guide (Next.js App Router + Jest)

This guide walks you through setting up unit testing in a **Next.js App Router** project using **Jest** and **React Testing Library**.  
It includes installation, configuration, test syntax, and links to official documentation.



## 1. Installation

Install the required packages:

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
# or
yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
# or
pnpm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
```

## 2. Initialize

```bash
npm init jest@latest
# or
yarn create jest@latest
# or
pnpm create jest@latest
```

Generate a basic Jest configuration file by running the following command:

## 3. Jest Configuration

Create a config file `jest.config.ts` in the root directory:

```ts
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
```

## 3. Handling Absolute Imports and Module Path Aliases

If your project is using Module Path Aliases, you will need to configure Jest to resolve the imports by matching the paths option in the `tsconfig.json` file with the moduleNameMapper option in the `jest.config.js` file. For example:

`tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

`jest.config.ts`

```ts
moduleNameMapper: {
  // ...
  '^@/(.*)$': '<rootDir>/src/$1',
}

```

## 4. Extend Jest with custom matchers

@testing-library/jest-dom includes a set of convenient custom matchers such as .toBeInTheDocument() making it easier to write tests. You can import the custom matchers for every test by adding the following option to the Jest configuration file:

`jest.config.ts`

```ts
setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'];
```

`jest.setup.ts`

```ts
import '@testing-library/jest-dom';
```

## 5. Add test script in package.json

Add these to your `package.json`:

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

jest --watch will re-run tests when a file is changed.

jest --coverage will run coverage test.

## 6. Create your first test

Your project is now ready to run tests. Create a folder called `__tests__` in your project's root directory.

(***Test file can be put in the same directory where the component is, or in `__tests__` directory because  Jest will detect both patterns by default, as long as filenames follow:
	•	*.test.js/ts/tsx
	•	or are inside a __tests__ folder****
)


For example, we can add a test to check if the `<Home />` component successfully renders a heading:

`page.test.tsx`

```ts
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Page', () => {
  it('renders a h1', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
```

`page.jsx`

```ts
export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
```

Use `npm run test` or `npm run:coverage` or `npm run:watch`to run test

## 7. What to Test + Syntax + Docs

| Target                   | Example Syntax                                            | Docs                                                               |
| ------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------ |
| ✅ Component renders     | `render(<Component />)`                                   | https://testing-library.com/docs/react-testing-library/api/#render |
| ✅ Element exists        | `screen.getByRole('button')`, `screen.getByText('label')` | https://testing-library.com/docs/queries/about                     |
| ✅ Text content          | `expect(screen.getByText('Hello')).toBeInTheDocument()`   | https://testing-library.com/docs/using-matchers                    |
| ✅ Click events          | `fireEvent.click(btn); expect(fn).toHaveBeenCalled()`     | https://testing-library.com/docs/example-input-event               |
| ✅ Form input change     | `fireEvent.change(input, { target: { value: 'test' } })`  | https://testing-library.com/docs/example-input-event               |
| ✅ Conditional rendering | Pass different props and assert outputs                   | https://testing-library.com/docs/queries/bydisplayvalue            |
| ✅ Snapshot testing      | `expect(container).toMatchSnapshot()`                     | https://jestjs.io/docs/snapshot-testing                            |
| ✅ Class check           | `expect(el).toHaveClass('active')`                        | https://testing-library.com/docs/ecosystem-jest-dom/#tohaveclass   |
| ✅ Async behavior        | `await screen.findByText('Done')`                         | https://testing-library.com/docs/async                             |
| ✅ Custom hooks          | `renderHook(() => useMyHook())`                           | https://react-hooks-testing-library.com/usage/basic                |

---

## 8. Test Examples

### ✅ Render & Find Element

```tsx
render(<Home />);
const heading = screen.getByRole('heading', { level: 1 });
expect(heading).toBeInTheDocument();
```

### ✅ Simulate Click

```tsx
const mockFn = jest.fn();
render(<Button onClick={mockFn} />);
fireEvent.click(screen.getByRole('button'));
expect(mockFn).toHaveBeenCalledTimes(1);
```

### ✅ Input Change

```tsx
render(<Input />);
fireEvent.change(screen.getByPlaceholderText('Enter name'), {
  target: { value: 'Leon' },
});
expect(screen.getByDisplayValue('Leon')).toBeInTheDocument();
```

### ✅ Conditional Rendering

```tsx
render(<Greeting isLoggedIn />);
expect(screen.getByText('Welcome back!')).toBeVisible();
```

### ✅ Snapshot

```tsx
const { container } = render(<Component />);
expect(container).toMatchSnapshot();
```

### ✅ Async Loading

```tsx
render(<FetchUser />);
expect(await screen.findByText('Leon')).toBeInTheDocument();
```

---

## 9. Reference Docs

- 📘 [Next.js Guide on Jest](https://nextjs.org/docs/app/guides/testing/jest)
- 🧪 [React Testing Library Intro](https://testing-library.com/docs/react-testing-library/intro/)
- 🔍 [All Query Methods](https://testing-library.com/docs/queries/about)
- ✅ [jest-dom Matchers](https://github.com/testing-library/jest-dom)
- 🔄 [Handling Asynchronous UI](https://testing-library.com/docs/guide-disappearance)
- 🧵 [Testing Custom Hooks](https://react-hooks-testing-library.com/usage/basic)

---

_Last updated: 2025-07-15_
