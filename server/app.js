const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Root Route to prevent "Cannot GET /" error
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Function to calculate Jaccard Similarity
function jaccardSimilarity(text1, text2) {
    const set1 = new Set(text1.toLowerCase().trim().split(/\W+/).filter(Boolean));
    const set2 = new Set(text2.toLowerCase().trim().split(/\W+/).filter(Boolean));

    const intersection = new Set([...set1].filter(word => set2.has(word)));
    const union = new Set([...set1, ...set2]);

    if (union.size === 0) return 0;

    return Number(((intersection.size / union.size) * 100).toFixed(2));
}

// Plagiarism Check API
app.post('/api/check', (req, res) => {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    // You can expand this to multiple reference texts if you want
    const referenceText = `Artificial intelligence (AI) is the simulation of human intelligence processes by machines.
                           These processes include learning, reasoning, and self-correction.`;

    const similarity = jaccardSimilarity(text, referenceText);

    const message = similarity > 50 
                    ? "High plagiarism detected!" 
                    : "Looks good. Minimal plagiarism.";

    res.json({ percentage: similarity, message });
});

// Use Render-assigned port or 5000 locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
