require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const {
  connectDB
} = require('./config/db');
const notificationsRouter = require('./routes/notificationsRoute');
const authRouter = require('./routes/authRoute');
const bookRouter = require('./routes/bookRoute');
const errorHandler = require('./middleware/errorHandler');
const standardize = require('./middleware/standardize');


connectDB();

const app = express();
app.use(helmet());

const logger = (req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${req.method}  → ${req.url}`);
  next();
};
app.use(logger);

const timer = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`⏱️ ${req.method} ${req.url} took ${duration}ms`);
  });
  next();
};
app.use(timer);

app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);
  console.log('Method:', req.method, '→', req.url);
  next();
});

const allowedOrigins = [
  'https://oramulu.github.io',
  'https://oramulu.github.io/bookshelf',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

app.use(
  cors( {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET',
      'POST',
      'PUT',
      'DELETE',
      'OPTIONS'],
    allowedHeaders: ['Content-Type',
      'Authorization',
      'X-Requested-With'],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  standardize( {
    defaultMessage: 'Request successful',
  })
);

app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);
app.use('/api/notifications', notificationsRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

process.on('SIGINT', () => {
  console.log('Shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});