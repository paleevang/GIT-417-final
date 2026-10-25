const express = require('express');
const loggerMiddleware = require('./loggerMiddleware');

const app = express();
const PORT = 3000;

// Integrate the logger middleware
app.use(loggerMiddleware);

// Serve the existing website files
app.use(express.static(__dirname));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
