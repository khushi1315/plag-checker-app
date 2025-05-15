const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/check', (req, res) => {
    const { text } = req.body;

    // Fake logic: if text includes "copy", flag as 60% plagiarized
    let percentage = text.includes("copy") ? 60 : 5;
    let message = percentage > 50 ? "High plagiarism detected!" : "Looks good. Minimal plagiarism.";

    res.json({ percentage, message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


