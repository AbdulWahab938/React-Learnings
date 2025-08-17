import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
        <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
            <h2 className="text-4xl font-bold sm:text-5xl">
              React Router DOM Learning
              <span className="hidden sm:block text-4xl">Complete Guide</span>
            </h2>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">What you'll learn:</h3>
              <ul className="text-left space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Setting up React Router DOM
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Creating Browser Router
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Using Outlet for nested routing
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  useParams hook for dynamic routes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  useLoader hook vs useEffect performance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Link vs NavLink components
                </li>
              </ul>
            </div>

            <div className="space-x-4">
              <Link
                className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                to="/about"
              >
                Learn More
                <svg
                  fill="white"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className="ml-1"
                >
                  <path d="M12 0c6.623 0 12 5.377 12 12 0 6.623-5.377 12-12 12s-12-5.377-12-12c0-6.623 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm3 5.753l-6.44 5.247 6.44 5.263-.678.737-7.322-6 7.335-6 .665.753z" />
                </svg>
              </Link>
              <Link
                className="inline-flex text-orange-700 items-center px-6 py-3 font-medium border border-orange-700 rounded-lg hover:bg-orange-700 hover:text-white"
                to="/user/123"
              >
                Try Dynamic Route
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full">
          <img
            className="w-96 h-96 object-cover sm:w-full sm:h-full opacity-25"
            src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="React Router"
          />
        </div>
      </aside>

      <div className="grid place-items-center sm:mt-20">
        <img
          className="sm:w-96 w-48"
          src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png"
          alt="React Router Logo"
        />
      </div>

      <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">
        Master React Router DOM with practical examples
      </h1>
    </div>
  )
}
