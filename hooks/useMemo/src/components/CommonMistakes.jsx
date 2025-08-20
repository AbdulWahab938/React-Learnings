import React, { useState, useMemo, useCallback } from 'react';

function CommonMistakes() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const [selectedMistake, setSelectedMistake] = useState('unnecessaryMemo');

  console.log('🔄 CommonMistakes component rendered');

  // MISTAKE 1: Memoizing primitive values that don't need it
  const unnecessaryMemo = useMemo(() => count + 1, [count]);
  const normalCalculation = count + 1;

  // MISTAKE 2: Missing dependencies
  const brokenMemo = useMemo(() => {
    return count * 2 + input.length; // input is missing from dependencies
  }, [count]); // 🚨 Missing 'input' dependency!

  const fixedMemo = useMemo(() => {
    return count * 2 + input.length;
  }, [count, input]); // ✅ All dependencies included

  // MISTAKE 3: Creating new objects/arrays as dependencies
  const objectInDeps = useMemo(() => {
    return `Count is ${count}`;
  }, [{ value: count }]); // 🚨 New object created each time!

  const fixedObjectDeps = useMemo(() => {
    return `Count is ${count}`;
  }, [count]); // ✅ Primitive dependency

  // MISTAKE 4: Over-memoization - every simple calculation
  const overMemoized1 = useMemo(() => 'Hello', []); // 🚨 Unnecessary
  const overMemoized2 = useMemo(() => true, []); // 🚨 Unnecessary
  const overMemoized3 = useMemo(() => count > 5, [count]); // 🚨 Simple comparison

  // MISTAKE 5: Memoizing callbacks without useCallback
  const expensiveCallback = useMemo(() => {
    return () => {
      console.log('Expensive operation');
    };
  }, []); // 🚨 Should use useCallback instead

  const properCallback = useCallback(() => {
    console.log('Expensive operation');
  }, []); // ✅ Correct for callbacks

  // MISTAKE 6: Not understanding when memoization helps
  const ComponentA = () => {
    const [localState, setLocalState] = useState(0);
    
    // This runs every render regardless of useMemo
    // because the entire component re-renders
    const memoValue = useMemo(() => {
      console.log('This still runs every render!');
      return 'computed value';
    }, []);
    
    return (
      <div>
        <button onClick={() => setLocalState(s => s + 1)}>
          Local state: {localState}
        </button>
        <div>Memo value: {memoValue}</div>
      </div>
    );
  };

  // Demonstration functions
  const demos = {
    unnecessaryMemo: () => (
      <div className="mistake-demo">
        <h4>❌ Mistake: Memoizing Simple Calculations</h4>
        <div className="code-block">
{`// 🚨 WRONG - Unnecessary memoization
const simpleValue = useMemo(() => count + 1, [count]);

// ✅ CORRECT - Direct calculation
const simpleValue = count + 1;`}
        </div>
        <div className="comparison-grid">
          <div className="result-box">
            <strong>With useMemo:</strong> {unnecessaryMemo}<br/>
            <small>Overhead: Function call + dependency check</small>
          </div>
          <div className="result-box">
            <strong>Without useMemo:</strong> {normalCalculation}<br/>
            <small>Direct calculation (faster)</small>
          </div>
        </div>
        <div className="warning-box">
          <strong>Rule:</strong> Only memoize expensive calculations, not simple arithmetic!
        </div>
      </div>
    ),

    missingDependencies: () => (
      <div className="mistake-demo">
        <h4>❌ Mistake: Missing Dependencies</h4>
        <div className="code-block">
{`// 🚨 WRONG - Missing 'input' dependency
const value = useMemo(() => {
  return count * 2 + input.length;
}, [count]); // Bug: input changes won't update the memo!

// ✅ CORRECT - All dependencies included
const value = useMemo(() => {
  return count * 2 + input.length;
}, [count, input]);`}
        </div>
        <div className="comparison-grid">
          <div className="result-box error">
            <strong>Broken (missing deps):</strong> {brokenMemo}<br/>
            <small>Input: "{input}" (length: {input.length})</small><br/>
            <small>❌ Won't update when input changes!</small>
          </div>
          <div className="result-box success">
            <strong>Fixed (all deps):</strong> {fixedMemo}<br/>
            <small>Input: "{input}" (length: {input.length})</small><br/>
            <small>✅ Updates correctly</small>
          </div>
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type to see the difference..."
          className="input"
        />
        <div className="warning-box">
          <strong>Rule:</strong> Always include ALL values from component scope that are used inside useMemo!
        </div>
      </div>
    ),

    objectDependencies: () => (
      <div className="mistake-demo">
        <h4>❌ Mistake: Creating New Objects as Dependencies</h4>
        <div className="code-block">
{`// 🚨 WRONG - New object created every render
const value = useMemo(() => {
  return \`Count is \${count}\`;
}, [{ value: count }]); // New object reference each time!

// ✅ CORRECT - Primitive dependencies
const value = useMemo(() => {
  return \`Count is \${count}\`;
}, [count]);`}
        </div>
        <div className="comparison-grid">
          <div className="result-box error">
            <strong>Object dependency:</strong> {objectInDeps}<br/>
            <small>❌ Recalculates every render (new object each time)</small>
          </div>
          <div className="result-box success">
            <strong>Primitive dependency:</strong> {fixedObjectDeps}<br/>
            <small>✅ Only recalculates when count changes</small>
          </div>
        </div>
        <div className="warning-box">
          <strong>Rule:</strong> Dependencies should be primitives or stable references!
        </div>
      </div>
    ),

    overMemoization: () => (
      <div className="mistake-demo">
        <h4>❌ Mistake: Over-Memoization</h4>
        <div className="code-block">
{`// 🚨 WRONG - Memoizing constants and simple operations
const greeting = useMemo(() => 'Hello', []);
const isActive = useMemo(() => true, []);
const isLarge = useMemo(() => count > 5, [count]);

// ✅ CORRECT - Direct values
const greeting = 'Hello';
const isActive = true;
const isLarge = count > 5;`}
        </div>
        <div className="result-box error">
          <strong>Over-memoized values:</strong><br/>
          Greeting: {overMemoized1}<br/>
          Is Active: {overMemoized2.toString()}<br/>
          Is Large: {overMemoized3.toString()}<br/>
          <small>❌ Unnecessary overhead for simple values</small>
        </div>
        <div className="warning-box">
          <strong>Rule:</strong> Don't memoize constants, booleans, or simple comparisons!
        </div>
      </div>
    ),

    callbackMistake: () => (
      <div className="mistake-demo">
        <h4>❌ Mistake: Using useMemo for Callbacks</h4>
        <div className="code-block">
{`// 🚨 WRONG - Using useMemo for functions
const callback = useMemo(() => {
  return () => console.log('Click');
}, []);

// ✅ CORRECT - Use useCallback for functions
const callback = useCallback(() => {
  console.log('Click');
}, []);`}
        </div>
        <div className="comparison-grid">
          <div className="result-box error">
            <strong>useMemo for function:</strong><br/>
            <button onClick={expensiveCallback}>Click me (wrong way)</button><br/>
            <small>❌ Confusing and less semantic</small>
          </div>
          <div className="result-box success">
            <strong>useCallback for function:</strong><br/>
            <button onClick={properCallback}>Click me (right way)</button><br/>
            <small>✅ Clear and semantic</small>
          </div>
        </div>
        <div className="warning-box">
          <strong>Rule:</strong> Use useCallback for functions, useMemo for values!
        </div>
      </div>
    ),

    childComponent: () => (
      <div className="mistake-demo">
        <h4>❌ Mistake: Misunderstanding Component Re-renders</h4>
        <div className="code-block">
{`// This useMemo still runs on every render
// because the entire component re-renders!
const ComponentA = () => {
  const [state, setState] = useState(0);
  
  const memoValue = useMemo(() => {
    console.log('Still runs every render!');
    return 'computed value';
  }, []); // Empty deps, but still runs!
  
  return <div>...</div>;
};`}
        </div>
        <div className="result-box">
          <ComponentA />
        </div>
        <div className="warning-box">
          <strong>Key Point:</strong> useMemo prevents recalculation, not re-execution during renders!<br/>
          Use React.memo() to prevent component re-renders.
        </div>
      </div>
    )
  };

  const mistakeOptions = [
    { value: 'unnecessaryMemo', label: '🎯 Unnecessary Memoization' },
    { value: 'missingDependencies', label: '🔗 Missing Dependencies' },
    { value: 'objectDependencies', label: '📦 Object Dependencies' },
    { value: 'overMemoization', label: '🔄 Over-Memoization' },
    { value: 'callbackMistake', label: '🔧 Callback Mistakes' },
    { value: 'childComponent', label: '🧩 Component Re-render Confusion' }
  ];

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h2>⚠️ Common useMemo Mistakes & How to Fix Them</h2>
        <p className="demo-description">
          Learn from common pitfalls! These are real mistakes developers make with useMemo,
          and how to avoid them in your code.
        </p>
      </div>

      <div className="demo-section">
        <h3>🎯 Interactive Controls</h3>
        <div className="controls">
          <button onClick={() => setCount(c => c + 1)} className="button">
            Increment Count: {count}
          </button>
        </div>
      </div>

      <div className="demo-section">
        <h3>📋 Choose a Mistake to Explore</h3>
        <div className="controls">
          {mistakeOptions.map(option => (
            <label key={option.value}>
              <input
                type="radio"
                name="mistake"
                value={option.value}
                checked={selectedMistake === option.value}
                onChange={(e) => setSelectedMistake(e.target.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="demo-section">
        {demos[selectedMistake]()}
      </div>

      <div className="demo-section">
        <h3>✅ Best Practices Summary</h3>
        <div className="result-box">
          <ol>
            <li><strong>Only memoize expensive calculations</strong> - Not simple arithmetic</li>
            <li><strong>Include ALL dependencies</strong> - Use ESLint plugin to catch missing deps</li>
            <li><strong>Use stable references as dependencies</strong> - Avoid creating new objects</li>
            <li><strong>Don't over-memoize</strong> - Not every value needs memoization</li>
            <li><strong>Use useCallback for functions</strong> - More semantic and clear</li>
            <li><strong>Understand when memoization helps</strong> - It prevents recalculation, not re-execution</li>
            <li><strong>Profile your app</strong> - Measure before optimizing</li>
            <li><strong>Consider React.memo</strong> - For preventing component re-renders</li>
          </ol>
        </div>
      </div>

      <div className="demo-section">
        <h3>🔍 Debugging Tips</h3>
        <div className="warning-box">
          <strong>Use these techniques to debug useMemo issues:</strong>
          <ul>
            <li><strong>Add console.logs</strong> inside useMemo to see when it runs</li>
            <li><strong>Use React DevTools Profiler</strong> to measure performance</li>
            <li><strong>Install eslint-plugin-react-hooks</strong> for dependency warnings</li>
            <li><strong>Compare with/without useMemo</strong> in your specific use case</li>
            <li><strong>Use React Strict Mode</strong> to catch issues early</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CommonMistakes;
