import { useState } from 'react'
import { detect } from 'un-detector'
import './App.css'

function App() {
  const [detected] = useState(detect())

  console.log(detected, 'detected')

  return (
    <div className='App'>
      <h1>Detected browser UA</h1>
      <div>
        {Object.keys(detected).map((key) => (
          <div key={key}>
            <span>{key}:</span>
            <span>{JSON.stringify(detected[key as keyof typeof detected])}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
