# Deploying WrapBrand on Render

This project is configured completely for deploying to **[Render.com](https://render.com/)**, using an Infrastructure as Code (IaC) approach. The supplied `render.yaml` Blueprint file will automatically launch PostgreSQL, the Spring Boot Backend, and the React Frontend simultaneously.

## Deployment Steps

### 1. Push to GitHub
1. Create a new repository on GitHub.
2. Push all the local code to the `main` branch.

### 2. Import Blueprint in Render
1. Create an account on Render and log into the Dashboard.
2. Click **New** -> **Blueprint**.
3. Connect your GitHub account, and select the `wrapbrand` repository.
4. Render will automatically detect the root `render.yaml` file.
5. Provide a name for the Blueprint service (e.g., `WrapBrand`) and click **Apply**.

### 3. Let it Provision
Render will automatically spin up 3 sub-services based on the `render.yaml`:
1. **`wrapbrand-db` (PostgreSQL)**
2. **`wrapbrand-backend` (Web Service)** - It automatically provisions the Java environment, runs Maven to build the executable `.jar`, and starts it. The Flyway migrations run automatically upon startup, creating the schema and seeding the product data.
3. **`wrapbrand-frontend` (Static Site)** - It automatically installs npm dependencies, runs `vite build`, and publishes the `/dist` directory globally as a CDN static site.

### Environment Variables
The blueprint handles environment variable wiring automatically:
*   The database connection URL, user, and password are automatically extracted from the PostgreSQL service and injected into the Spring Boot backend securely.
*   A `JWT_SECRET` is automatically generated and securely injected.
*   The API base URL that the React frontend needs to contact the backend is also connected automatically.

There is no further manual configuration required after clicking "Apply".

## Updating
Any time you push changes to the `main` branch of your GitHub repository, Render will automatically detect the changes, pull down the new code, rebuild the appropriate application (backend or frontend), and deploy it with Zero Downtime!
