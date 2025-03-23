const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Redirect root to home.html
app.get('/', (req, res) => {
    res.redirect('/home.html');
});

// Serve project data from JSON file
app.get('/api/projects', (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'projects.json');
        const projectsData = fs.readFileSync(filePath, 'utf-8');
        const projects = JSON.parse(projectsData);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load projects.' });
    }
});

// Handle contact form submissions
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('Missing form data');
    }

    res.status(200).send('Message received!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

