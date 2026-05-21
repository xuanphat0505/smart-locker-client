import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {initializeDarkMode} from '@/hooks/useDarkMode'
import './index.css'
import App from './App.tsx'

initializeDarkMode()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
