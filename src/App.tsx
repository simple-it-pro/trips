import { useState } from 'react'
import SearchForm from './components/SearchForm'
import ResultsList from './components/ResultsList'
import { searchPlaces, type SearchParams, type Place } from './api/search'

// Экспортируем типы для использования в других компонентах
export type { SearchParams, Place }

function App() {
  const [results, setResults] = useState<Place[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true)
    setError(null)
    setResults([]) // Очищаем предыдущие результаты

    try {
      console.log('Поиск мест с параметрами:', params)

      // Отправляем запрос к API бэкенда
      const places = await searchPlaces(params)

      setResults(places)

      // Если результатов нет, показываем сообщение
      if (places.length === 0) {
        setError('По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.')
      }
    } catch (err) {
      // Обрабатываем ошибки от API
      const errorMessage = err instanceof Error
        ? err.message
        : 'Произошла ошибка при поиске. Проверьте подключение к интернету и попробуйте ещё раз.'

      setError(errorMessage)
      console.error('Ошибка поиска:', err)
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
