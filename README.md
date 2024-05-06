## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployed on Vercel

Check out live project (https://weekday-assignment-wheat.vercel.app/).

**Weekday - Job Search Platform Assignment Readme**

## Features

### Job Cards

- Each job listing is displayed as a card containing the following information:
  - Job title
  - Company name
  - Location
  - Job description (limited with an option to expand)
  - Experience required
  - Apply button/link

### Filters

- Users can refine job listings based on the following criteria:
  - Minimum experience
  - Company name
  - Location
  - Remote/on-site
  - Tech stack
  - Role
  - Minimum base pay

### Infinite Scroll

- Implemented infinite scroll to load additional job listings automatically as the user scrolls down the page. No need for a "Load More" button.

### Responsive Design (Optional)

- The platform is designed to be responsive, ensuring optimal viewing and interaction across various devices and screen sizes, including mobile devices.

## Implementation Details

### Technologies Used

- **Frontend:** React.js, Redux, CSS, Material UI
- **Data Fetching:** Tanstack React Query for efficient data fetching and caching.

### Folder Structure

- `src/`
  - `components/`: Contains reusable UI components.
  - `pages/`: Contains main page components (e.g., Home, Search).
  - `styles/`: Contains CSS or styling-related files.
  - `utils/`: Contains utility functions.
  - `hooks/`: Contains custom hooks functions.
  - `theme/`: Contains mui theme.
- `public/`: Contains static assets like images or favicons.

## Getting Started

1. Clone the repository: `git clone [repository-url]`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open your browser and visit `http://localhost:3000`
