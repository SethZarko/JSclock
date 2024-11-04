import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

// Security
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            frameAncestors: ["'self'", "https://sethsellslondon.com"],
        },
    },
}));

// Set Content Security Policy (CSP)
app.use((req, res, next) => {
   res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://sethsellslondon.com");
   next();
});

// Logging
app.use(morgan('combined'));

// Serve static files with cache settings
app.use(express.static(path.join(__dirname, '../client'), {
   maxAge: '1d',
   etag: false,
}));

// Home route
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// 404 handling
app.use((req, res) => {
   res.status(404).send('Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something broke!');
});

// Start server
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

// Graceful shutdown
process.on('SIGTERM', () => {
   server.close(() => {
       console.log('Process terminated');
   });
});