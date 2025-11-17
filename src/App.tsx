import { useState } from 'react'
import SearchForm from './components/SearchForm'
import ResultsList from './components/ResultsList'

export interface SearchParams {
  location: string
  radius: number
  minRating?: number
}

export interface Place {
  id: string
  name: string
  rating: number
  reviewCount: number
  address: string
  confidence: number
}

function App() {
  const [results, setResults] = useState<Place[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true)
    setError(null)

    try {
      // TODO: Заменить на реальный API запрос к бэкенду
      // Пока используем заглушку с тестовыми данными
      console.log('Поиск мест с параметрами:', params)
      await new Promise(resolve => setTimeout(resolve, 1500))

      const mockResults: Place[] = [
        {
          id: '1',
          name: 'Кафе "Уют"',
          rating: 4.8,
          reviewCount: 523,
          address: 'ул. Пушкина, 15',
          confidence: 95,
        },
        {
          id: '2',
          name: 'Ресторан "Панорама"',
          rating: 4.7,
          reviewCount: 412,
          address: 'пр. Ленина, 42',
          confidence: 87,
        },
        {
          id: '3',
          name: 'Пиццерия "Италия"',
          rating: 4.6,
          reviewCount: 301,
          address: 'ул. Советская, 8',
          confidence: 79,
        },
      ]

      setResults(mockResults)
    } catch (err) {
      setError('Произошла ошибка при поиске. Попробуйте ещё раз.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            🗺️ Best places analyzer
          </h1>
          <p className="text-lg text-gray-600">
            Умный поиск лучших мест на основе анализа отзывов
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />

          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
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
