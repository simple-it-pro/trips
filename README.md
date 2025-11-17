# 🗺️ Best Places Analyzer

A web application for finding the best places based on intelligent review and rating analysis.

## 🎯 What is it?

This application helps you find the best places (cafes, restaurants, attractions) near you. Unlike regular search engines, our service analyzes not only ratings but also the number of reviews - filtering out places with high ratings but few reviews.

### How does it work?

1. **Enter your address** or use your current location
2. **Select search radius** (1-20 km)
3. **Optionally set** minimum rating
4. **Our service analyzes** all places within the radius and returns the top 3 most reliable options

## 🚀 Quick Start

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) version 18 or higher installed.

### Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This command will install all necessary libraries for the application.

### Configure Backend Connection

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Open `.env` and specify your backend URL:

```env
VITE_API_URL=https://your-backend-url.railway.app
```

If the backend is running locally, use:

```env
VITE_API_URL=http://localhost:8000
```

### Run the Application Locally

After installing dependencies and configuring `.env`, start the application:

```bash
npm run dev
```

The application will open in your browser at: [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
trips/
├── src/
│   ├── api/
│   │   └── search.ts        # Backend API client
│   ├── components/          # UI components
│   │   ├── SearchForm.tsx   # Search form
│   │   └── ResultsList.tsx  # Results list
│   ├── App.tsx              # Main component
│   ├── main.tsx             # Entry point
│   └── index.css            # Styles
├── public/                  # Static files
├── .env.example             # Environment variables example
├── index.html               # HTML template
└── package.json             # Project dependencies
```

## 🛠️ Technologies

- **React** - UI library
- **TypeScript** - Typed JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework

## 📝 Scripts

- `npm run dev` - Run in development mode
- `npm run build` - Build for production
- `npm run preview` - Preview built application

## 🔗 Backend Integration

The application is connected to a backend API for place search. The backend is in a separate `trips-be` repository.

### API Endpoint

**POST** `/api/search`

**Request:**
```json
{
  "location": "New York, Times Square",
  "radius": 5,
  "minRating": 4.0
}
```

**Response:**
```json
{
  "results": [
    {
      "id": "place_id_123",
      "name": "Cafe Pushkin",
      "rating": 4.8,
      "reviewCount": 523,
      "address": "Tverskoy Boulevard, 26A",
      "confidence": 95
    }
  ]
}
```

### Environment Variables

- `VITE_API_URL` - Backend URL (required)

## 🌐 Deployment

### Vercel (Recommended)

1. Sign up at [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Vercel will automatically detect settings
4. **Important!** Add environment variable in Vercel:
   - Go to Settings → Environment Variables
   - Add `VITE_API_URL` with your backend URL
   - Example: `https://trips-be-xxx.railway.app`
5. Rebuild the project (Deployments → Redeploy)

### Other Platforms

- **Netlify** - Similar to Vercel
- **GitHub Pages** - For static sites
- **Railway** - For full-stack applications

## 🤝 Contributing

This project is in MVP stage. All suggestions and improvements are welcome!

## 📄 License

MIT

---

Made with ❤️ for travelers
