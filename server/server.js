import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

// Logging
app.use(morgan('combined'));

// Serve static files with cache settings
app.use(express.static(path.join(__dirname, 'public'), {
   maxAge: '1d',
   etag: false,
}));

// Home route
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handling
app.use((req, res) => {
   res.status(404).send('Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Error - 500');
});

// Start server
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

// Graceful shutdown
process.on('SIGTERM', () => {
   server.close(() => {
       console.log('Process terminated');
   });
});