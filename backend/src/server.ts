import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes  from './routes/auth.routes' ; 
import taskRoutes from './routes/task.routes' ; 

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());


// Health check
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'TaskFlow API is running! 🚀' });
});

app.use('/api/auth' , authRoutes) ; 
app.use('/api/tasks',taskRoutes) ; 

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ MongoDB connected')
    console.log(`📦 DB Host: ${mongoose.connection.host}`);
    console.log(`📦 DB Name: ${mongoose.connection.name}`);
}) 
  .catch((err) => console.log('❌ MongoDB error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));