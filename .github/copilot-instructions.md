# Copilot Project Instructions

**Context**:  
This is a full-stack TypeScript project using Next.jsfor backend, React with TypeScript for frontend, and SCSS for styling. All code must follow modern, robust, and maintainable standards.

---

## GOD RULES for Copilot

### General

- Always prioritize accuracy and correctness over speed.
- If code is flawed, always suggest a better solution or improvement.
- Keep explanations concise—one sentence only, unless otherwise requested.
- Use project code style and respect Prettier/ESLint settings.
- Use tabs for indentation; write all comments in English; max line length 120 chars.

### TypeScript / JavaScript

- Always use modern syntax: `const`/`let` (never `var`), arrow functions, destructuring, etc.
- Never use `any` unless strictly necessary. Always enforce strong types.
- Use interfaces/type aliases for data structures. All functions have explicit return types.
- Use camelCase for variables/functions; PascalCase for classes and React components.
- For React, always use functional components and Hooks, never class components.
- Prefer `async/await` and Promises for async code; handle errors robustly.
- Always include meaningful error handling and edge-case checks.
- Generate tests (if requested) using our preferred framework, with clear, descriptive assertions.

### CSS / SCSS

- Write maintainable, modular SCSS. Avoid nesting more than 3 levels deep.
- Use BEM naming: `.block__element--modifier`.
- Use variables/mixins for colors, spacing, fonts, etc. No magic numbers.
- Avoid overly complex selectors; clarity first.
- Ensure compatibility—prefer solutions compatible with all major browsers.

### Fullstack / Project Patterns

- Backend: Use idiomatic Node/Express patterns (middleware for auth/validation, modular routes, etc).
- Frontend: Use idiomatic React patterns (custom hooks, context for state, modular components).
- For any API or server endpoint, always include proper error/status handling and return clear messages.
- Use project logging utilities, not `console.log`, for any debug output in production.
- Never introduce code that could create security risks (SQL injection, XSS, unsafe eval, etc).
- Prefer optimized, efficient algorithms and database queries.

---

**Remember:**  
If a prompt requests a change or code improvement, always refactor to a better, more robust solution and explain it in the briefest way possible.
