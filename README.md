# axen-form Playground

> 🔗 **Open in StackBlitz:** https://stackblitz.com/~/github.com/nasirBataruna/axen-form-playground

Interactive scenario-based playground for [`@axenstudio/axen-form`](https://www.npmjs.com/package/@axenstudio/axen-form).  
Built with React 19, TypeScript, and Vite — runs instantly in StackBlitz with no local setup required.

## Tech Stack

- React 19
- TypeScript
- Vite
- `@axenstudio/axen-form@^0.1.16`
- `yup` and `zod` (validation examples)
- `react-router-dom` (scenario routing)

## Local Setup

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Available Scripts

- `pnpm dev` — start dev server with HMR
- `pnpm build` — type-check and produce production build
- `pnpm preview` — preview the production build locally

## Scenario Catalog

Each scenario demonstrates one focused capability:

- `01-basic` — minimal form setup
- `02-all-fields` — showcase of available field types
- `03a-layout` — grid/layout composition
- `03b-field-groups` — grouped/sectioned fields
- `04-validation` — Yup/Zod and validation flow
- `05-conditional` — conditional rendering with `hidden` logic
- `06-array-fields` — repeatable list fields
- `07-ref-control` — imperative API via form ref
- `08-payload-map` — payload field mapping strategies
- `09-form-context` — context-driven form behavior
- `10-custom-component` — custom field component integration
- `11-theme` — built-in and custom theming
- `12-custom-registration` — custom component registration
- `13-stepper-form` — multi-step form basics
- `14-stepper-complex` — advanced stepper orchestration

## Adding a New Scenario

1. Create a new folder under `src/scenarios/`.
2. Export a scenario component from `index.tsx`.
3. Register it in the scenario router inside `App.tsx`.
4. Keep each scenario focused on one concept with realistic initial values.

## License

See the [skill authoring project](https://github.com/nasirBataruna/axen-form-playground) for context.

