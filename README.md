# Astro Starter Template

This is a professional, scalable, and high-performance Astro starter template designed for 10x Engineers. It follows a strict, modular architecture inspired by SvelteKit, emphasizing a clear separation of concerns (Data vs. View vs. Logic).

**Core Philosophy:**

- **Modular Architecture:** Code is organized into distinct, reusable components.
- **Strictly Typed:** TypeScript in strict mode ensures code quality and maintainability.
- **Self-Documenting:** JSDoc is mandatory for all component props.
- **Separation of Concerns:** A clear distinction between data, UI, and application logic.

## Project Structure

The project uses a `src/lib` folder structure, similar to SvelteKit, to organize the core application logic.

```text
src/
├── content/            # Astro Content Collections (Database)
│   └── config.ts       # Zod Schemas
├── lib/                # Core Application Logic (Aliased as $lib)
│   ├── assets/         # Static assets (images, icons)
│   ├── components/     # Astro components
│   │   ├── base/       # Meta components (SEO, Analytics)
│   │   ├── layout/     # Structural (Navbar, Footer)
│   │   ├── ui/         # Dumb primitives (Button, Card, Input)
│   │   └── blocks/     # Business sections (Hero, About, Pricing)
│   ├── data/           # Single Source of Truth (Data Layer)
│   ├── layouts/        # HTML Wrappers ($layouts)
│   ├── styles/         # Global CSS ($styles)
│   ├── utils/          # Helper functions ($utils)
│   └── views/          # View Aggregators ($views)
└── pages/              # The Router (Data Fetching + View Injection)
```

## Getting Started

1.  **Install Dependencies:**

    ```bash
    pnpm install
    ```

2.  **Run the Development Server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:4321`.

### For Nix Users

If you are a Nix user, you can use the provided `flake.nix` to create a development shell with all the necessary dependencies, including Playwright browsers.

```bash
nix develop
```

## Available Scripts

The `package.json` file includes the following scripts:

- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `preview`: Previews the production build locally.
- `check`: Runs Astro's type checker.
- `lint`: Lints the code using ESLint.
- `format`: Formats the code using Prettier.
- `test:e2e`: Runs end-to-end tests using Playwright.
- `deploy`: Deploys the application to Firebase Hosting.
- `build-deploy`: Builds and then deploys the application.
- `fix`: Automatically formats, lints, and type-checks the code.
- `validate`: Runs all checks (Prettier, ESLint, Astro Check) without modifying files.

## Testing

End-to-end tests are written using [Playwright](https://playwright.dev/).

- **Run all tests:**
  ```bash
  pnpm test:e2e
  ```

## Building and Deploying

The application is configured for deployment to **Firebase Hosting**.

1.  **Build the Project:**

    ```bash
    pnpm build
    ```

2.  **Deploy to Firebase:**
    ```bash
    pnpm deploy
    ```

You can also run both steps with a single command: `pnpm build-deploy`.

## AI-Assisted Development with Gemini CLI

This project is optimized for development with an AI agent like the **Gemini CLI**. The `GEMINI.md` file provides the core context and instructions for the AI.

### Using Playwright MCP with Gemini CLI

The Playwright Model-View-Controller-Prompter (MCP) allows the AI to "see" and interact with the application, enabling it to write and validate code.

**To enable AI-assisted development:**

1.  **Start the dev server:** `pnpm dev`
2.  **Initiate a chat with the Gemini CLI:** Provide the `GEMINI.md` file as context and give the AI a task.

The AI can use Playwright to:

- **Verify changes:** Check if a new component is rendered correctly.
- **Debug issues:** Inspect the page for errors or unexpected behavior.
- **Perform accessibility checks:** Ensure the application is accessible.

By following the conventions in `GEMINI.md`, you can guide the AI to build, test, and even deploy the application on your behalf.
