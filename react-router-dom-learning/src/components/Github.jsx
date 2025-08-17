import React from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
  const data = useLoaderData()
  
  return (
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              GitHub Profile Loader Demo
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              This page demonstrates the useLoader hook vs useEffect performance difference.
              Data is loaded before the component renders, providing a better user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Card */}
            <div className="bg-white border rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    className="w-20 h-20 rounded-full border-4 border-orange-200"
                    src={data?.avatar_url}
                    alt={data?.name || data?.login}
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{data?.name || data?.login}</h2>
                    <p className="text-gray-600">@{data?.login}</p>
                    <p className="text-sm text-gray-500">{data?.location || 'Location not specified'}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  {data?.bio || 'No bio available'}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{data?.public_repos}</div>
                    <div className="text-sm text-gray-500">Repositories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{data?.followers}</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{data?.following}</div>
                    <div className="text-sm text-gray-500">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{data?.public_gists}</div>
                    <div className="text-sm text-gray-500">Gists</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {data?.company && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {data.company}
                    </span>
                  )}
                  {data?.blog && (
                    <a
                      href={data.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full hover:bg-green-200 transition-colors"
                    >
                      Website
                    </a>
                  )}
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                    Joined {new Date(data?.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <a
                  href={data?.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View GitHub Profile
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Technical Explanation */}
            <div className="space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-orange-900 mb-4">useLoader vs useEffect</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2">✅ useLoader (Current Implementation)</h4>
                    <ul className="space-y-1 text-orange-700">
                      <li>• Data loads before component renders</li>
                      <li>• No loading state needed in component</li>
                      <li>• Better user experience (no flash of loading)</li>
                      <li>• Automatic error handling</li>
                      <li>• Can be cached by React Router</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">❌ useEffect Pattern</h4>
                    <ul className="space-y-1 text-red-700">
                      <li>• Component renders first, then data loads</li>
                      <li>• Requires loading state management</li>
                      <li>• User sees loading spinner/skeleton</li>
                      <li>• Manual error handling required</li>
                      <li>• Potential for race conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Implementation Details</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Loader Function:</span>
                    <code className="block bg-gray-200 p-2 rounded mt-1 text-xs">
                      githubInfoLoader()
                    </code>
                  </div>
                  <div>
                    <span className="font-medium">API Endpoint:</span>
                    <code className="block bg-gray-200 p-2 rounded mt-1 text-xs">
                      https://api.github.com/users/hiteshchoudhary
                    </code>
                  </div>
                  <div>
                    <span className="font-medium">Hook Used:</span>
                    <code className="block bg-gray-200 p-2 rounded mt-1 text-xs">
                      const data = useLoaderData()
                    </code>
                  </div>
                  <div>
                    <span className="font-medium">Route Config:</span>
                    <code className="block bg-gray-200 p-2 rounded mt-1 text-xs">
                      loader: githubInfoLoader
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Performance Benefits</h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>• <strong>Faster perceived performance:</strong> No loading state visible to user</p>
                  <p>• <strong>Better SEO:</strong> Server-side rendering compatible</p>
                  <p>• <strong>Reduced complexity:</strong> No need to manage loading/error states</p>
                  <p>• <strong>Parallel loading:</strong> Multiple loaders can run simultaneously</p>
                  <p>• <strong>Built-in caching:</strong> React Router can cache loader results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Github
