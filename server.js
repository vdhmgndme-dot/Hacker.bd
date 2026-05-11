const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use(express.json());

// কমান্ড রান করার সিস্টেম
app.post('/execute', (req, res) => {
    const { command } = req.body;
    exec(command, (error, stdout, stderr) => {
        res.send({ output: stdout || stderr || "Command executed." });
    });
});

// জিপ আপলোড ও সেভ সিস্টেম
app.post('/upload', upload.single('zipFile'), (req, res) => {
    if (req.file) {
        res.send({ message: `${req.file.originalname} uploaded successfully!` });
    } else {
        res.status(400).send({ message: "Upload failed!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Muhith Host running on port ${PORT}`));
