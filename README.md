# 🐾 PAW-love - Pet Adoption Platform

> **A Beautiful, Modern, and Engaging Pet Adoption Platform**  
> Connect loving homes with adorable pets who need a family. Every adoption creates a story of love, companionship, and joy.

![PAW-love Platform](https://img.shields.io/badge/PAW--love-Pet%20Adoption%20Platform-orange?style=for-the-badge&logo=heart)
![React](https://img.shields.io/badge/React-18.0+-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.0+-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green?style=for-the-badge&logo=mongodb)

## ✨ Features

### 🎬 **Revolutionary Video Hero Section**
- **Full-screen video background** with high-quality pet footage
- **Smooth fade-in animations** for all text elements
- **Interactive pet illustrations** with hover effects
- **Floating decorative elements** (paws, hearts, stars)
- **Mobile-optimized fallback** for devices that don't support video

### 🐕 **Dynamic Pet Cards**
- **Hover overlay** with pet personality and quick actions
- **Image zoom effect** on hover with smooth transitions
- **Quick View modal** with detailed information
- **Favorite button** with heart animation
- **Species badges** with proper icons
- **Smooth card lifting** animations

### 🔍 **Advanced Search & Browse**
- **Intelligent search** by name, breed, and characteristics
- **Advanced filtering** by species, gender, size, and location
- **Collapsible filter panel** with smooth animations
- **Loading skeleton** instead of simple spinner
- **Responsive grid layout** that adapts to all screen sizes

### 🏠 **Shelter Dashboard**
- **Beautiful statistics cards** with animated icons
- **Pet management** with image upload support
- **Application tracking** with status management
- **Modern form design** with validation
- **Image preview** and management system

### 🎨 **Modern UI/UX**
- **Framer Motion animations** for smooth transitions
- **React Icons** for consistent pet-themed iconography
- **Glassmorphism effects** with backdrop blur
- **Micro-interactions** and hover states
- **Loading states** and error handling
- **Fully responsive** design for all devices

## 🚀 Tech Stack

### Frontend
- **React 18** with modern hooks and context
- **Vite** for fast development and building
- **Framer Motion** for smooth animations
- **React Icons** for beautiful iconography
- **CSS3** with custom properties and animations

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** authentication with HTTP-only cookies
- **bcryptjs** for password hashing
- **dotenv** for environment management

### Development Tools
- **Nodemon** for auto-restart development server
- **ESLint** for code quality
- **Git** for version control

## 🎯 Getting Started

### Prerequisites
- Node.js 18.0+ 
- MongoDB 6.0+
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/PAW-love.git
   cd PAW-love
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the `server` directory:
   ```env
   # Server Configuration
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/paw-love
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   COOKIE_SECRET=your-cookie-secret-change-this-in-production
   NODE_ENV=development
   ```

   Create `.env` file in the `client` directory:
   ```env
   # Client Configuration
   VITE_API_BASE_URL=http://localhost:5000
   ```

5. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

6. **Run the application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

7. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🎨 UI Components

### Hero Section
The homepage features a stunning video hero section with:
- Auto-playing background video
- Smooth text animations
- Interactive pet illustrations
- Call-to-action buttons

### Pet Cards
Each pet is displayed in beautiful, interactive cards:
- High-quality image display
- Hover effects and overlays
- Quick action buttons
- Detailed information display

### Search & Filters
Advanced search functionality with:
- Real-time search input
- Collapsible filter panel
- Species, gender, and size filters
- Responsive design

### Dashboard
Comprehensive shelter management:
- Statistics overview
- Pet management
- Application tracking
- Image upload system

## 🔐 Authentication

The platform uses JWT-based authentication with:
- Secure HTTP-only cookies
- Password hashing with bcryptjs
- Protected routes for shelter users
- User context management

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎭 Animations & Interactions

### Framer Motion
- Smooth page transitions
- Hover effects
- Loading animations
- Micro-interactions

### CSS Animations
- Floating elements
- Hover states
- Loading skeletons
- Smooth transitions

## 🚀 Performance Features

- **Lazy loading** for images
- **Optimized animations** with Framer Motion
- **Efficient state management** with React Context
- **Responsive images** with proper sizing
- **Smooth scrolling** and interactions

## 🛠️ Development

### Project Structure
```
PAW-love/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── api/           # API configuration
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── utils/             # Utility functions
└── README.md              # This file
```

### Available Scripts

**Backend (server directory):**
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

**Frontend (client directory):**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🌟 Key Features

### For Pet Seekers
- **Browse pets** with advanced search and filters
- **View detailed information** about each pet
- **Quick view** pets without leaving the browse page
- **Favorite pets** for later reference
- **Responsive design** for all devices

### For Shelters
- **Add new pets** with image upload support
- **Manage pet information** and status
- **Track adoption applications** with status updates
- **Beautiful dashboard** with statistics
- **Image management** system

### For Developers
- **Modern React patterns** with hooks and context
- **Clean, maintainable code** structure
- **Comprehensive error handling**
- **Responsive design** best practices
- **Performance optimizations**

## 🎨 Design System

### Color Palette
- **Primary Orange**: #FF6B35 (warm, energetic)
- **Warm Pink**: #FF8E9E (friendly, approachable)
- **Secondary Teal**: #4ECDC4 (calm, trustworthy)
- **Warm Brown**: #8B4513 (natural, earthy)
- **Soft Cream**: #FFF8E1 (gentle, welcoming)

### Typography
- **Headings**: Poppins (modern, friendly)
- **Body Text**: Inter (highly readable)
- **Icons**: React Icons with pet themes

### Components
- **Cards**: Elevated with shadows and hover effects
- **Buttons**: Gradient backgrounds with smooth transitions
- **Forms**: Clean, accessible design with validation
- **Modals**: Smooth animations with backdrop blur

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `CLIENT_URL`: Frontend URL for CORS
- `JWT_SECRET`: Secret for JWT tokens
- `JWT_EXPIRE`: JWT expiration time
- `COOKIE_SECRET`: Secret for cookie signing
- `NODE_ENV`: Environment (development/production)

### Database Schema
The platform uses MongoDB with the following main collections:
- **Users**: User accounts and authentication
- **Pets**: Pet information and images
- **Applications**: Adoption applications

## 🚀 Deployment

### Frontend Deployment
1. Build the production version:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service

### Backend Deployment
1. Set production environment variables
2. Use a process manager like PM2
3. Deploy to your preferred hosting service

## 🤝 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** for beautiful pet images
- **Pexels** for video content
- **React Icons** for iconography
- **Framer Motion** for animations
- **Vite** for fast development experience

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ for pets and their future families**

*Every adoption creates a story of love, companionship, and joy.*