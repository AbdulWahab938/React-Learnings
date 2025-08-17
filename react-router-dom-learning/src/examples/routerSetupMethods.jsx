// Alternative Router Setup Methods

import { 
  BrowserRouter, 
  Routes, 
  Route, 
  createBrowserRouter,
  createRoutesFromElements 
} from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../components/Home'
import About from '../components/About'
import Contact from '../components/Contact'
import User from '../components/User'
import Github from '../components/Github'
import { githubInfoLoader } from '../loaders/githubLoader'

// Method 1: Using createBrowserRouter (Recommended - Current Implementation)
const router1 = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "user/:userid", element: <User /> },
      { 
        path: "github", 
        element: <Github />,
        loader: githubInfoLoader 
      }
    ]
  }
])

// Method 2: Using createRoutesFromElements (JSX Syntax)
const router2 = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="user/:userid" element={<User />} />
      <Route 
        path="github" 
        element={<Github />} 
        loader={githubInfoLoader} 
      />
    </Route>
  )
)

/* 
Key Differences:

Method 1 (createBrowserRouter with Array):
- ✅ Supports data loading with loaders
- ✅ Better error handling
- ✅ Supports future features
- ✅ Better performance optimizations
- ✅ Type-safe with TypeScript
- ✅ More concise for complex routing

Method 2 (createBrowserRouter + createRoutesFromElements):
- ✅ JSX syntax familiar to React developers
- ✅ Supports loaders and actions
- ✅ Good migration path from legacy BrowserRouter
- ✅ More readable for developers familiar with JSX
- ✅ Same performance as Method 1

Recommendation: Use Method 1 for new projects, Method 2 if you prefer JSX syntax
*/

export { router1, router2 }
