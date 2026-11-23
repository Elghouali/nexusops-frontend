# NexusOps — Agency Operations Dashboard

**React frontend prototype for an agency management workspace.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

> **Project status:** UI prototype. Backend integration and end-to-end deployment have not been verified here.

## Overview

NexusOps experiments with an agency workspace containing a public landing page, sign-in flow, and dashboard interface. The frontend includes components for projects, marketing charts, integrations, and operational status indicators.

## Stack

- **UI:** React 19, JavaScript, Tailwind CSS, Lucide icons.
- **Build tooling:** Vite 8, ESLint.
- **Charts & HTTP:** Recharts and Axios.
- **Backend:** [NexusOps Spring Boot API](https://github.com/Elghouali/NexusOps-backend).

## Run locally

Prerequisites: a recent Node.js version compatible with Vite 8 and npm.

```bash
git clone https://github.com/Elghouali/nexusops-frontend.git
cd nexusops-frontend
npm install
npm run dev
```

The Vite development server commonly uses **http://localhost:5173** unless the port is occupied.

For quality checks and a production build:

```bash
npm run lint
npm run build
npm run preview
```

The API integration currently includes a **hard-coded** `http://localhost:8080/api` base URL in `src/api.js`. Start the companion backend there for local integration, or adjust the API client for your environment before deploying.

## Source map

```text
src/
├── App.jsx              Root view and theme state
├── pages/
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── AuthPage.jsx
├── components/           Project, chart, status, integration UI
└── api.js                Axios configuration
```

## Production-readiness checklist

- [ ] Move API base URLs to environment-based configuration
- [ ] Verify complete authentication and logout behavior
- [ ] Review JWT storage and browser security
- [ ] Add UI tests and screenshot evidence
- [ ] Verify an actual backend/frontend deployment

**Author:** [Zakariae Elghouali](https://github.com/Elghouali)
