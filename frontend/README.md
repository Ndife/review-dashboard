# Flex Living Reviews Dashboard

A modern, responsive dashboard for managers to assess property performance based on guest reviews, integrated with a mock Hostaway API.

## 🚀 Getting Started

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Run the development server**:

    ```bash
    npm run dev
    ```

3.  **Open the application**:
    Navigate to [http://localhost:3000](http://localhost:3000).

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, `clsx`, `tailwind-merge`
- **Icons**: Lucide React
- **Font**: Geist (Google Fonts)
- **State/Data Fetching**: React Hooks, `fetch` API

## 💡 Key Design & Logic Decisions

- **Modular Architecture**: Components are split into atomic units (`ui`, `property`, `dashboard`, `layout`) for reusability and maintainability.
- **Client/Server Separation**:
  - **API Routes**: Backend logic (normalization, filtering, sorting) resides in `app/api/reviews`, mimicking a real microservice.
  - **Client**: Uses a custom `api-client` abstraction to communicate with the backend.
- **Optimistic UI**: The dashboard implements optimistic updates for review visibility toggling to ensure the interface feels snappy.
- **Custom Design System**: Instead of heavy UI libraries, I implemented lightweight, custom-styled components (`Dropdown`, `Button`) using Tailwind for pixel-perfect control and performance.
- **Responsive Design**: A unified layout that adapts gracefully from desktop to mobile, with a custom mobile drawer navigation.

## 🔌 API Behaviors

The application interacts with a local API at `/api/reviews`.

- **GET /api/reviews**: Fetches normalized reviews from the mock Hostaway data.
  - **Normalization**: Raw Hostaway fields are mapped to a clean internal `Review` schema.
  - **Params**: Supports `page`, `rating` (filtering), `sort` (date/rating asc/desc), and `publicOnly` (for the public property page).
- **PATCH /api/reviews/[id]**: Updates the visibility status (`isPublic`) of a specific review.

## 🔍 Google Reviews Integration (Findings)

As part of the scope, I explored integrating Google Reviews.

- **Feasibility**: It is feasible using the **Google Places API (New)**.
- **Implementation Strategy**:
  1.  **Backend Proxy**: To protect the API Key, a server-side route (e.g., `/api/reviews/google`) would be required.
  2.  **Matching**: We would need to match each "listing" in our system to a specific Google `place_id`.
  3.  **Quotas & Cost**: The Places API is billed per request. Caching strategies (Redis/Vercel KV) would be essential to minimize costs and latency.
- **Decision**: For this assessment, I focused on a robust Hostaway implementation as the primary source of truth, but the `api-client` pattern allows for easy extension to support `getGoogleReviews` in the future.
