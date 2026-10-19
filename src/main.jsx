import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

/* Tailwind first (base tokens + utilities), then our shared component
   layer. No other global stylesheet is needed — the old per-feature CSS
   files were migrated into these two layers. */
import './styles/tailwind.css'
import './styles/components.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
