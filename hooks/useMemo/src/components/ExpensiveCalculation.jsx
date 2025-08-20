import { useState, useMemo } from 'react';
import { fibonacci, expensiveCalculation, measureExecutionTime, renderCounter } from '../utils/performanceUtils';

function ExpensiveCalculation() {
  const [fibNumber, setFibNumber] = useState(35);
  const [calcNumber, setCalcNumber] = useState(100);
  const [useMemoPref, setUseMemoPref] = useState(true);
  const [rerenderTrigger, setRerenderTrigger] = useState(0);

  const renderCount = renderCounter.increment('ExpensiveCalculation');

  // Memoized Fibonacci calculation
  const memoizedFibResult = useMemo(() => {
    console.log('🧮 Calculating Fibonacci with useMemo...');
    return measureExecutionTime(() => fibonacci(fibNumber), `Fibonacci(${fibNumber}) with useMemo`);
  }, [fibNumber]);

  // Non-memoized Fibonacci calculation
  const nonMemoizedFibResult = (() => {
    if (!useMemoPref) {
      console.log('🧮 Calculating Fibonacci WITHOUT useMemo...');
      return measureExecutionTime(() => fibonacci(fibNumber), `Fibonacci(${fibNumber}) without useMemo`);
    }
    return null;
  })();

  // Memoized expensive calculation
  const memoizedCalcResult = useMemo(() => {
    console.log('💻 Running expensive calculation with useMemo...');
    return measureExecutionTime(() => expensiveCalculation(calcNumber), `ExpensiveCalc(${calcNumber}) with useMemo`);
  }, [calcNumber]);

  // Non-memoized expensive calculation
  const nonMemoizedCalcResult = (() => {
    if (!useMemoPref) {
      console.log('💻 Running expensive calculation WITHOUT useMemo...');
      return measureExecutionTime(() => expensiveCalculation(calcNumber), `ExpensiveCalc(${calcNumber}) without useMemo`);
    }
    return null;
  })();

  const activeResults = useMemoPref 
    ? { fib: memoizedFibResult, calc: memoizedCalcResult }
    : { fib: nonMemoizedFibResult, calc: nonMemoizedCalcResult };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h2>🧮 Expensive Calculation with useMemo</h2>
        <p className="demo-description">
          This demo shows how useMemo prevents expensive calculations from running on every render.
          Toggle between memoized and non-memoized versions to see the performance difference.
        </p>
      </div>

      <div className="demo-section">
        <h3>Performance Settings</h3>
        <div className="controls">
          <label>
            <input
              type="radio"
              checked={useMemoPref}
              onChange={() => setUseMemoPref(true)}
            />
            Use useMemo (Optimized)
          </label>
          <label>
            <input
              type="radio"
              checked={!useMemoPref}
              onChange={() => setUseMemoPref(false)}
            />
            Without useMemo (Recalculates every render)
          </label>
          <button 
            className="btn btn-secondary"
            onClick={() => setRerenderTrigger(prev => prev + 1)}
          >
            Force Re-render
          </button>
        </div>
        <div className="performance-info">
          Component rendered: {renderCount} times | Re-render trigger: {rerenderTrigger}
        </div>
      </div>

      <div className="demo-section">
        <h3>Fibonacci Calculation</h3>
        <div className="controls">
          <label>
            Fibonacci Number:
            <input
              type="range"
              min="30"
              max="40"
              value={fibNumber}
              onChange={(e) => setFibNumber(Number(e.target.value))}
              className="input"
            />
            {fibNumber}
          </label>
        </div>
        
        {activeResults.fib && (
          <div className="result-box">
            <strong>Result:</strong> {activeResults.fib.result}<br/>
            <strong>Execution Time:</strong> {activeResults.fib.time}ms
            {useMemoPref && (
              <div className="performance-info">
                ✅ This calculation only runs when fibNumber changes!
              </div>
            )}
          </div>
        )}

        <div className="code-block">
{useMemoPref ? `// With useMemo - only recalculates when fibNumber changes
const memoizedFibResult = useMemo(() => {
  return fibonacci(${fibNumber});
}, [fibNumber]); // ← Dependencies array` : `// Without useMemo - calculates on EVERY render
const fibResult = fibonacci(${fibNumber}); // ← Runs every time!`}
        </div>
      </div>

      <div className="demo-section">
        <h3>Complex Mathematical Calculation</h3>
        <div className="controls">
          <label>
            Calculation Intensity:
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={calcNumber}
              onChange={(e) => setCalcNumber(Number(e.target.value))}
              className="input"
            />
            {calcNumber}
          </label>
        </div>
        
        {activeResults.calc && (
          <div className="result-box">
            <strong>Result:</strong> {activeResults.calc.result}<br/>
            <strong>Execution Time:</strong> {activeResults.calc.time}ms
            {useMemoPref && (
              <div className="performance-info">
                ✅ This calculation is cached until calcNumber changes!
              </div>
            )}
          </div>
        )}

        <div className="code-block">
{useMemoPref ? `// With useMemo - cached result
const memoizedResult = useMemo(() => {
  return expensiveCalculation(${calcNumber});
}, [calcNumber]); // ← Only recalculates when needed` : `// Without useMemo - runs every render
const result = expensiveCalculation(${calcNumber}); // ← Very expensive!`}
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Key Learning Points</h3>
        <div className="warning-box">
          <strong>Performance Impact:</strong>
          <ul>
            <li><strong>With useMemo:</strong> Calculations run only when dependencies change</li>
            <li><strong>Without useMemo:</strong> Calculations run on EVERY component render</li>
            <li><strong>Trade-off:</strong> Memory usage vs computation time</li>
          </ul>
        </div>
        
        <div className="performance-info">
          <strong>💡 Debugging Tips:</strong><br/>
          • Open DevTools Console to see when calculations run<br/>
          • Try clicking "Force Re-render" to see the difference<br/>
          • Change the input values to trigger recalculation
        </div>
      </div>
    </div>
  );
}

export default ExpensiveCalculation;
