module.exports = {
  apps: [
    {
      name: 'bookshelf-backend',
      script: 'server.js',
      instances: 'max',
      // Scales to use all available CPU cores in production
      exec_mode: 'cluster',
      // Runs in cluster mode for zero-downtime reloads
      autorestart: true,
      watch: false,
      // Turned off to prevent accidental server restart loops
      max_memory_restart: '1G',
      // Restarts the app safely if a memory leak occurs

      // Default variables (Development)
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
      },

      // Production variables (Triggered via --env production)
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000, // Ensures your production port remains consistent
      },
    },
  ],
};
