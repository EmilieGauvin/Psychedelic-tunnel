import React from 'react'
import ReactDOM from 'react-dom/client'
import ThreeJSExperience from './ThreeJSExperience'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('threeJS-canvas')).render(
  <React.StrictMode>
    <ThreeJSExperience />
  </React.StrictMode>)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


