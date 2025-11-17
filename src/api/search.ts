// Получаем URL бэкенда из переменной окружения
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

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

export interface SearchResponse {
  results: Place[]
}

export interface ErrorResponse {
  error: string
}

/**
 * Поиск лучших мест через API бэкенда
 */
export async function searchPlaces(params: SearchParams): Promise<Place[]> {
  try {
    const response = await fetch(`${API_URL}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      // Обрабатываем ошибки HTTP
      const errorData: ErrorResponse = await response.json()
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data: SearchResponse = await response.json()
    return data.results
  } catch (error) {
    // Если это ошибка сети или другая проблема
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Произошла неизвестная ошибка при поиске мест')
  }
}
