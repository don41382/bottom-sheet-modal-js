const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Redirect root to the example page
app.get('/', (req, res) => {
    res.redirect('/example');
});

// Serve the example directory
app.use('/example', express.static(path.join(__dirname, 'example')));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log(`Example page available at http://localhost:${port}/example/`);
});