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
      alert('Пожалуйста, введите адрес')
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
          alert('Не удалось получить вашу геолокацию. Пожалуйста, введите адрес вручную.')
          console.error(error)
        }
      )
    } else {
      alert('Геолокация не поддерживается вашим браузером')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Локация */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            📍 Ваша локация
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Введите адрес или используйте геолокацию"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
              disabled={isLoading}
              title="Использовать мою текущую локацию"
            >
              📡
            </button>
          </div>
        </div>

        {/* Радиус */}
        <div>
          <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-2">
            🎯 Радиус поиска: {radius} км
          </label>
          <input
            type="range"
            id="radius"
            min="1"
            max="20"
            step="1"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            disabled={isLoading}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 км</span>
            <span>10 км</span>
            <span>20 км</span>
          </div>
        </div>

        {/* Минимальный рейтинг */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="useMinRating"
              checked={useMinRating}
              onChange={(e) => setUseMinRating(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              disabled={isLoading}
            />
            <label htmlFor="useMinRating" className="text-sm font-medium text-gray-700">
              ⭐ Задать минимальный рейтинг
            </label>
          </div>

          {useMinRating && (
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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

        {/* Кнопка поиска */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Ищу лучшие места...
            </span>
          ) : (
            '🔍 Найти лучшие места'
          )}
        </button>
      </form>
    </div>
  )
}

export default SearchForm
