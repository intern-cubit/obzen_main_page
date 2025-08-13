# MongoDB Setup Instructions

## Option 1: Local MongoDB Installation

### Windows
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install using the installer
3. Start MongoDB service:
   ```
   net start MongoDB
   ```
4. MongoDB will be available at `mongodb://localhost:27017`

### macOS
```bash
# Using Homebrew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu)
```bash
# Install MongoDB
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Whitelist your IP address
6. Get the connection string and update your `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cubit_dynamics
   ```

## Option 3: Docker (Quick Setup)

```bash
# Run MongoDB in Docker container
docker run -d --name mongodb -p 27017:27017 mongo:latest

# Stop the container
docker stop mongodb

# Start the container
docker start mongodb
```

## Testing Connection

After setting up MongoDB, restart your backend server:

```bash
cd backend
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost:27017 (or your Atlas URL)
Default admin user created
Email: admin@cubitdynamics.com
Password: admin123
```

## Database Initialization

The backend will automatically:
1. Create the database and collections
2. Create a default admin user
3. Initialize default content for hero and about sections

## Accessing the Admin Dashboard

1. Navigate to http://localhost:5173/admin/login
2. Use credentials:
   - Email: admin@cubitdynamics.com
   - Password: admin123
3. Start customizing your website content!
