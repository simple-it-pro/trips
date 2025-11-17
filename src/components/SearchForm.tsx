import { useState } from 'react'
import { SearchParams } from '../App'

interface SearchFormProps {
  onSearch: (params: SearchParams) => void
  isLoading: boolean
}

function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [location, setLocation] = useState('')
  const [radius, setRadius] = useState(5)
  const [minRating, setMinRating] = useState<number | undefined>(undefined)
  const [useMinRating, setUseMinRating] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!location.trim()) {
      alert('Please enter a location')
      return
    }

    onSearch({
      location: location.trim(),
      radius,
      minRating: useMinRating ? minRating : undefined,
    })
  }

  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`${latitude}, ${longitude}`)
        },
        (error) => {
          alert('Unable to get your location. Please enter an address manually.')
          console.error(error)
        }
      )
    } else {
      alert('Geolocation is not supported by your browser')
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Location */}
        <div className="space-y-3">
          <label htmlFor="location" className="block text-sm font-semibold text-slate-700 mb-2">
            📍 Your Location
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter address or use current location"
              className="flex-1 px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              className="px-5 py-4 bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 rounded-xl transition-all disabled:opacity-50 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
              disabled={isLoading}
              title="Use my current location"
            >
              <span className="text-xl">📡</span>
            </button>
          </div>
        </div>

        {/* Search Radius */}
        <div className="space-y-3">
          <label htmlFor="radius" className="block text-sm font-semibold text-slate-700 mb-2">
            🎯 Search Radius: <span className="text-blue-600">{radius} km</span>
          </label>
          <input
            type="range"
            id="radius"
            min="1"
            max="20"
            step="1"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full appearance-none cursor-pointer accent-blue-600 shadow-inner"
            disabled={isLoading}
          />
          <div className="flex justify-between text-xs text-slate-500 font-medium mt-2">
            <span>1 km</span>
            <span>10 km</span>
            <span>20 km</span>
          </div>
        </div>

        {/* Minimum Rating */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-3">
            <input
              type="checkbox"
              id="useMinRating"
              checked={useMinRating}
              onChange={(e) => setUseMinRating(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded-lg focus:ring-blue-500 focus:ring-2 cursor-pointer"
              disabled={isLoading}
            />
            <label htmlFor="useMinRating" className="text-sm font-semibold text-slate-700 cursor-pointer">
              ⭐ Set minimum rating
            </label>
          </div>

          {useMinRating && (
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white shadow-sm hover:shadow-md disabled:opacity-50 font-medium"
              disabled={isLoading}
            >
              <option value={3.0}>3.0+</option>
              <option value={3.5}>3.5+</option>
              <option value={4.0}>4.0+</option>
              <option value={4.5}>4.5+</option>
              <option value={4.8}>4.8+</option>
            </select>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Finding best places...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              🔍 Find Best Places
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

export default SearchForm
