import { useState } from 'react'
import './App.css'
import ExpensiveCalculation from './components/ExpensiveCalculation'
import ReferenceEquality from './components/ReferenceEquality'
import PerformanceComparison from './components/PerformanceComparison'
import RealWorldExample from './components/RealWorldExample'
import CommonMistakes from './components/CommonMistakes'

function App() {
  const [activeTab, setActiveTab] = useState('expensive')

  const tabs = [
    { id: 'expensive', label: '🧮 Expensive Calculation', component: ExpensiveCalculation },
    { id: 'reference', label: '🔄 Reference Equality', component: ReferenceEquality },
    { id: 'performance', label: '📊 Performance Comparison', component: PerformanceComparison },
    { id: 'realworld', label: '🛒 Real World Example', component: RealWorldExample },
    { id: 'mistakes', label: '⚠️ Common Mistakes', component: CommonMistakes },
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 React useMemo Hook Learning</h1>
        <p>Master performance optimization with practical examples</p>
      </header>

      <nav className="tab-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {ActiveComponent && <ActiveComponent />}
      </main>

      <footer className="app-footer">
        <p>💡 Open DevTools Console to see performance logs</p>
        <p>🔧 Use React DevTools Profiler to analyze renders</p>
      </footer>
    </div>
  )
}

export default App
