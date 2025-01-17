const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.raw({ limit: '10mb', type: '*/*' }));

// Serve a 5MB test file for download
// app.get('/5mb-test-file', (req, res) => {
//     const filePath = path.join(__dirname, 'testfile_5mb');
//     if (!fs.existsSync(filePath)) {
//         // Create a 5MB file if it doesn't exist
//         const buffer = Buffer.alloc(5 * 1024 * 1024, '0');
//         fs.writeFileSync(filePath, buffer);
//     }
//     res.download(filePath);
// });

// Handle upload speed test
app.post('/upload-endpoint', (req, res) => {
    // Simulate processing the uploaded file
    res.status(200).send('Upload successful');
});
app.get('/ping', (req, res) => {
    res.sendStatus(200); // Responds with a simple 200 OK to simulate a successful ping
});

// Handle ping test
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
