# Interactive comments section

My solution to the [Frontend Mentor interactive comments section](https://www.frontendmentor.io/challenges/interactive-comments-section-iK1XG7q6U) challenge. Built around 2022 when I was learning React, refactored later.

![Preview](./src/assets/design/desktop-preview.jpg)

**Live site:** https://filipkoniuszewski.github.io/interactive-comments-section/

React + TypeScript app with localStorage persistence, CRUD on comments and replies, voting, and a delete confirmation modal.

## Tech stack

- React 19 + TypeScript
- Vite
- Sass (SCSS)
- Vitest
- localStorage
- [react-time-ago](https://www.npmjs.com/package/react-time-ago)

## Project structure

```
src/
├── app/                    # App shell and entry
├── features/comments/      # Comments domain (components, context, lib, tests)
├── assets/                 # Images and design references
├── data/                   # Seed data
└── styles/                 # Global SCSS (tokens, mixins, components)
```

## Scripts

```bash
npm install
npm run dev
npm run test:run
npm run build
```

## Deployment

Pushes to `main` deploy via GitHub Actions (`.github/workflows/deploy.yml`).

## Author

- GitHub: [@FilipKoniuszewski](https://github.com/FilipKoniuszewski)
