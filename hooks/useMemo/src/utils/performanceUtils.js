// Performance measurement utilities for useMemo demonstrations

export const measureExecutionTime = (fn, label = 'Operation') => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  const time = (end - start).toFixed(3);
  
  console.log(`${label}: ${time}ms`);
  return { result, time };
};

export const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

export const expensiveCalculation = (num) => {
  console.log('🔥 Expensive calculation running...');
  let result = 0;
  for (let i = 0; i < num * 100000; i++) {
    result += Math.random() * Math.sin(i) * Math.cos(i);
  }
  return result.toFixed(2);
};

export const filterAndSortData = (data, searchTerm, sortBy = 'name') => {
  console.log('🔥 Filtering and sorting data...');
  
  return data
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      return a[sortBy].localeCompare(b[sortBy]);
    });
};

export const calculateStatistics = (numbers) => {
  console.log('🔥 Calculating statistics...');
  
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const avg = sum / numbers.length;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  const sorted = [...numbers].sort((a, b) => a - b);
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];

  return { sum, avg, min, max, median, count: numbers.length };
};

export const generateLargeDataset = (size = 1000) => {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Food', 'Beauty'];
  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Amazon', 'Sony', 'HP'];
  
  return Array.from({ length: size }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    brand: brands[Math.floor(Math.random() * brands.length)],
    price: Math.floor(Math.random() * 1000) + 10,
    rating: (Math.random() * 4 + 1).toFixed(1),
    inStock: Math.random() > 0.2,
    description: `This is a description for product ${index + 1}`
  }));
};

export class RenderCounter {
  constructor() {
    this.counts = new Map();
  }

  increment(componentName) {
    const current = this.counts.get(componentName) || 0;
    this.counts.set(componentName, current + 1);
    return current + 1;
  }

  get(componentName) {
    return this.counts.get(componentName) || 0;
  }

  reset(componentName) {
    this.counts.set(componentName, 0);
  }

  resetAll() {
    this.counts.clear();
  }
}

export const renderCounter = new RenderCounter();
