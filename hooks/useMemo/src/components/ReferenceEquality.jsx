import React, { useState, useMemo, useRef } from 'react';
import { renderCounter } from '../utils/performanceUtils';

// Child component that re-renders when props change
function ChildComponent({ user, onUpdate }) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  
  console.log('🔄 ChildComponent rendered:', renderCount.current);
  
  return (
    <div className="result-box">
      <div className="render-indicator">
        Child rendered {renderCount.current} times
      </div>
      <div>
        <strong>User:</strong> {user.name} <br/>
        <strong>Email:</strong> {user.email} <br/>
        <strong>Age:</strong> {user.age}
      </div>
      <button className="btn btn-primary" onClick={onUpdate}>
        Update User
      </button>
    </div>
  );
}

function ReferenceEquality() {
  const [count, setCount] = useState(0);
  const [userAge, setUserAge] = useState(25);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);
  
  const renderCount = renderCounter.increment('ReferenceEquality');

  // Without useMemo - creates new object on every render
  const userWithoutMemo = {
    name: 'John Doe',
    email: 'john@example.com',
    age: userAge,
    preferences: {
      theme: 'dark',
      language: 'en'
    }
  };

  // With useMemo - only creates new object when userAge changes
  const userWithMemo = useMemo(() => {
    console.log('🔥 Creating user object with useMemo...');
    return {
      name: 'John Doe',
      email: 'john@example.com',
      age: userAge,
      preferences: {
        theme: 'dark',
        language: 'en'
      }
    };
  }, [userAge]);

  const handleUpdateUser = () => {
    setUserAge(prev => prev + 1);
  };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h2>🔄 Reference Equality & Object Recreation</h2>
        <p className="demo-description">
          This demo shows how object recreation on every render can cause unnecessary 
          child component re-renders, and how useMemo prevents this.
        </p>
      </div>

      <div className="demo-section">
        <h3>Settings</h3>
        <div className="controls">
          <label>
            <input
              type="radio"
              checked={useMemoEnabled}
              onChange={() => setUseMemoEnabled(true)}
            />
            Use useMemo (Prevent object recreation)
          </label>
          <label>
            <input
              type="radio"
              checked={!useMemoEnabled}
              onChange={() => setUseMemoEnabled(false)}
            />
            Without useMemo (Creates new object every render)
          </label>
        </div>
        <div className="controls">
          <button 
            className="btn btn-secondary"
            onClick={() => setCount(prev => prev + 1)}
          >
            Force Re-render (Count: {count})
          </button>
        </div>
        <div className="performance-info">
          Parent component rendered: {renderCount} times
        </div>
      </div>

      <div className="comparison-grid">
        <div className="demo-section">
          <h3>{useMemoEnabled ? '✅ With useMemo' : '❌ Without useMemo'}</h3>
          <ChildComponent 
            user={useMemoEnabled ? userWithMemo : userWithoutMemo}
            onUpdate={handleUpdateUser}
          />
          
          <div className="code-block">
{useMemoEnabled ? `// With useMemo - object only recreated when userAge changes
const user = useMemo(() => ({
  name: 'John Doe',
  email: 'john@example.com',
  age: userAge, // ← Only dependency
  preferences: { theme: 'dark', language: 'en' }
}), [userAge]);

// Child component only re-renders when user object actually changes` : `// Without useMemo - new object on every render
const user = {
  name: 'John Doe',
  email: 'john@example.com', 
  age: userAge,
  preferences: { theme: 'dark', language: 'en' }
}; // ← New object reference every time!

// Child component re-renders on every parent render`}
          </div>
        </div>

        <div className="demo-section">
          <h3>🎯 Reference Equality Test</h3>
          <div className="performance-info">
            <strong>Object Reference Check:</strong><br/>
            Previous object === Current object: {
              useMemoEnabled ? 'true (when userAge unchanged)' : 'false (always)'
            }
          </div>
          
          <div className="warning-box">
            <strong>Key Points:</strong>
            <ul>
              <li><strong>Without useMemo:</strong> New object created on every render</li>
              <li><strong>With useMemo:</strong> Same object reference when dependencies don't change</li>
              <li><strong>Child Impact:</strong> Prevents unnecessary re-renders of child components</li>
              <li><strong>Performance:</strong> Reduces React's reconciliation work</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🧪 Experiment</h3>
        <div className="controls">
          <label>
            User Age:
            <input
              type="number"
              min="18"
              max="100"
              value={userAge}
              onChange={(e) => setUserAge(Number(e.target.value))}
              className="input"
            />
          </label>
        </div>
        <p>
          Try this: Click "Force Re-render" and watch the child component's render count.
          With useMemo enabled, the child won't re-render unnecessarily!
        </p>
      </div>

      <div className="demo-section">
        <h3>📚 When to Use This Pattern</h3>
        <div className="result-box">
          <strong>Good use cases for object memoization:</strong>
          <ul>
            <li>Complex objects passed to child components</li>
            <li>Objects used as dependencies in other hooks</li>
            <li>Configuration objects that don't change often</li>
            <li>API response transformations</li>
          </ul>
        </div>
        
        <div className="error-box">
          <strong>Avoid memoizing:</strong>
          <ul>
            <li>Simple objects with primitive values only</li>
            <li>Objects that change on every render anyway</li>
            <li>Objects only used once in the same component</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ReferenceEquality;
