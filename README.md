<!--README.md-->

# Astro Starter Template

This is a professional, scalable, and high-performance Astro starter template designed for 10x Engineers. It follows a strict, modular architecture inspired by SvelteKit, emphasizing a clear separation of concerns (Data vs. View vs. Logic).

**Core Philosophy:**

- **Modular Architecture**: Code is organized into distinct, reusable components.
- **Strictly Typed**: TypeScript in strict mode ensures code quality and maintainability.
- **Self-Documenting**: JSDoc is mandatory for all component props.
- **Separation of Concerns**: A clear distinction between data, UI, and application logic.

## Table of Contents

- [Project Structure](#project-structure)
- [Project Setup](#project-setup)
  - [1. Firebase Project](#1-firebase-project)
  - [2. Site Content](#2-site-content)
  - [3. Branding and Assets](#3-branding-and-assets)
  - [4. Environment Variables](#4-environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Code Quality and Git Hooks](#code-quality-and-git-hooks)
- [Testing](#testing)
- [Building and Deploying](#building-and-deploying)
- [CI/CD (GitHub Actions)](#cicd-github-actions)
  - [Configuring Secrets](#configuring-secrets)
- [AI-Assisted Development with Gemini CLI](#ai-assisted-development-with-gemini-cli)
  - [Using Playwright MCP with Gemini CLI](#using-playwright-mcp-with-gemini-cli)

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

## Project Setup

Before running the project, you need to configure a few things.

### 1. Firebase Project

This project is configured for deployment to Firebase Hosting.

1.  **Create a Firebase Project:** Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Enable Hosting:** Within your new project, navigate to the "Hosting" section and enable it.
3.  **Update `.firebaserc`:** Open the `.firebaserc` file and replace `"firebase-project-id"` with your actual Firebase project ID.

### 2. Site Content

All site-specific data (like your name, social media links, and project details) is stored in `src/lib/data/site-content.ts`. Open this file and replace the placeholder values with your own information.

### 3. Branding and Assets

All public-facing assets (favicons, social images) are generated from source files in `src/lib/assets`.

1.  **Logo:** Replace `src/lib/assets/icons/logo.png` with your own logo. This is the source for all generated favicons.
2.  **Social Preview Image:** Replace `src/lib/assets/images/vibe.png` with your own social media preview image.
3.  **Generate Assets:** Run the following command to generate all assets in the `public/` directory:

    ```bash
    pnpm generate
    ```

The script `scripts/generate-public-assets.ts` will automatically create all necessary favicons, manifest files, and social images based on your source files.

### 4. Environment Variables

The project uses a `.env` file for environment variables.

1.  **Create the `.env` file:**
    ```bash
    cp .env.example .env
    ```
2.  **Add your Google Analytics ID:** Open the new `.env` file and replace `G-XXXXXXXXXX` with your own Google Analytics Measurement ID. You can get this from your Google Analytics dashboard.

## Getting Started

1.  **Install Dependencies:**

    ```bash
    pnpm install
    ```

    This will also install the Git hooks using Lefthook.

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
- `generate`: Generates all public assets from `src/lib/assets`.
- `deploy`: Deploys the application to Firebase Hosting.
- `fix`: Automatically formats, lints, and type-checks the code.
- `fix:changed`: Formats and lints only the files that have changed.
- `validate`: Runs all checks (Prettier, ESLint, Astro Check) without modifying files.

## Code Quality and Git Hooks

This project uses a combination of tools to ensure high code quality and consistent commit messages.

- **Lefthook:** A Git hooks manager that runs checks before you commit and push. The configuration is in `lefthook.yml`. The hooks are automatically installed when you run `pnpm install`.
- **Commitlint:** Enforces a conventional commit message format. The configuration is in `commitlint.config.ts`. This ensures a clean and readable Git history.
- **lint-staged:** Runs ESLint and Prettier on your staged files before you commit. This prevents you from committing code that doesn't meet the style guidelines. The configuration is in `package.json`.

These tools work together to automate code quality checks, making it easier to maintain a clean and consistent codebase.

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

## CI/CD (GitHub Actions)

This project comes with a pre-configured GitHub Actions workflow located in `.github/workflows/ci.yml`. It handles:

1. Build Verification: Ensures the project compiles correctly.
2. E2E Testing: Runs Playwright tests against the production build.
3. Caching: Caches pnpm dependencies and Playwright browsers for faster CI runs.

### Configuring Secrets

Since the build process requires environment variables (like Google Analytics), you must add them to your GitHub Repository Secrets for the Action to pass.

1. Go to your GitHub Repository.
2. Navigate to Settings > Secrets and variables > Actions.
3. Click New repository secret.
4. Add the following secrets:

- `GOOGLE_ANALYTICS_ID`: Your GA Measurement ID (e.g., G-XXXXXXX).

  Note: If you add more environment variables to `.env`, remember to add them to GitHub Secrets and update the `.github/workflows/ci.yml` file to expose them to the build step.

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
