# LinkedIn Analytics Dashboard
[Demo](https://qodex-ai-assessment.vercel.app/)
A modern, comprehensive analytics dashboard for tracking LinkedIn profile performance, content reach, and engagement metrics. Built with Next.js 16, React 19, and Recharts for powerful data visualization.

## 📸 Screenshots

![Screenshot 1](./screenshots/Screenshot%20from%202025-12-15%2022-59-03.png)

![Screenshot 2](./screenshots/Screenshot%20from%202025-12-15%2022-59-08.png)

![Screenshot 3](./screenshots/Screenshot%20from%202025-12-15%2022-59-12.png)

![Screenshot 4](./screenshots/Screenshot%20from%202025-12-15%2022-59-21.png)

![Screenshot 5](./screenshots/Screenshot%20from%202025-12-15%2022-59-24.png)

---

## ✨ Features

### 📊 Overview Dashboard
- **Interactive Metric Cards** - 5 key metrics with sparklines:
  - Total Reach
  - Average Reach per Post
  - Engagement Rate
  - Followers Gained
  - Profile Visits
- **Date Range Selector** - Quick filters (7d/30d/90d) or custom calendar range
- **Theme Toggle** - Seamless light/dark mode with LinkedIn blue accent
- **Responsive Design** - Optimized for desktop and mobile

### 📈 Growth & Reach Analysis
- **Trend Visualization** - Line chart showing post reach over time
- **Rolling Average** - 7-post moving average overlay
- **Performance Indicators**:
  - Median Reach
  - Best Performing Post
  - Worst Performing Post
  - Volatility Score
- **Post Detail Drawer** - Click any data point for comprehensive analytics:
  - Reach timeline (24-hour breakdown)
  - Engagement breakdown (likes, comments, shares)
  - Follower growth impact
  - Strategy insights for strategic posts

### 🎯 Content Performance
- **Sortable Table** - Click headers to sort by:
  - Reach
  - Engagement Rate
  - Followers Gained
- **Smart Filtering**:
  - Media type (text, image, video, carousel)
  - Strategy posts vs. non-strategy
- **Visual Indicators**:
  - Top 3 posts highlighted in green
  - Bottom 3 posts highlighted in red
- **Pagination** - Adjustable page size (5/10/All)
- **Performance Distribution** - Bar chart showing low/average/high performing content

### 💡 Strategy Impact
- **Before/After Comparison** - 4 key metrics showing improvement:
  - Average Reach per Post
  - Engagement Rate
  - Follower Gain per Post
  - Non-Follower Reach %
- **Visual Comparison**:
  - Side-by-side progress bars
  - Percentage lift badges
  - Comparison bar chart
- **Interactive Controls**:
  - Time window selector (7d/30d/90d/all)
  - Strategy ON/OFF toggle
  - Attribution explanation tooltips
- **Value Statement** - Clear ROI demonstration for strategic content

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qodex.ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Docker Deployment (Alternative)

Run the application in a Docker container:

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t linkedin-dashboard .
docker run -p 3000:3000 linkedin-dashboard
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **React**: 19.2.1
- **TypeScript**: 5
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts**: [Recharts 2.15.4](https://recharts.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Theme Management**: [next-themes 0.4.6](https://github.com/pacocoursey/next-themes)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Utilities**: [date-fns](https://date-fns.org/)

## 📁 Project Structure

```
qodex.ai/
├── app/
│   ├── page.tsx              # Main dashboard page
│   ├── layout.tsx            # Root layout with theme provider
│   └── globals.css           # Global styles & CSS variables
├── components/
│   ├── ContentPerformanceSection.tsx
│   ├── DateRangeSelector.tsx
│   ├── GrowthReachSection.tsx
│   ├── OverviewMetricCard.tsx
│   ├── PostDetailDrawer.tsx
│   ├── StrategyImpactSection.tsx
│   ├── ThemeToggle.tsx
│   └── ui/                   # Core UI components only
│       ├── badge.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── popover.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       └── tooltip.tsx
├── hooks/
│   ├── use-dashboard.ts      # Dashboard state management
│   └── use-mobile.ts
├── lib/
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
├── Dockerfile                # Docker configuration
└── docker-compose.yml        # Docker Compose setup
```

## 🎨 Color Scheme

- **Primary**: LinkedIn Blue (#0A66C2)
- **Light Theme**: Slate colors (50-900)
- **Dark Theme**: Zinc colors (50-950)
- **Accents**: Emerald (success), Red (warning)

## 🔧 Configuration

### Theme Customization

Edit `app/globals.css` to customize colors:

```css
:root {
  --linkedin-blue: #0A66C2;
  --linkedin-blue-dark: #004182;
  --linkedin-blue-light: #378FE9;
}
```

### Mock Data

Currently using mock data in components. To integrate real LinkedIn API:
1. Replace mock data arrays in each section component
2. Add API routes in `app/api/`
3. Use `useSWR` or React Query for data fetching

## 📊 Available Metrics

- Total Reach
- Average Reach
- Engagement Rate
- Followers Gained
- Profile Visits
- Post Performance (individual)
- Rolling Averages
- Volatility Scores
- Media Type Distribution
- Strategy Post Effectiveness

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspired by modern analytics platforms
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Note**: This is a demo dashboard with mock data. For production use, integrate with LinkedIn's official API or your data source.
