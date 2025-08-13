# CuBIT Dynamics - Admin Dashboard

A comprehensive admin dashboard system for managing the CuBIT Dynamics website content, built with React (frontend) and Node.js + Express + MongoDB (backend).

## Features

### Admin Dashboard
- **Hero Section Management**: Customize main title, subtitle, background video, and button texts
- **About Section Management**: Edit main heading, sub-heading, and description paragraphs  
- **Products Management**: Add, edit, delete, and toggle product visibility
- **Services Management**: Manage service offerings with icons and descriptions
- **Reviews Management**: Handle customer testimonials and ratings
- **Contact Information**: Update contact details and social links

### Authentication
- Secure admin login with JWT tokens
- Password change functionality
- Session management

## Tech Stack

### Frontend
- React 19.1.1
- Vite (build tool)
- React Router DOM (routing)
- Axios (API calls)
- React Hot Toast (notifications)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Lucide React (icons)

### Backend  
- Node.js
- Express.js (ES modules)
- MongoDB with Mongoose
- JWT authentication
- bcryptjs (password hashing)
- Express Validator (input validation)
- CORS, Helmet (security)
- Rate limiting

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy and edit .env file
cp .env.example .env
```

Edit `.env` file with your settings:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cubit_dynamics
JWT_SECRET=your_super_secure_jwt_secret_key_here
ADMIN_EMAIL=admin@cubitdynamics.com
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
```

4. Start MongoDB service (if using local MongoDB)

5. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

### Accessing the Admin Dashboard

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173/admin/login`
3. Use default credentials:
   - Email: `admin@cubitdynamics.com`
   - Password: `admin123`

### Admin Dashboard Features

#### Hero Section (`/admin/hero`)
- Edit main title and subtitle
- Change background video URL
- Customize button texts and links
- Real-time preview

#### About Section (`/admin/about`)
- Modify main heading and sub-heading
- Edit description paragraphs
- Live preview of changes

#### Products Management (`/admin/products`)
- Add new products with images and descriptions
- Edit existing products
- Toggle product visibility
- Delete products
- Reorder products

#### Services Management (`/admin/services`)
- Create service offerings
- Add icons and descriptions
- Manage feature lists
- Toggle service visibility

#### Reviews Management (`/admin/reviews`)
- Add customer testimonials
- Set ratings (1-5 stars)
- Include customer details and company
- Manage review visibility

#### Contact Information (`/admin/contact`)
- Update contact details
- Modify social media links
- Edit contact form information

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `POST /api/auth/change-password` - Change password

### Content Management
- `GET /api/hero` - Get hero section data
- `PUT /api/hero` - Update hero section (Protected)
- `GET /api/about` - Get about section data
- `PUT /api/about` - Update about section (Protected)
- `GET /api/products` - Get all active products
- `GET /api/products/admin` - Get all products (Protected)
- `POST /api/products` - Create product (Protected)
- `PUT /api/products/:id` - Update product (Protected)
- `DELETE /api/products/:id` - Delete product (Protected)
- `PUT /api/products/:id/toggle` - Toggle product status (Protected)

Similar endpoints exist for services, reviews, and contact.

## Default Data

The system automatically creates default data on first run:
- Default admin user (credentials in .env)
- Default hero section content
- Default about section content

## Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Request rate limiting
- CORS protection
- Input validation and sanitization
- Helmet.js security headers

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with hot reload
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

## Database Schema

### Collections
- `heroes` - Hero section content
- `abouts` - About section content  
- `products` - Product information
- `services` - Service offerings
- `reviews` - Customer testimonials
- `contacts` - Contact information
- `admins` - Admin users

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file
   - Verify database permissions

2. **CORS Errors**
   - Check FRONTEND_URL in backend .env
   - Ensure frontend and backend URLs match

3. **Authentication Issues**
   - Clear localStorage and login again
   - Check JWT_SECRET configuration
   - Verify token expiration

4. **Port Conflicts**
   - Change PORT in backend .env
   - Update API_BASE_URL in frontend

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - see LICENSE file for details
