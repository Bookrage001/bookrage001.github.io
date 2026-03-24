---
description: "Use when editing Angular components, templates, routes, or SCSS in src/app. Covers standalone component patterns, Material-first UI work, local SCSS usage, and repo-specific frontend conventions."
name: "Angular Frontend Guidelines"
applyTo: "src/app/**/*.ts, src/app/**/*.html, src/app/**/*.scss"
---
# Angular Frontend Guidelines

- Prefer standalone components for active app code. Import Angular Material, Router, and `@angular/flex-layout` dependencies directly in the component instead of expanding `src/app/app.module.ts`.
- Reuse existing section patterns in `src/app` before introducing new containers, especially for the portfolio sections like about, blog, tools, games, dashboard, products, and documentation.
- Prefer Angular Material components for new UI, but preserve the surrounding feature style when a page already uses simple HTML plus local SCSS instead of Material widgets.
- Keep styles local to the touched component when possible. Use the component SCSS file before adding to `src/styles.scss`.
- Prefer responsive spacing units (`%`, `rem`, `em`, `clamp`) for spacing/layout values, and use fixed `px` spacing only when necessary for a specific visual requirement.
- Preserve existing responsive behavior. The app shell uses a `600px` mobile breakpoint, while some feature styles use narrower component-specific breakpoints.
- Keep selectors on the `app-` prefix and keep template, SCSS, and component file names aligned.
- Use the correct `products` spelling consistently for routes, folders, files, selectors, and component class names in this feature.
