import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Vicente Perpétuo</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Contador é {count}
          </button>
          <p>
            Projeto React + Vite configurado para deploy na Vercel
          </p>
          <p>
            Analytics e Speed Insights habilitados ✓
          </p>
        </div>
      </div>
    </>
  )
}

export default App


