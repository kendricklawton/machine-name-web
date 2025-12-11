# Machine Name

This repository houses the company website for the **Machine Name** project. It is managed using **pnpm workspaces**.

## Repository Structure

The project is organized as follows:

```text
machine-name-web/
├── apps/
│   └── machine-name/
│       └── web/          # Next.js Web Application (@machine-name/web)
│
└── packages/
    └── ui/               # Shared UI Component Library (@machine-name/ui)
```

## Applications

### Company Website (`@machine-name/web`)
Located in `apps/machine-name/web`, this is the main website application built with:
*   **Next.js 16**
*   **React 19**
*   **Tailwind CSS 4**

It consumes UI components from the shared `@machine-name/ui` package.

**Hosting**: The Next.js application is deployed on **Vercel**.

## Packages

### UI Library (`@machine-name/ui`)
Located in `packages/ui`, this package contains shared React components and utilities used by the web application. It includes dependencies like `lucide-react`, `clsx`, and `tailwind-merge`.

## Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (Latest LTS recommended)
*   [pnpm](https://pnpm.io/)

### Development

1.  **Install dependencies**:
    ```sh
    pnpm install
    ```

2.  **Run the development environment**:
    ```sh
    pnpm dev
    ```
    This command uses `concurrently` to run the project's services in parallel. It currently starts:
    *   **Web App** (`@machine-name/web`): Runs on port 3000.
