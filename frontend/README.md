# CuBIT Dynamics - Landing Page

A fully responsive, professional landing page for CuBIT Dynamics, a high-tech company specializing in electronics, software, and AI-driven solutions.

## 🚀 Features

- **Modern Design**: Inspired by Apple's premium aesthetic with clean, minimal styling
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Powered by Framer Motion for professional interactions
- **Glassmorphism UI**: Modern transparent/translucent design elements
- **Interactive Components**: Hover effects, scroll animations, and smooth transitions
- **Form Validation**: Complete contact form with validation and success/error states
- **Performance Optimized**: Built with Vite for fast development and optimized builds

## 🛠️ Technology Stack

- **React 19.1.1** - Latest version with modern hooks and features
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for animations
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast build tool and development server
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixes

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx      # Sticky navigation with glassmorphism
│   ├── Hero.jsx        # Full-screen hero with animated background
│   ├── About.jsx       # Two-column about section
│   ├── Products.jsx    # Product grid with hover effects
│   ├── Reviews.jsx     # Client testimonials carousel
│   ├── Contact.jsx     # Contact form with validation
│   └── Footer.jsx      # Company footer with links
├── assets/
│   ├── images/         # Image assets
│   └── videos/         # Video assets
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles and custom utilities
```

## 🎨 Design Features

### Navigation
- Glassmorphism/translucent sticky navbar
- Smooth background fade on scroll
- Responsive mobile menu with hamburger icon
- Smooth scroll to sections

### Hero Section
- Full-screen animated background with particles
- Bold typography with fade-in animations
- Call-to-action buttons with hover effects
- Scroll indicator animation

### About Section
- Two-column responsive layout
- Animated text and media on scroll
- Company story and expertise highlights
- Interactive statistics display

### Products Section
- Grid layout with 4 featured products
- Hover animations and gradient overlays
- Icon integration and feature lists
- Smooth entrance animations

### Reviews Section
- Desktop grid and mobile carousel
- Star ratings and client avatars
- Smooth transitions and testimonials
- Company statistics section

### Contact Form
- Real-time validation
- Loading states and success/error handling
- Accessible form design
- Contact information display

### Footer
- Newsletter subscription
- Social media links
- Company information and links
- Professional layout with animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎯 Customization

### Colors
The project uses a blue-focused color palette. To customize:
- Primary: `blue-600` (#2563eb)
- Secondary: `gray-900` (#111827)
- Accent: Various blue shades

### Typography
- Primary font: Inter (Google Fonts)
- Fallback: system-ui, -apple-system, sans-serif

### Animations
- Powered by Framer Motion
- Scroll-triggered animations using `useInView`
- Hover effects and micro-interactions

## 📱 Responsive Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is proprietary and confidential. All rights reserved by CuBIT Dynamics.

## 🤝 Support

For questions or support, please contact:
- Email: hello@cubitdynamics.com
- Phone: +1 (555) 123-4567

---

**Built with ❤️ by the CuBIT Dynamics team**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
