# Coding Standards

Architecture, build commands, and repo conventions are documented in [`.github/copilot-instructions.md`](.github/copilot-instructions.md), with path-scoped rules in [`.github/instructions/`](.github/instructions/). This file is the standards and process reference — apply these when writing or reviewing code in this repo.

These rules apply to **new and touched code**. Much of the existing code predates them; don't refactor untouched code just to conform (see the Minimal Changes rule in `copilot-instructions.md`). Bring a file into line only when the task already requires changing it.

## Frontend (Angular)

**Components**
- Standalone, with SCSS and an `app-` selector. Import Material, Router, and `@angular/flex-layout` dependencies directly in the component — don't expand the legacy `app.module.ts`.
- Prefer lazy-loading new routes with `loadComponent()` in `app-routing.module.ts`; only eager-load what must render on first paint. Existing eager routes can stay as they are.
- Presentation only. HTTP calls, data loading, and data shaping live in `src/app/services/`; a component should inject a service, not `HttpClient` directly. (`dashboard/calender` currently calls `HttpClient` itself — move that into a service if you're already reworking it.)
- Use `inject()` for dependencies in new code rather than constructor parameters.
- Use `ChangeDetectionStrategy.OnPush` by default for new components, and prefer signals (`signal()`, `computed()`) for local component state.

**RxJS**
- Every `.subscribe()` needs a cleanup story: `takeUntilDestroyed()` at the subscribe site, or the `async` pipe if you're just binding to a template. One-shot `HttpClient` calls complete on their own, but long-lived streams (`router.events`, `interval`, subjects) must be torn down.
- Type `.subscribe({ error: ... })` callbacks as `HttpErrorResponse` (`@angular/common/http`), not `any`.

**Typing**
- No `any` in hand-written code — use `unknown` and narrow, or a real interface.
- Give data files a typed contract. `services/jobs.json` should be read through an interface (see `services/jobs-editing-guide.md` for the field contract) rather than `http.get<any>()`.

**Data & content**
- Resume/job content lives in `services/jobs.json`. Follow `services/jobs-editing-guide.md` when editing it, and keep `description` / `businessDescription` / `softwareDescription` consistent with each other.
- Environment-specific URLs (calendar ICS feeds, proxies) belong in `src/environments/environment*.ts`, not hard-coded in components.

**Forms**
- If a feature needs a form, use reactive forms (`FormBuilder`/`FormGroup`). Don't introduce `[(ngModel)]` template-driven forms.

**Generics / reuse**
- If the same pattern appears 3+ times, extract it (shared SCSS class, utility, generic component, or service) instead of copy-pasting.
- Reach for a generic component/type rather than near-identical per-section copies — e.g. one card or list component configured by inputs.

**Styles**
- Scope styles to the component (`*.component.scss`) before adding to `src/styles.scss`.
- Avoid `::ng-deep`; if piercing a Material or third-party (e.g. `angular-calendar`) internal is unavoidable, scope it with `:host ::ng-deep` and leave a comment on why.
- Prefer responsive units (`%`, `rem`, `em`, `clamp`) for spacing; keep the `600px` shell mobile breakpoint behaviour intact.

**Naming**
- PascalCase for classes and interfaces, camelCase for variables, methods, and properties.
- File, selector, and class names stay aligned (`foo-bar.component.ts` → `app-foo-bar` → `FooBarComponent`). One class per file.

## Cloudflare Worker (`cloudflare/calendar-proxy/`)

- Plain JavaScript, no build step — it's pasted into the Cloudflare dashboard. Keep it dependency-free and self-contained.
- Restrict CORS to the explicit `ALLOWED_ORIGINS` set. Don't widen to `*`. Add the local dev origin you actually use (e.g. `http://localhost:4201`, the `npm start` port) rather than opening it up.
- Only proxy the specific upstream URL it's built for — never forward an arbitrary URL taken from the request (that turns it into an open proxy).
- When you change the worker, update the deploy notes in its header comment and point out in the PR that it needs re-deploying by hand, since CI doesn't deploy it.

## Testing

- Jasmine + TestBed. See `.github/instructions/angular-tests.instructions.md` for setup style.
- Structure tests as Arrange / Act / Assert.
- Name `it()` blocks after the behaviour: `'should <expected result> when <scenario>'`.
- Any new component or service gets a spec, even if it's only `should create` plus assertions for the behaviour you added.
- Mock services and `HttpClient` (`provideHttpClientTesting()`) instead of hitting real endpoints.

## Processes

**Before you finish a change**
1. `npm run lint` passes.
2. `npm run build` passes (and `npm run build:prod` if you touched build config, routing, or `angular.json`).
3. `npm test` passes for anything with specs you touched.
4. For UI changes, run the app (`npm start`, port 4201) and check the page at desktop and mobile (< 600px) widths.

**Branches**
- `main` is production: every push to `main` builds and deploys to S3 via `.github/workflows/main.yml`. Never push directly to `main` — go through a PR.
- `stage` is the integration branch for Dependabot updates (`.github/dependabot.yml` targets it). Batch dependency updates there, then merge `stage` → `main` in one PR.
- Branch names: `feat/<topic>`, `fix/<topic>`, `chore/<topic>`.

**Commits**
- Conventional Commits with a scope: `feat(timeline): ...`, `fix(resume): ...`, `chore(deps): ...`, `build(deps): ...`.
- One concern per commit. Formatting-only changes go in their own commit (see Minimal Changes).

**Pull requests**
- Fill in `.github/pull_request_template.md`; every checkbox should be true or explained.
- One concern per PR. All PRs need @Bookrage001's approval (`CODEOWNERS`).

**Build output**
- `docs/` is generated production output (`npm run build:prod`) and is what gets deployed. Never hand-edit files in `docs/`.

**Infrastructure**
- Deployment changes go in `.github/workflows/main.yml`, not done by hand in the AWS console. AWS credentials are repo secrets — never commit keys or put them in `package.json` scripts.

**Instruction intake**
- If a task arrives as a user story, keep the story with the work (in the PR description) and check the change against its acceptance criteria before finishing.

**Keeping rules in sync**
- Standards and processes live here; architecture, commands, and repo layout live in `.github/copilot-instructions.md`. Update the right one rather than duplicating a rule in both.
