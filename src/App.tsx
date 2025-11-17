import { useState } from 'react'
import SearchForm from './components/SearchForm'
import ResultsList from './components/ResultsList'
import { searchPlaces, type SearchParams, type Place } from './api/search'

// Export types for use in other components
export type { SearchParams, Place }

function App() {
  const [results, setResults] = useState<Place[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true)
    setError(null)
    setResults([]) // Clear previous results

    try {
      console.log('Searching places with parameters:', params)

      // Send request to backend API
      const places = await searchPlaces(params)

      setResults(places)

      // If no results found, show message
      if (places.length === 0) {
        setError('No places found matching your criteria. Try adjusting your search parameters.')
      }
    } catch (err) {
      // Handle API errors
      const errorMessage = err instanceof Error
        ? err.message
        : 'An error occurred while searching. Please check your internet connection and try again.'

      setError(errorMessage)
      console.error('Search error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-6xl sm:text-7xl drop-shadow-lg">🗺️</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 tracking-tight">
            Best Places Analyzer
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Discover the best places nearby with intelligent review analysis
          </p>
        </header>

        <div className="max-w-5xl mx-auto">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />

          {error && (
            <div className="mt-8 p-5 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl shadow-lg backdrop-blur-sm animate-slide-in">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <p className="flex-1 font-medium">{error}</p>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <ResultsList results={results} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
