import React from 'react'

export default function About() {
  return (
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-8 rounded-2xl">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white text-6xl font-bold mb-4">
                  R
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">React Router</h3>
                <p className="text-gray-600">Declarative routing for React applications</p>
              </div>
            </div>
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              React Router DOM Learning Project
            </h2>
            <p className="mt-6 text-gray-600">
              This project demonstrates all the key concepts of React Router DOM including:
            </p>
            <div className="mt-6 space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900">Browser Router Setup</h3>
                <p className="text-sm text-gray-600">
                  Learn how to set up createBrowserRouter for client-side routing
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900">Outlet Component</h3>
                <p className="text-sm text-gray-600">
                  Understand how Outlet works for nested routing patterns
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900">useParams Hook</h3>
                <p className="text-sm text-gray-600">
                  Extract dynamic parameters from the URL for dynamic routes
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900">useLoader Hook</h3>
                <p className="text-sm text-gray-600">
                  Performance optimization by loading data before component render
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900">Navigation Components</h3>
                <p className="text-sm text-gray-600">
                  Difference between Link and NavLink for navigation
                </p>
              </div>
            </div>
            <p className="mt-6 text-gray-600">
              Built with Vite for fast development and Tailwind CSS for styling.
              This project follows modern React patterns and best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
