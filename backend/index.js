import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import route from './Routes/route.js';
import dnsRoutes from './Routes/dnsRoutes.js';
import domainRoutes from './Routes/domainRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', route);
app.use('/api/dns', dnsRoutes);
app.use('/api/domain', domainRoutes);

const PORT = process.env.PORT || 8080;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
