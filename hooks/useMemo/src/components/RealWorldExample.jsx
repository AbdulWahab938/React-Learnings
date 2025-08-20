import React, { useState, useMemo } from 'react';
import { generateLargeDataset, filterAndSortData, calculateStatistics } from '../utils/performanceUtils';

function RealWorldExample() {
  const [products] = useState(() => generateLargeDataset(2000)); // Generate 2000 products
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);

  console.log('🔄 RealWorldExample component rendered');

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return ['all', ...cats];
  }, [products]);

  // Filter products - with useMemo
  const filteredProductsWithMemo = useMemo(() => {
    console.log('🔥 Filtering products WITH useMemo...');
    const start = performance.now();
    
    let filtered = products;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a[sortBy].localeCompare(b[sortBy]);
    });
    
    const end = performance.now();
    console.log(`✅ Filtering completed in ${(end - start).toFixed(2)}ms`);
    
    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  // Filter products - without useMemo
  const filteredProductsWithoutMemo = (() => {
    if (useMemoEnabled) return null;
    
    console.log('🔥 Filtering products WITHOUT useMemo...');
    const start = performance.now();
    
    let filtered = products;
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    filtered.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a[sortBy].localeCompare(b[sortBy]);
    });
    
    const end = performance.now();
    console.log(`❌ Filtering completed in ${(end - start).toFixed(2)}ms`);
    
    return filtered;
  })();

  const activeProducts = useMemoEnabled ? filteredProductsWithMemo : filteredProductsWithoutMemo;

  // Calculate statistics with useMemo
  const statistics = useMemo(() => {
    console.log('📊 Calculating statistics...');
    const prices = activeProducts.map(p => p.price);
    const ratings = activeProducts.map(p => parseFloat(p.rating));
    
    return {
      total: activeProducts.length,
      avgPrice: (prices.reduce((sum, price) => sum + price, 0) / prices.length).toFixed(2),
      avgRating: (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1),
      maxPrice: Math.max(...prices),
      minPrice: Math.min(...prices),
      inStockCount: activeProducts.filter(p => p.inStock).length
    };
  }, [activeProducts]);

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h2>🛒 Real-World Example: E-commerce Product Filter</h2>
        <p className="demo-description">
          This example demonstrates useMemo with a realistic scenario: filtering and sorting 
          a large product dataset. Without useMemo, filtering runs on every render!
        </p>
      </div>

      <div className="demo-section">
        <h3>⚙️ Performance Settings</h3>
        <div className="controls">
          <label>
            <input
              type="radio"
              checked={useMemoEnabled}
              onChange={() => setUseMemoEnabled(true)}
            />
            ✅ With useMemo (Efficient)
          </label>
          <label>
            <input
              type="radio"
              checked={!useMemoEnabled}
              onChange={() => setUseMemoEnabled(false)}
            />
            ❌ Without useMemo (Re-filters every render)
          </label>
        </div>
      </div>

      <div className="demo-section">
        <h3>🔍 Product Filters</h3>
        <div className="controls">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            style={{ minWidth: '200px' }}
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
            <option value="brand">Sort by Brand</option>
          </select>
        </div>
        
        <div className="controls">
          <label>
            Price Range: ${priceRange[0]} - ${priceRange[1]}
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="input"
            />
          </label>
        </div>
      </div>

      <div className="demo-section">
        <h3>📊 Results Statistics</h3>
        <div className="comparison-grid">
          <div className="result-box">
            <strong>📈 Current Results:</strong><br/>
            Total Products: {statistics.total}<br/>
            Average Price: ${statistics.avgPrice}<br/>
            Average Rating: {statistics.avgRating}⭐<br/>
            Price Range: ${statistics.minPrice} - ${statistics.maxPrice}<br/>
            In Stock: {statistics.inStockCount}
          </div>
          
          <div className="performance-info">
            <strong>🚀 Performance Status:</strong><br/>
            Dataset Size: {products.length.toLocaleString()} products<br/>
            Filtering Method: {useMemoEnabled ? 'Memoized' : 'Non-memoized'}<br/>
            Status: {useMemoEnabled ? '✅ Optimized' : '⚠️ Recalculates every render'}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Products ({activeProducts.length} found)</h3>
        <div style={{ 
          maxHeight: '300px', 
          overflowY: 'auto', 
          border: '1px solid #ddd', 
          borderRadius: '5px',
          padding: '10px'
        }}>
          {activeProducts.slice(0, 20).map(product => (
            <div key={product.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px',
              borderBottom: '1px solid #eee',
              fontSize: '14px'
            }}>
              <div>
                <strong>{product.name}</strong> - {product.category}<br/>
                <small>{product.brand} | {product.rating}⭐ | {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}</small>
              </div>
              <div style={{ fontWeight: 'bold', color: '#667eea' }}>
                ${product.price}
              </div>
            </div>
          ))}
          {activeProducts.length > 20 && (
            <div style={{ textAlign: 'center', padding: '10px', color: '#666' }}>
              ... and {activeProducts.length - 20} more products
            </div>
          )}
        </div>
      </div>

      <div className="demo-section">
        <h3>🎭 Performance Impact Demo</h3>
        <div className="warning-box">
          <strong>Try this experiment:</strong>
          <ol>
            <li>Type in the search box while watching the Console</li>
            <li>Change filters and see when calculations run</li>
            <li>Toggle between "With useMemo" and "Without useMemo"</li>
            <li>Notice the difference in performance logs</li>
          </ol>
        </div>
        
        <div className="code-block">
{useMemoEnabled ? `// With useMemo - only filters when dependencies change
const filteredProducts = useMemo(() => {
  return products
    .filter(/* search, category, price filters */)
    .sort(/* by selected criteria */);
}, [products, searchTerm, selectedCategory, priceRange, sortBy]);

// ✅ Efficient: Only runs when filters actually change` : `// Without useMemo - filters on EVERY render
const filteredProducts = products
  .filter(/* search, category, price filters */)
  .sort(/* by selected criteria */);

// ❌ Inefficient: Runs on every component render`}
        </div>
      </div>

      <div className="demo-section">
        <h3>🏭 Real-World Applications</h3>
        <div className="result-box">
          <strong>This pattern is perfect for:</strong>
          <ul>
            <li><strong>E-commerce:</strong> Product filtering and search</li>
            <li><strong>Data Tables:</strong> Sorting and filtering large datasets</li>
            <li><strong>Analytics:</strong> Dashboard calculations</li>
            <li><strong>Social Media:</strong> Feed filtering and sorting</li>
            <li><strong>File Managers:</strong> File listing and search</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RealWorldExample;
