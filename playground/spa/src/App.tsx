import { useEffect, useState } from 'react'
import { detect } from 'un-detector'
import './App.css'

function App() {
  const [detected] = useState(detect())

  useEffect(() => {
    console.log(detected, 'detected')
  }, [])

  const printBoolean = (value: boolean | string) => {
    if (typeof value === 'string') return value
    return value ? 'true' : 'false'
  }

  return (
    <div className='App'>
      <h1>Detected browser UA</h1>
      <div>
        {Object.keys(detected)
          .sort()
          .map((item, key) => (
            <div key={key}>
              <span style={{ fontSize: 24, fontWeight: 'bold' }}>{item}</span>
              {Object.keys((detected as any)[item]).map((d, k) =>
                (detected as any)[item][d] ? (
                  <div key={k}>
                    <span style={{ fontSize: 18, fontWeight: 'bold' }}>{d}:</span>
                    <span style={{ color: 'burlywood', marginLeft: '6px' }}>
                      {printBoolean((detected as any)[item][d])}
                    </span>
                  </div>
                ) : null,
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default App
