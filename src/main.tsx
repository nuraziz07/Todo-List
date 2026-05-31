import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore
import '../src/index.css'
import App from '../src/App.tsx'
import TodoProvider from "./Providers/context.tsx";
import {BrowserRouter} from 'react-router-dom'
import './i18n.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <TodoProvider>
          <BrowserRouter>
              <div>
                  <App />
              </div>
          </BrowserRouter>
      </TodoProvider>
  </StrictMode>,
)
