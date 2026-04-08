# PizzaOps — Tech Company Pizza Management Platform

## Concept & Vision

PizzaOps is a sleek, data-driven pizza shop management dashboard designed for a tech company that operates pizza shops. It combines the analytical precision of a tech company with the warmth of artisan pizza culture. The interface feels like a premium SaaS dashboard meets a cozy pizzeria — clean data visualizations paired with warm, appetizing colors and subtle Italian-inspired design touches.

The experience should feel like the Bloomberg Terminal of pizza management: powerful, information-dense, yet surprisingly delightful to use.

## Design Language

### Aesthetic Direction
Modern tech dashboard with warm pizzeria accents. Think Stripe's clarity meets a wood-fired oven's warmth. Dark mode primary with warm orange/amber highlights that evoke pizza crust and cheese.

### Color Palette
```
--bg-primary: #0f0f12          // Deep charcoal, almost black
--bg-secondary: #1a1a1f        // Slightly lighter panels
--bg-tertiary: #242429          // Cards and elevated surfaces
--accent-primary: #ff6b35       // Pizza orange (crust color)
--accent-secondary: #f7c548     // Warm amber (cheese/heat)
--accent-tertiary: #e85d04       // Deeper orange for hover states
--text-primary: #ffffff         // Pure white headings
--text-secondary: #a1a1aa       // Muted body text
--text-tertiary: #71717a        // Subtle labels
--success: #22c55e              // Fresh green (basil)
--warning: #eab308              // Alert yellow
--error: #ef4444                // Error red
--border: #2a2a32               // Subtle borders
```

### Typography
- **Headings**: `Space Grotesk` — geometric, tech-forward, excellent for numbers
- **Body**: `DM Sans` — clean, highly readable, modern
- **Accent/Data**: `JetBrains Mono` — for metrics, order numbers, prices

### Spatial System
- Base unit: 4px
- Section padding: 24px-32px
- Card padding: 20px
- Component gap: 16px
- Border radius: 12px (cards), 8px (buttons), 6px (inputs)

### Motion Philosophy
- **Page load**: Staggered fade-up (opacity 0→1, translateY 20px→0), 300ms duration, 50ms stagger
- **Hover states**: 150ms ease-out scale(1.02) and shadow lift
- **Data updates**: Number counters animate with spring physics
- **Charts**: Draw-in animation on mount
- **Navigation**: Smooth 200ms transitions between views

### Visual Assets
- **Icons**: Lucide React — consistent stroke width, friendly feel
- **Charts**: Recharts with custom styling matching the palette
- **Decorative**: Subtle pizza slice SVG patterns, dotted grid backgrounds
- **Images**: Warm-toned food photography from Unsplash for shop previews

## Layout & Structure

### Overall Architecture
Single-page dashboard with sidebar navigation. The layout emphasizes data density while maintaining breathing room through strategic use of whitespace and card elevation.

### Page Structure
```
┌─────────────────────────────────────────────────────────────┐
│  Sidebar (240px fixed)  │  Main Content Area               │
│  ┌───────────────────┐  │  ┌─────────────────────────────┐  │
│  │ Logo + Brand      │  │  │ Header: Page Title + Stats  │  │
│  ├───────────────────┤  │  ├─────────────────────────────┤  │
│  │ Navigation        │  │  │                             │  │
│  │ - Dashboard       │  │  │ Content Grid                │  │
│  │ - Orders          │  │  │ (responsive columns)        │  │
│  │ - Menu            │  │  │                             │  │
│  │ - Analytics       │  │  │                             │  │
│  │ - Profile         │  │  │                             │  │
│  │ - Settings        │  │  │                             │  │
│  ├───────────────────┤  │  │                             │  │
│  │ Sign Out          │  │  └─────────────────────────────┘  │
│  └───────────────────┘  │                                   │
└─────────────────────────────────────────────────────────────┘
```

### Visual Pacing
- **Hero stats**: Large, bold numbers with animated counters — immediate impact
- **Chart section**: Visual breathing room, generous padding
- **Data tables**: Denser, utilitarian feel
- **Sidebar**: Quieter, consistent anchor

### Responsive Strategy
- Desktop (1200px+): Full sidebar + 3-4 column grid
- Tablet (768px-1199px): Collapsed sidebar (icons only) + 2 column grid
- Mobile (<768px): Bottom navigation bar + single column stack

## Features & Interactions

### 1. Dashboard (Home)
**Purpose**: At-a-glance operational overview

**Features**:
- **KPI Cards** (4 total):
  - Today's Revenue (animated counter, % change from yesterday)
  - Orders Today (with status breakdown mini-chart)
  - Average Order Value (trend indicator)
  - Active Kitchen Orders (real-time countdown timers)

- **Revenue Chart**: Area chart showing last 7 days, hoverable tooltips
- **Orders by Hour**: Bar chart showing peak hours
- **Recent Orders List**: Last 10 orders with status badges, click to expand

**Interactions**:
- KPI cards pulse subtly when data updates
- Chart tooltips appear on hover with detailed breakdowns
- Order rows expand on click to show line items

### 2. Orders View
**Purpose**: Order management and tracking

**Features**:
- **Order List Table**: 
  - Columns: Order ID, Customer, Phone, Items, Total, Status, Date, Actions
  - Sortable by any column
  - Filterable by status (New, Preparing, Ready, Delivered, Cancelled)
  - Search by order ID or customer name

- **Status Flow**: Visual pipeline showing orders in each stage
- **Order Detail Modal**: Full order breakdown with timeline

**Interactions**:
- Status badges are color-coded with subtle glow
- Clicking status allows quick-change dropdown
- Real-time updates with subtle highlight animation

### 3. Menu Management
**Purpose**: Pizza shop menu CRUD operations

**Features**:
- **Menu Grid**: Card layout of all menu items
  - Photo, name, description, price, category
  - Availability toggle
  - Popularity indicator (order count)

- **Category Filters**: All, Pizzas, Sides, Drinks, Desserts
- **Add/Edit Modal**: Form with image upload, pricing, toppings

**Interactions**:
- Cards lift on hover with shadow
- Quick edit pencil icon appears on hover
- Toggle switch for availability with optimistic UI update
- Modal slides in from right with backdrop blur

### 4. Analytics Dashboard
**Purpose**: Deep-dive business intelligence

**Features**:
- **Date Range Picker**: Today, Last 7 Days, Last 30 Days, Custom
- **Key Metrics Over Time**: Line charts for revenue, orders, AOV
- **Top Items Chart**: Horizontal bar chart of best sellers
- **Customer Insights**: New vs returning, peak times heatmap
- **Export Button**: Download data as CSV

**Interactions**:
- Smooth chart transitions when date range changes
- Hover states reveal precise values
- Export triggers download with loading state

### 5. Profile View
**Purpose**: User account management

**Features**:
- **User Avatar**: Profile photo with edit option
- **Profile Information**: Name, email, phone, location, role, join date
- **Stats Cards**: Total orders, revenue generated, avg rating, active days
- **Recent Activity Feed**: List of recent actions and events
- **Edit Profile Form**: Update personal information

**Interactions**:
- Avatar edit button opens photo upload
- Activity items show type indicators (order, menu, review, schedule)
- Form validation on save

### 6. Settings
**Purpose**: Shop configuration

**Features**:
- **Shop Profile**: Name, address, hours, contact
- **Business Hours**: Visual weekly schedule picker with toggle per day
- **Notification Preferences**: Toggle email/SMS alerts for orders, reports, alerts
- **Theme Toggle**: Light/Dark mode switch (dark default)

## Component Inventory

### Navigation Sidebar
- **Default**: Dark background, icon + text links
- **Hover**: Background lightens, accent color text
- **Active**: Accent background tint, bold text, left border indicator
- **Collapsed**: Icons only with tooltip on hover

### KPI Card
- **Default**: Elevated card with icon, label, large number, trend badge
- **Hover**: Slight lift (translateY -2px), enhanced shadow
- **Loading**: Skeleton pulse animation
- **Error**: Muted with retry icon

### Data Table
- **Default**: Striped rows, sticky header
- **Hover**: Row highlights with accent tint
- **Selected**: Accent left border, slight background tint
- **Empty**: Illustrated empty state with CTA

### Status Badge
- **New**: Blue background (#3b82f6), pulse animation
- **Preparing**: Orange background (#ff6b35), subtle animation
- **Ready**: Green background (#22c55e), checkmark icon
- **Delivered**: Gray background (#6b7280), muted
- **Cancelled**: Red background (#ef4444), strikethrough

### Button
- **Primary**: Accent orange background, white text, 8px radius
- **Hover**: Darker orange, slight scale(1.02)
- **Active**: Even darker, scale(0.98)
- **Disabled**: Muted colors, no pointer
- **Loading**: Spinner replaces text

### Input Field
- **Default**: Dark background, subtle border, placeholder text
- **Focus**: Accent border, subtle glow
- **Error**: Red border, error message below
- **Disabled**: Reduced opacity

### Modal
- **Backdrop**: Black 60% opacity with backdrop-filter blur
- **Container**: Elevated card, slides in from bottom (mobile) or center scale (desktop)
- **Header**: Title + close button
- **Footer**: Action buttons aligned right

### Chart Tooltip
- **Container**: Dark elevated card, small arrow pointer
- **Content**: Label + value pairs, formatted numbers

### Page Loader
- **Loading State**: Centered spinner with loading text
- **Animation**: Rotating circle with accent color

## Technical Approach

### Framework & Build
- **React 18** with Vite for fast development
- **React Router v6** for navigation with lazy loading
- **CSS** with scoped files for styling (no Tailwind)
- **React.lazy()** and **Suspense** for code splitting

### State Management
- React Context for global state (theme, user preferences)
- Local state with useState/useReducer for component state
- Mock data service simulating API calls

### Key Libraries
- `recharts` — Beautiful, React-native charts
- `lucide-react` — Icon library
- `date-fns` — Date formatting and manipulation

### Data Structure

**Order**:
```typescript
{
  id: string,
  customerName: string,
  customerPhone: string,
  items: Array<{ name: string, quantity: number, price: number }>,
  subtotal: number,
  tax: number,
  total: number,
  status: 'new' | 'preparing' | 'ready' | 'delivered' | 'cancelled',
  date: string,
  time: string
}
```

**MenuItem**:
```typescript
{
  id: number,
  name: string,
  description: string,
  price: number,
  category: 'pizza' | 'side' | 'drink' | 'dessert',
  imageUrl: string,
  orders: number
}
```

### File Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.css
│   ├── Login.jsx
│   └── Login.css
├── pages/
│   ├── DashboardPage.jsx
│   ├── DashboardPage.css
│   ├── OrdersPage.jsx
│   ├── MenuPage.jsx
│   ├── AnalyticsPage.jsx
│   ├── SettingsPage.jsx
│   ├── ProfilePage.jsx
│   └── pages.css
├── data/
│   └── mockData.js
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

### Lazy Loading Implementation
All page components are lazy-loaded using React's `lazy()` and `Suspense`:
```jsx
const Dashboard = lazy(() => import('./pages/DashboardPage'))
const Orders = lazy(() => import('./pages/OrdersPage'))
// etc.

<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    // etc.
  </Routes>
</Suspense>
```

This ensures:
- Faster initial page load
- Smaller bundle sizes per route
- Better user experience with loading states
