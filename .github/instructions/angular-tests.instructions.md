---
description: "Use when writing or updating Angular unit tests, component specs, or TestBed setup in src. Covers standalone component testing, minimal Jasmine specs, and legacy test pitfalls in this repo."
name: "Angular Test Guidelines"
applyTo: "src/**/*.spec.ts"
---
# Angular Test Guidelines

- Treat most app components as standalone. When updating specs for standalone components, prefer `imports: [ComponentUnderTest]` in `TestBed.configureTestingModule()` instead of `declarations`.
- Keep unit specs small and behavior-focused. This repo commonly uses a basic `should create` test as a baseline, then adds only the assertions needed for the touched behavior.
- Use one async setup style per file: either `waitForAsync(() => TestBed.configureTestingModule(...).compileComponents())` plus a second `beforeEach`, or a single `async` `beforeEach` that compiles before creating the fixture.
- Create the fixture after compilation, then call `fixture.detectChanges()` before assertions that depend on bindings or lifecycle hooks.
- Mock router, Material, and service dependencies as lightly as possible so tests stay readable.
- Do not copy older spec patterns blindly. Some legacy specs still use outdated declarations-first setup for standalone components.
- Leave `e2e/` alone unless the task explicitly targets Protractor coverage.
