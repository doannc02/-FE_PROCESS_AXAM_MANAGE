import { useEffect, useState } from 'react'

const TimeCounter = () => {
  const [days, setDays] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      comingSoonTime()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const comingSoonTime = () => {
    let endTime = new Date('January 30, 2025 12:00:00 PDT')
    let endTimeParse = Date.parse(endTime.toString()) / 1000
    let now = new Date()
    let nowParse = Date.parse(now.toString()) / 1000
    let timeLeft = endTimeParse - nowParse
    let days = Math.floor(timeLeft / 86400)
    let hours = Math.floor((timeLeft - days * 86400) / 3600)
    let minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60)
    let seconds = Math.floor(
      timeLeft - days * 86400 - hours * 3600 - minutes * 60
    )
    if (hours < 10) {
      hours = Number('0' + hours)
    }
    if (minutes < 10) {
      minutes = Number('0' + minutes)
    }
    if (seconds < 10) {
      seconds = Number('0' + seconds)
    }
    setDays(days)
    setHours(hours)
    setMinutes(minutes)
    setSeconds(seconds)
  }

  return (
    <div className='coming-soon-area'>
      <div className='d-table'>
        <div className='d-table-cell'>
          <div className='container'>
            <div className='coming-soon-content'>
              <div className='flex gap-10'>
                <div id='days'>
                  {days} <span>Days</span>
                </div>
                <div id='hours'>
                  {hours} <span>Hours</span>
                </div>
                <div id='minutes'>
                  {minutes} <span>Minutes</span>
                </div>
                <div id='seconds'>
                  {seconds} <span>Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeCounter
