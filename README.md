# SAPTRAJ INDUSTRIES - MERN Stack Integration

A modern industrial fabrication company website with full-stack MongoDB integration, featuring a public frontend, admin panel, and RESTful API backend.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)
- **MongoDB Integration**: Full Mongoose ODM integration with proper schema validation
- **RESTful APIs**: Complete CRUD operations for Products, Projects, Inquiries, and Contacts
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **CORS Configuration**: Secure cross-origin resource sharing
- **Environment Variables**: Secure configuration management
- **Data Seeding**: Initial data population script

### Frontend (React + Vite + Tailwind)
- **Real-time Data**: Live data fetching from MongoDB backend
- **Search & Filter**: Dynamic product search and category filtering
- **Loading States**: Professional loading indicators and error handling
- **Responsive Design**: Mobile-first responsive layout
- **Modern UI**: Tailwind CSS with custom dark theme

### Admin Panel (React + Vite)
- **Full CRUD Management**: Complete product, project, and inquiry management
- **Real-time Updates**: Live data synchronization with backend
- **Professional Dashboard**: Statistics and analytics
- **Error Handling**: Comprehensive error states and user feedback

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas or local MongoDB instance
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Saptraj-Industries
```

### 2. Backend Setup
```bash
cd backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and other credentials

# Seed initial data (optional)
npm run seed

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

### 4. Admin Panel Setup
```bash
cd admin
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Security
JWT_SECRET=your_super_secret_key

# Server
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=SAPTRAJ INDUSTRIES
VITE_APP_DESCRIPTION=Leading Industrial Fabrication and Manufacturing Solutions

# Development
VITE_NODE_ENV=development
```

### Admin (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Admin Panel
VITE_ADMIN_NAME=SAPTRAJ INDUSTRIES ADMIN
VITE_ADMIN_DESCRIPTION=Administrative Panel for SAPTRAJ INDUSTRIES

# Development
VITE_NODE_ENV=development
```

## 🗄️ Database Schema

### Products
- **name**: String (required)
- **category**: String (enum: Laser Cutting, CNC Bending, etc.)
- **description**: String
- **specifications**: Object (material, thickness, capacity, etc.)
- **images**: Array of Strings
- **status**: String (Active, Inactive, Discontinued)
- **timestamps**: Automatic

### Projects
- **title**: String (required)
- **client**: String (required)
- **industry**: String (enum: automotive, textile, power, etc.)
- **description**: String (required)
- **technologies**: Array of Strings
- **duration**: String
- **value**: String
- **images**: Array of Strings
- **status**: String (completed, in-progress, planning, on-hold)
- **date**: Date
- **timestamps**: Automatic

### Inquiries
- **name**: String (required)
- **company**: String
- **email**: String (required, validated)
- **phone**: String
- **requirement**: String (required)
- **materialType**: String
- **quantity**: String
- **message**: String (required)
- **status**: String (New, In Progress, Completed, Cancelled)
- **date**: Date
- **timestamps**: Automatic

### Contacts
- **name**: String (required)
- **email**: String (required, validated)
- **phone**: String
- **company**: String
- **subject**: String (required)
- **message**: String (required)
- **status**: String (New, In Progress, Completed, Closed)
- **date**: Date
- **timestamps**: Automatic

## 🚀 Development Workflow

### 1. Start Backend
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

### 2. Start Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

### 3. Start Admin Panel
```bash
cd admin
npm run dev
```
Admin runs on: `http://localhost:5174`

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination, search, filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/categories` - Get all categories

### Projects
- `GET /api/projects` - Get all projects (with pagination, search, filters)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/industries` - Get all industries
- `GET /api/projects/stats` - Get project statistics

### Inquiries
- `GET /api/inquiries` - Get all inquiries (with pagination, search, filters)
- `GET /api/inquiries/:id` - Get inquiry by ID
- `POST /api/inquiries` - Create new inquiry
- `PUT /api/inquiries/:id/status` - Update inquiry status
- `DELETE /api/inquiries/:id` - Delete inquiry
- `GET /api/inquiries/stats` - Get inquiry statistics

### Contacts
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin only)
- `PUT /api/contacts/:id/status` - Update contact status
- `DELETE /api/contacts/:id` - Delete contact

### Health Check
- `GET /health` - API health status

## 🔒 Security Features

- **CORS Protection**: Configured for specific origins
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Secure error responses
- **Environment Variables**: Sensitive data protection
- **JWT Ready**: Authentication infrastructure in place

## 🎯 Key Integrations Completed

✅ **MongoDB Connection**: Full database integration with Mongoose
✅ **API Services**: Professional API service layers for frontend and admin
✅ **Real-time Data**: Live data fetching and updates
✅ **Error Handling**: Comprehensive error states and user feedback
✅ **Loading States**: Professional loading indicators
✅ **Environment Config**: Secure configuration management
✅ **Data Seeding**: Initial data population script
✅ **CORS Setup**: Secure cross-origin configuration

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Admin
cd admin
npm run build

# Backend
cd backend
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://yourdomain.com
ADMIN_URL=https://admin.yourdomain.com
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check MONGODB_URI in .env
   - Ensure MongoDB Atlas IP whitelist includes your IP
   - Verify network connectivity

2. **CORS Errors**
   - Check allowed origins in backend CORS configuration
   - Verify frontend API_URL environment variable

3. **API Not Responding**
   - Ensure backend is running on correct port
   - Check for port conflicts
   - Verify MongoDB connection

4. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

## 📞 Support

For technical support or questions:
- Check the console logs for detailed error messages
- Verify all environment variables are properly set
- Ensure MongoDB is accessible and running
- Check network connectivity between frontend and backend

---

**Built with ❤️ using modern MERN stack technologies**
