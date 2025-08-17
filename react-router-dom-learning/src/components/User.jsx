import React from 'react'
import { useParams } from 'react-router-dom'

export default function User() {
  const { userid } = useParams()
  
  return (
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
            User Profile Page
          </h1>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-bold">
                  {userid ? userid.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              User ID: {userid}
            </h2>
            
            <p className="text-gray-600 mb-6">
              This is a dynamic route demonstrating the useParams hook.
              The user ID is extracted from the URL parameter.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">useParams Hook</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Hook:</span> useParams()</p>
                  <p><span className="font-medium">Parameter:</span> userid</p>
                  <p><span className="font-medium">Value:</span> {userid || 'Not provided'}</p>
                  <p><span className="font-medium">Type:</span> {typeof userid}</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Route Configuration</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Path:</span> /user/:userid</p>
                  <p><span className="font-medium">Current URL:</span> /user/{userid}</p>
                  <p><span className="font-medium">Component:</span> User.jsx</p>
                  <p><span className="font-medium">Dynamic:</span> Yes</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              How useParams Works
            </h3>
            <div className="text-left space-y-3 text-sm text-gray-700">
              <p>
                <span className="font-medium">1. Route Definition:</span> 
                The route is defined with a parameter placeholder: <code className="bg-gray-200 px-2 py-1 rounded">/user/:userid</code>
              </p>
              <p>
                <span className="font-medium">2. URL Matching:</span> 
                When a user visits <code className="bg-gray-200 px-2 py-1 rounded">/user/{userid}</code>, React Router matches the pattern
              </p>
              <p>
                <span className="font-medium">3. Parameter Extraction:</span> 
                The useParams hook extracts the dynamic part and provides it as an object
              </p>
              <p>
                <span className="font-medium">4. Component Access:</span> 
                The component can access the parameter value and use it for rendering or data fetching
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-600">
              Try changing the URL to different user IDs like 
              <code className="bg-gray-200 px-2 py-1 rounded mx-1">/user/456</code> or 
              <code className="bg-gray-200 px-2 py-1 rounded mx-1">/user/john</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
