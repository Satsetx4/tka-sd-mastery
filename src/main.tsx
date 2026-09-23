import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'katex/dist/katex.min.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ui/ErrorBoundary.tsx'
import { NotFound } from './components/ui/NotFound.tsx'

const content = location.pathname === '/' || location.pathname === '/index.html' ? <App /> : <NotFound />

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>{content}</ErrorBoundary>
  </StrictMode>,
)
