import { useState, useEffect } from 'react'
import Experience from './Experience/Experience'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const experience = new Experience()

  useEffect(() =>{
    if (darkMode === false)
    {
      experience.lightMode()
    }
    if (darkMode === true)
    {
      experience.darkMode()
    }
  }, [darkMode])

  useEffect(() =>{
    if (revealed === false)
    {
      experience.noZoom()
    }
    if (revealed === true)
    {
      experience.zoom()
    }
  }, [revealed])

  const handleReveal = () =>
  {
    setRevealed(!revealed)
  }

  const handleClick = () =>
  {
    setDarkMode(!darkMode)
  }

  return (
    <div className={darkMode === false ? 'App light-mode' : 'App dark-mode'}>
      <div className='text'>
        <h1>Psychedelic tunnel</h1>
        <button onClick = {handleReveal}>Tell me { revealed === false ? 'more' : 'less'}</button>
        <h2 className ={ revealed === false ? 'revealedFalse' : 'revealedTrue'}>
          This psychedelic tunnel built in Three.js randomly morphs at it's own rythm. Move your mouse around or touch your screen to play with the lines.</h2>
      </div>
      
      <div className='bottom'>
        <p>visit portfolio at <a className='textButton' href='http://emiliegauvin.com/' target="_blank"><i>emiliegauvin.com</i></a></p>
        <button  onClick = {handleClick}>{darkMode === false ? 'Switch to dark mode' : 'Switch to light mode'}</button>
      </div>
    </div>
  )
}

export default App
