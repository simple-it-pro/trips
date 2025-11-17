import { Place } from '../App'

interface ResultsListProps {
  results: Place[]
}

function ResultsList({ results }: ResultsListProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🎯 Топ рекомендаций для вас
      </h2>

      <div className="space-y-4">
        {results.map((place, index) => (
          <div
            key={place.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-l-4"
            style={{
              borderLeftColor:
                index === 0 ? '#10b981' :
                index === 1 ? '#3b82f6' :
                '#6366f1'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800">
                    {place.name}
                  </h3>
                </div>

                <p className="text-gray-600 mb-3">
                  📍 {place.address}
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold text-gray-700">
                      {place.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span>💬</span>
                    <span className="text-gray-600">
                      {place.reviewCount} отзывов
                    </span>
                  </div>
                </div>
              </div>

              {/* Уровень уверенности AI */}
              <div className="ml-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {place.confidence}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    уверенность AI
                  </div>
                </div>
              </div>
            </div>

            {/* Прогресс-бар уверенности */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${place.confidence}%`,
                    backgroundColor:
                      place.confidence >= 90 ? '#10b981' :
                      place.confidence >= 70 ? '#3b82f6' :
                      '#f59e0b'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>💡 Как работает наш сервис:</strong> Мы анализируем соотношение рейтинга и количества отзывов.
          Место с рейтингом 4.8 и 500 отзывами надёжнее, чем место с рейтингом 5.0, но всего 5 отзывами.
        </p>
      </div>
    </div>
  )
}

export default ResultsList
