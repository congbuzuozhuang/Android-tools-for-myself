import { useState } from 'react'

function App() {
  const [tools] = useState([
    { id: 1, name: '计算器', icon: '🔢', desc: '简单计算器' },
    { id: 2, name: '倒计时', icon: '⏱️', desc: '设置倒计时' },
    { id: 3, name: '记事本', icon: '📝', desc: '快速记录' },
  ])

  return (
    <div className="app">
      <header className="header">
        <h1>📱 安卓小工具</h1>
      </header>
      <main className="main">
        <div className="tool-grid">
          {tools.map(tool => (
            <div key={tool.id} className="tool-card">
              <span className="tool-icon">{tool.icon}</span>
              <h3>{tool.name}</h3>
              <p>{tool.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App