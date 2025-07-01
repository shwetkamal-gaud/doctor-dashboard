import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppointmentsProvider } from './context/AppointmentContext.tsx'
import Navbar from './components/Navbar.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppointmentsProvider>
      <ThemeProvider>
        <Navbar />
        <App />
      </ThemeProvider>
    </AppointmentsProvider>
  </StrictMode>,
)
