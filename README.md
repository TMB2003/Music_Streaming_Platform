# 🎵 Music Streaming Platform

A modern, full-stack music streaming platform built with React, TypeScript, Node.js, and PostgreSQL. Enjoy your favorite music, create playlists, and discover new tracks in a seamless listening experience.

## ✨ Features

- 🎧 Stream high-quality music
- 📱 Responsive design for all devices
- 🔍 Search and discover new music
- 📁 Create and manage playlists
- 👤 User authentication and authorization
- 🎛️ Admin dashboard for content management
- ⚡ Fast and optimized performance

## 🚀 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- TailwindCSS for styling
- React Router for navigation
- Axios for API requests
- React Icons for beautiful icons

### Backend
- Node.js with Express
- TypeScript for type safety
- PostgreSQL for database
- Redis for caching
- JWT for authentication
- Multer for file uploads
- Cloudinary for media storage

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL
- Redis
- Cloudinary account (for media storage)

## 🚦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/Music_Streaming_Platform.git
cd Music_Streaming_Platform
```

### 2. Set up environment variables
Create `.env` files in each service directory with the required environment variables. Use the `.env.example` files as a reference.

### 3. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install admin service dependencies
cd ../adminService
npm install

# Install user service dependencies
cd ../userService
npm install

# Install song service dependencies
cd ../songService
npm install
```

### 4. Set up the database
1. Create a new PostgreSQL database
2. Update the database connection strings in the respective `.env` files
3. Run migrations (if any)

### 5. Start the development servers

#### In separate terminal windows, run:

```bash
# Start frontend
cd frontend
npm run dev

# Start admin service
cd ../adminService
npm run dev

# Start user service
cd ../userService
npm run dev

# Start song service
cd ../songService
npm run dev
```

## 🌐 API Documentation

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user profile

### Songs
- `GET /api/v1/songs` - Get all songs
- `GET /api/v1/songs/:id` - Get song by ID
- `POST /api/v1/songs` - Create a new song (Admin only)
- `DELETE /api/v1/songs/:id` - Delete a song (Admin only)

### Albums
- `GET /api/v1/albums` - Get all albums
- `GET /api/v1/albums/:id` - Get album by ID with songs
- `POST /api/v1/albums` - Create a new album (Admin only)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [TailwindCSS](https://tailwindcss.com/)

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/yourusername/Music_Streaming_Platform](https://github.com/yourusername/Music_Streaming_Platform)