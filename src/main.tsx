import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SiteHeader from './components/site-header.tsx'
import SiteFooter from './components/site-footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteHeader />
    <div className="min-h-dvh mx-auto max-w-[95vw] sm:max-w-[70vw] px-4 py-6 sm:px-8 lg:py-10">
      <App />
    </div>
    <SiteFooter />
  </StrictMode>,
)
