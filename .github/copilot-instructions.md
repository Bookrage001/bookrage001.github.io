# Project Guidelines

## Code Style
- Prefer Angular Material components and existing Material layout patterns for UI changes.
- Follow the current Angular style in `src/app`: standalone components are the default for active app code, with SCSS styles and `app-` selectors.
- Keep changes small and consistent with the surrounding feature instead of reformatting older files.

## Architecture
- The app boots with `bootstrapApplication()` in `src/main.ts`; treat this as the active application entry point.
- Routing lives in `src/app/app-routing.module.ts` and is exported as a `routes` constant used by `provideRouter(routes)`.
- `src/app/app.module.ts` still exists as a legacy compatibility shell. Do not expand it unless the task specifically requires it.
- The site is a personal portfolio with sections for about, blog, tools, games, dashboard, products, and documentation. Reuse existing section patterns before introducing new structure.

## Build And Test
- Install dependencies with `npm install`.
- Start the dev server with `npm start`.
- Build with `npm run build`; create the production output in `docs/` with `npm run build:prod`.
- Run unit tests with `npm test`.
- Run lint checks with `npm run lint`.
- `npm run e2e` uses Protractor and should be treated as legacy unless the task is explicitly about e2e coverage.

## Conventions
- Preserve Angular Material and `@angular/flex-layout` usage in touched areas unless you are intentionally migrating a feature.
- Check both `eslint.config.js` and `tslint.json` before assuming lint rules. ESLint is active, but the repo still carries older TSLint conventions that reflect local style.
- The production build is deployed from `docs/`, and `.github/workflows/main.yml` publishes that directory to S3.
