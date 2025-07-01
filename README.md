# Appointment Dashboard

A modern, responsive appointment dashboard built with **React.js**, **TypeScript**,**TailwindCSS** and **ShadCN UI**, featuring date range filtering, timeline view, and real-time UI interactions.

## Features

- **Date Range Filter**  
  Filter appointments using pre-defined presets (Today, Last 7 Days, etc.) or a custom date range calendar.

- **Appointment List**  
  View filtered appointments in scrollable card layout with reschedule actions.

- **Timeline View**  
  Visual timeline for today's appointments using modular, auto-adjusting layout.

- **Modular Components**  
  Smart and maintainable code structure using reusable and isolated components.

- **Dark Mode Support**  
  Fully styled for both light and dark modes with ShadCN UI theming.

- **Loading Skeletons**  
  Skeleton placeholders for a smoother loading experience.

- **State Management**  
  Filters, date range, and modal states handled cleanly via React state.

## Tech Stack

- **Library:** React.js with Vite
- **UI:** ShadCN UI
- **Language:** TypeScript
- **Date Utils:** date-fns
- **Styling:** TailwindCSS


## Getting Started

1. **Clone the repo**
  ```bash
  git clone https://github.com/shwetkamal-gaud/doctor-dashboard.git
  cd doctor-dashboard
  ```
2. **Inastall Dependencies**
  ```bash
  npm install
  # or
  yarn install
  ```
3. **Run Development Server**
  ```bash
  npm run dev
  ```

## Deployed Link
```bash
https://doctor-dashboard-alpha.vercel.app/
```
## Demo video
```bash
https://drive.google.com/file/d/1UvAGJJ8yH05TvJa5Js1lihg0FnBNEnaZ/view?usp=sharing
```

1. I have choosen TypeScript for tyep sefety and tailwind css for it's utility classes and responsiveness
2. I picked Shadcn UI components for better UI and custom glassmorphism style
3. I used Context API for state management
4. I used mockapi.io for fetching, adding, updating appointments


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
