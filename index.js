import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import { PORT, mongoDBURL } from "./config.js";
import AccountsRoutes from './routes/accountRoutes.js';

dotenv.config();


const app = express();

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = ['https://gestion-cuentas-agc-frontend.vercel.app/', 'http://localhost:5173'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));


app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.status(200).send("<h1>Data</h1>");
});

app.use('/accounts', AccountsRoutes);

// Connect to MongoDB
mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => console.error("MongoDB connection error:", err));