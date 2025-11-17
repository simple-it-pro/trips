import { Place } from '../App'

interface ResultsListProps {
  results: Place[]
}

function ResultsList({ results }: ResultsListProps) {
  return (
    <div className="mt-12 animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8 text-center">
        🎯 Top Recommendations
      </h2>

      <div className="space-y-6">
        {results.map((place, index) => (
          <div
            key={place.id}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border-l-[6px] transform hover:scale-[1.01] group"
            style={{
              borderLeftColor:
                index === 0 ? '#10b981' :
                index === 1 ? '#3b82f6' :
                '#8b5cf6'
            }}
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
              <div className="flex-1 w-full">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl sm:text-5xl drop-shadow-md transform group-hover:scale-110 transition-transform">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {place.name}
                  </h3>
                </div>

                <p className="text-slate-600 mb-4 flex items-center gap-2 text-base">
                  <span className="text-xl">📍</span>
                  <span>{place.address}</span>
                </p>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-xl">
                    <span className="text-yellow-500 text-xl">⭐</span>
                    <span className="font-bold text-slate-800 text-lg">
                      {place.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-xl">
                    <span className="text-xl">💬</span>
                    <span className="text-slate-700 font-semibold">
                      {place.reviewCount.toLocaleString()} reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="flex sm:flex-col items-center justify-center gap-3 sm:gap-2 w-full sm:w-auto bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-4 rounded-2xl">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {place.confidence}%
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                    Confidence
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence Progress Bar */}
            <div className="mt-6">
              <div className="w-full bg-gradient-to-r from-slate-100 to-slate-200 rounded-full h-3 shadow-inner overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-500 shadow-sm"
                  style={{
                    width: `${place.confidence}%`,
                    background:
                      place.confidence >= 90
                        ? 'linear-gradient(to right, #10b981, #059669)'
                        : place.confidence >= 70
                        ? 'linear-gradient(to right, #3b82f6, #2563eb)'
                        : 'linear-gradient(to right, #f59e0b, #d97706)'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-2xl shadow-lg backdrop-blur-sm">
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          <strong className="text-blue-700 flex items-center gap-2 mb-2">
            <span className="text-xl">💡</span>
            How our service works:
          </strong>
          We analyze the relationship between ratings and review counts. A place with a 4.8 rating and 500 reviews is more reliable than one with a 5.0 rating but only 5 reviews.
        </p>
      </div>
    </div>
  )
}

export default ResultsList
