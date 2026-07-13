import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import V3App from './v3/V3App.jsx'
import './index.css'

// Two designs live in one build and switch on the URL hash — no router needed:
//   /        → the interactive studio (App)
//   /#v3     → the "Design Artifacts" redesign (V3App)
// The studio is the default so existing links are unchanged.
const isV3 = () => window.location.hash.replace(/^#\/?/, '').toLowerCase() === 'v3'

function Root() {
  const [v3, setV3] = useState(isV3)
  useEffect(() => {
    const onHash = () => setV3(isV3())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return v3 ? <V3App /> : <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
