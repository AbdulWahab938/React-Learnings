import React, { useState, useMemo, useRef } from 'react';
import { fibonacci, measureExecutionTime } from '../utils/performanceUtils';

function PerformanceComparison() {
  const [fibNumber, setFibNumber] = useState(35);
  const [renderCount, setRenderCount] = useState(0);
  const [measurements, setMeasurements] = useState([]);
  
  const measurementHistory = useRef([]);

  // Force re-render for testing
  const forceRerender = () => {
    setRenderCount(prev => prev + 1);
  };

  // Without useMemo - calculates every render
  const withoutMemoStart = performance.now();
  const resultWithoutMemo = fibonacci(fibNumber);
  const withoutMemoEnd = performance.now();
  const timeWithoutMemo = (withoutMemoEnd - withoutMemoStart).toFixed(3);

  // With useMemo - only calculates when fibNumber changes
  const resultWithMemo = useMemo(() => {
    const start = performance.now();
    const result = fibonacci(fibNumber);
    const end = performance.now();
    const time = (end - start).toFixed(3);
    
    // Track measurement
    measurementHistory.current.push({
      fibNumber,
      withMemo: time,
      timestamp: Date.now()
    });
    
    console.log(`🧮 useMemo calculation: ${time}ms`);
    return { result, time };
  }, [fibNumber]);

  // Log the performance difference
  console.log(`📊 Performance comparison:
    - Without useMemo: ${timeWithoutMemo}ms (runs every render)
    - With useMemo: ${resultWithMemo.time}ms (cached result)`);

  // Calculate performance savings
  const performanceSavings = measurements.length > 0 
    ? (parseFloat(timeWithoutMemo) - parseFloat(resultWithMemo.time)).toFixed(3)
    : '0.000';

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h2>📊 Performance Comparison: With vs Without useMemo</h2>
        <p className="demo-description">
          This demo runs the same Fibonacci calculation with and without useMemo 
          to show the real performance impact. Open DevTools Console for detailed logs.
        </p>
      </div>

      <div className="demo-section">
        <h3>Test Controls</h3>
        <div className="controls">
          <label>
            Fibonacci Number:
            <input
              type="range"
              min="30"
              max="42"
              value={fibNumber}
              onChange={(e) => setFibNumber(Number(e.target.value))}
              className="input"
            />
            {fibNumber}
          </label>
          <button 
            className="btn btn-primary"
            onClick={forceRerender}
          >
            Force Re-render (Test: {renderCount})
          </button>
        </div>
      </div>

      <div className="comparison-grid">
        <div className="demo-section">
          <h3>❌ WITHOUT useMemo</h3>
          <div className="result-box">
            <strong>Result:</strong> {resultWithoutMemo}<br/>
            <strong>Execution Time:</strong> {timeWithoutMemo}ms<br/>
            <strong>Status:</strong> <span style={{color: 'red'}}>Calculates every render</span>
          </div>
          
          <div className="code-block">
{`// Runs on EVERY component render
const result = fibonacci(${fibNumber});
// Time: ${timeWithoutMemo}ms

// This calculation blocks the main thread
// and runs even when fibNumber hasn't changed!`}
          </div>

          <div className="error-box">
            <strong>Problems:</strong>
            <ul>
              <li>🐌 Calculation runs on every render</li>
              <li>🔥 Blocks main thread unnecessarily</li>
              <li>⚡ Poor performance with frequent re-renders</li>
              <li>💸 Wastes computational resources</li>
            </ul>
          </div>
        </div>

        <div className="demo-section">
          <h3>✅ WITH useMemo</h3>
          <div className="result-box">
            <strong>Result:</strong> {resultWithMemo.result}<br/>
            <strong>Execution Time:</strong> {resultWithMemo.time}ms<br/>
            <strong>Status:</strong> <span style={{color: 'green'}}>Cached until fibNumber changes</span>
          </div>
          
          <div className="code-block">
{`// Only runs when fibNumber changes
const result = useMemo(() => {
  return fibonacci(${fibNumber});
}, [${fibNumber}]); // ← Dependencies

// Time: ${resultWithMemo.time}ms (when calculated)
// Subsequent renders: 0ms (cached)`}
          </div>

          <div className="result-box">
            <strong>Benefits:</strong>
            <ul>
              <li>🚀 Only calculates when needed</li>
              <li>🎯 Returns cached result instantly</li>
              <li>⚡ Improves overall performance</li>
              <li>💚 Efficient resource usage</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>⚡ Performance Impact</h3>
        <div className="performance-info">
          <strong>Current Performance Difference:</strong><br/>
          Without useMemo: {timeWithoutMemo}ms<br/>
          With useMemo: {resultWithMemo.time}ms (or 0ms if cached)<br/>
          <strong>Savings per render: {performanceSavings}ms</strong>
        </div>
        
        <div className="warning-box">
          <strong>Real-World Impact:</strong>
          <p>
            In a component that re-renders frequently (e.g., on user input, state changes, 
            or parent re-renders), this performance difference adds up quickly:
          </p>
          <ul>
            <li><strong>10 re-renders:</strong> {(parseFloat(performanceSavings) * 10).toFixed(1)}ms saved</li>
            <li><strong>100 re-renders:</strong> {(parseFloat(performanceSavings) * 100).toFixed(1)}ms saved</li>
            <li><strong>1000 re-renders:</strong> {(parseFloat(performanceSavings) * 1000).toFixed(1)}ms saved</li>
          </ul>
        </div>
      </div>

      <div className="demo-section">
        <h3>🧪 Interactive Test</h3>
        <p>
          <strong>Try this experiment:</strong>
        </p>
        <ol>
          <li>Keep the Fibonacci number the same</li>
          <li>Click "Force Re-render" multiple times</li>
          <li>Watch the Console logs - you'll see:</li>
          <ul>
            <li>❌ Without useMemo: New calculation every time</li>
            <li>✅ With useMemo: No new calculation (cached result)</li>
          </ul>
        </ol>
        
        <div className="result-box">
          <strong>💡 Pro Tip:</strong> Open React DevTools Profiler to see the actual 
          component render performance and how useMemo affects the overall app performance.
        </div>
      </div>

      <div className="demo-section">
        <h3>📈 When Performance Matters Most</h3>
        <div className="comparison-grid">
          <div className="result-box">
            <strong>High Impact Scenarios:</strong>
            <ul>
              <li>Complex calculations (like this Fibonacci)</li>
              <li>Large data processing</li>
              <li>Frequent re-renders</li>
              <li>Mobile devices (limited CPU)</li>
              <li>Components with many children</li>
            </ul>
          </div>
          
          <div className="warning-box">
            <strong>Lower Impact Scenarios:</strong>
            <ul>
              <li>Simple arithmetic operations</li>
              <li>Infrequent re-renders</li>
              <li>Dependencies that change often</li>
              <li>Components that rarely mount</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceComparison;
