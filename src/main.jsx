import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

/* One Tailwind entry point: it @imports the shared component layer so the
   base → components → utilities cascade order is preserved. No other global
   stylesheet is needed — the old per-feature CSS files were migrated into
   these two layers. */
import './styles/tailwind.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
