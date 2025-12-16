# Flex Living Reviews Dashboard

**Developer Assessment Submission**

A full-stack solution for managing property reviews. It features a modern Manager Dashboard, a public Property Listing page, and a robust Backend service integrated with Hostaway (mocked).

[**🚀 View Live Demo**](https://review-dashboard-tscm.vercel.app/)

> **⚠️ Note on Cold Start**: The backend is hosted on Render's free tier. To mitigate sleep inactivity (after 15 mins), a **GitHub Action** is configured to ping the service every 14 minutes. If reviews don't load immediately, please wait a minute as the service wakes up, or run the project locally.

---

## 🚀 Local Setup Instructions

### 1. Prerequisites

- Node.js (v18+)
- Docker (for PostgreSQL)

### 2. Start the Database

Spin up the PostgreSQL container using the provided docker-compose file:

```bash
docker compose up -d postgres
```

### 3. Start the Backend

The backend handles data fetching, normalization, and persistence.

```bash
cd backend
npm install
npm run db:migrate  # (Optional: ensures schema is applied)
npm run seed        # (Seeds local DB with Hostaway data)
npm run start:dev
```

_Server running at: `http://localhost:3001`_

### 4. Start the Frontend

The frontend provides the dashboard and public listing UI.

```bash
cd frontend
npm install
npm run dev
```

_App running at: `http://localhost:3000`_

---

## 🛠 Tech Stack

### Frontend (`/frontend`)

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, `clsx`, `tailwind-merge` (Custom design system, no heavy UI libraries)
- **State**: React Hooks, Optimistic UI updates
- **Icons**: Lucide React

### Backend (`/backend`)

- **Framework**: NestJS (Modular, Scalable)
- **Database**: PostgreSQL
- **ORM**: Prisma (Type-safe database access)
- **Pattern**: Controller-Service-Repository

---

## 💡 Key Design & Logic Decisions

### 1. Architecture: Why a Separate Backend?

While this could be built with Next.js API routes, I implemented a standalone **NestJS Backend** to demonstrate a Senior Full Stack approach. This is critical for:

- **Security**: API keys (Hostaway, Google) are never exposed to the client; the backend acts as a secure proxy.
- **Persistence**: A real database (PostgreSQL) is required to persist the "select/deselect" visibility state of reviews.
- **Data Normalization**: The backend standardizes raw data from different sources (Hostaway, and potentially Google in the future) into a clean, consistent schema before it reaches the frontend.
- **Scalability**: The `HostawayService` shows how to build systems that can swap from "mock mode" to "production" without touching frontend code.

### 2. Product Decision: Filtering Strategy

For the Manager Dashboard, I prioritized **Rating** and **Time** over Category or Channel filtering.

- **Rationale**: The core user story is validating quality. Managers need to quickly find low-rated reviews (to address issues) or recent reviews (to spot trends).
- **Categories**: Since categories are nested (e.g., Cleanliness, Communication), filtering by them is complex and often less actionable than simply reading a low-rated review.
- **Channel**: The provided mock JSON data did not include a 'channel' field (e.g., Airbnb, Booking.com), so I excluded this filter as there was no data to support it.

### 3. Data Interpretation: Guest Feedback

The sample data provided `host-to-guest` reviews, but I prioritized displaying **`guest-to-host`** reviews.

- **Logic**: A "Reviews Dashboard" is primarily for monitoring guest feedback to improve service. Displaying only outbound reviews written by the host would miss the core value proposition. I inferred that if `host-to-guest` exists, the API supports `guest-to-host`, and built the system to reflect this more valuable use case.

### 4. Component Atomicity

The frontend is structured with atomic components (`ui/Button`, `ui/Dropdown`) rather than generic HTML. This ensures design consistency (padding, colors, interaction states) across the dashboard and public pages.

---

## 🔌 API Behaviors

The system revolves around two core endpoints in the Backend:

### `GET /reviews`

Fetches reviews with server-side pagination, filtering, and sorting.

- **Query Params**:
  - `rating`: Filter reviews with a score >= `N`.
  - `sort`: `date_asc`, `date_desc`, `rating_asc`, `rating_desc`.
  - `publicOnly`: If `true`, returns only reviews marked as public (for the property page).
- **Fallback Logic**: The `HostawayService` attempts to call the external API first. If it fails (or keys are missing), it seamlessly falls back to a local mock file (`hostaway-reviews.json`), ensuring the app always works for the reviewer.

### `PATCH /reviews/:id`

Updates the `isPublic` status of a review.

- **Behavior**: Direct database update via Prisma.

---

## 🔍 Google Reviews Integration (Findings)

**Requirement**: Explore fetching reviews from Google.

**Feasibility**: ✅ Feasible via **Google Places API (New)**.

**Implementation Strategy**:

1.  **Linking**: We must store a `google_place_id` for each Property in our database.
2.  **Fetching**: Use the details endpoint `https://places.googleapis.com/v1/places/{placeId}` with field mask `reviews`.
3.  **Challenges**:
    - **Quotas**: The Places API is expensive and rate-limited.
    - **Staleness**: Google reviews don't update instantly.
4.  **Recommendation**: Implement a nightly cron job in the NestJS backend to sync Google Reviews into our Postgres `Review` table, normalizing them to match the Hostaway schema (Scale 1-5 -> Scale 1-10). This avoids hitting the Google API on every page load.

---

## 🔮 Future Improvements (Production Readiness)

If this were a real production application, the following would be immediate next steps:

1.  **Authentication & Authorization**: Currently, the dashboard is open. I would implement **NextAuth.js** (frontend) and **Passport.js/JWT Guards** (backend) to restrict access to `POST`/`PATCH` endpoints.
2.  **E2E Testing**: Add Cypress or Playwright tests to validate the full "View Listing -> Visit Dashboard -> Hide Review -> Verify Listing" flow.
3.  **SWR/React Query**: Replace `useEffect` fetching with a dedicated data-fetching library for better caching and revalidation.

---

## 📦 Deployment

This project is deployed using a modern serverless/containerized stack:

- **Frontend**: Vercel (Next.js)
- **Backend**: Render (Docker Container)
- **Database**: Neon (Serverless PostgreSQL)

### Backend (Render)

The backend includes a production-ready `Dockerfile`. You can deploy it to any container hosting platform (Render, Railway, AWS ECS, DigitalOcean App Platform).

**Keep-Alive Strategy:**
To prevent Render's free tier from sleeping, a GitHub Action (`.github/workflows/keep-alive.yml`) runs every 14 minutes to ping the backend health endpoint. This ensures the dashboard is always responsive.

**Build & Run Locally:**

```bash
cd backend
# Build the image
docker build -t flex-backend .
# Run the container (mapping port 3001)
docker run -p 3001:3001 --env-file .env flex-backend
```

### Frontend (Vercel)

The frontend is optimized for Vercel.

1.  Push repo to GitHub.
2.  Import project in Vercel.
3.  Set `Root Directory` to `frontend`.
4.  Add environment variables (e.g., `NEXT_PUBLIC_API_URL`).
5.  Deploy!
