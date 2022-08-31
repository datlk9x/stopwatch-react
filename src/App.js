import { useEffect, useState } from 'react'
import './App.scss'

const App = () => {

  const [hours, setHours]               = useState(0)
  const [minutes, setMinutes]           = useState(0)
  const [seconds, setSeconds]           = useState(0)
  const [milliseconds, setMilliseconds] = useState(0)
  const [isRunning, setIsRunning]       = useState(false)

  const onStart = () => { setIsRunning(true) }
  const onStop  = () => { setIsRunning(false) }
  const onReset = () => {
    setHours(0)
    setMinutes(0)
    setSeconds(0)
    setMilliseconds(0)
    setIsRunning(false)
  }

  useEffect(() => {

    let interval = null

    if(isRunning){

      interval =setInterval(() => {

        if(minutes >59){
          setHours(hours + 1)
          setMinutes(0)
          clearInterval(interval)
        }

        if(seconds >59){
          setHours(minutes + 1)
          setSeconds(0)
          clearInterval(interval)
        }

        if(milliseconds >= 99){
          setSeconds(seconds + 1)
          setMilliseconds(0)
          clearInterval(interval)
        }

        if(milliseconds < 99){ setMilliseconds(milliseconds + 1) }

      }, 10)

    }else clearInterval(interval)

    return () => { clearInterval(interval) }
    
  })

  return (
    <div className="clock">
        <span>{ hours < 10 ? '0' + hours : hours } : { minutes < 10 ? '0' + minutes : minutes} : { seconds < 10 ? '0' + seconds : seconds } : { milliseconds < 10 ? '0' + milliseconds : milliseconds }</span>
        <div className='text-center'>
          <button onClick={onStart} className='btn btn-light m-4'>Start</button>
          <button onClick={onStop} className='btn btn-light m-4'>Stop</button>
          <button onClick={onReset} className='btn btn-light m-4'>Reset</button>
        </div>
      </div>
  )
}

export default App
