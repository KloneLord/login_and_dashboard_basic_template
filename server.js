import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/dbConfig.js';
import apiRoutes from './routes/apiRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import sessionRoutes from './routes/views/sessionRoutes.js';
import page1Routes from './routes/views/page1Routes.js';
import page2Routes from './routes/views/page2Routes.js';
import page3Routes from './routes/views/page3Routes.js';
import page4Routes from './routes/views/page4Routes.js';
import page5Routes from './routes/views/page5Routes.js';
import page6Routes from './routes/views/page6Routes.js';
import page7Routes from './routes/views/page7Routes.js';
import page8Routes from './routes/views/page8Routes.js';
import page9Routes from './routes/views/page9Routes.js';



dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secretkeynotworking',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure cookies in production
            maxAge: 60 * 60 * 1000, // 1 hour session
        },
    })
);

// API Routes
app.use('/api', apiRoutes);

// Authenticated Dashboard
app.get('/dashboard', authMiddleware, (req, res) => {
    console.log('Serving dashboard to authenticated user:', req.session.user);
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Routes for registration and login
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'userRegistration.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.all('/api/auth/logout', (req, res) => {
    res.send(`Received a ${req.method} request at /api/auth/logout`);
});
app.use('/api/sessions', sessionRoutes);
app.use('/api/page1', page1Routes);
app.use('/api/page2', page2Routes);
app.use('/api/page3', page3Routes);
app.use('/api/page4', page4Routes);
app.use('/api/page5', page5Routes);
app.use('/api/page6', page6Routes);
app.use('/api/page7', page7Routes);
app.use('/api/page8', page8Routes);
app.use('/api/page9', page9Routes);

app.get('/page1', (req, res) => res.sendFile(path.join(__dirname, 'public/page1.html')));
app.get('/page2', (req, res) => res.sendFile(path.join(__dirname, 'public/page2.html')));
app.get('/page3', (req, res) => res.sendFile(path.join(__dirname, 'public/page3.html')));
app.get('/page4', (req, res) => res.sendFile(path.join(__dirname, 'public/page4.html')));
app.get('/page5', (req, res) => res.sendFile(path.join(__dirname, 'public/page5.html')));
app.get('/page6', (req, res) => res.sendFile(path.join(__dirname, 'public/page6.html')));
app.get('/page7', (req, res) => res.sendFile(path.join(__dirname, 'public/page7.html')));
app.get('/page8', (req, res) => res.sendFile(path.join(__dirname, 'public/page8.html')));
app.get('/page9', (req, res) => res.sendFile(path.join(__dirname, 'public/page9.html')));
(async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Error starting the server:', err.message);
        process.exit(1);
    }
})();
