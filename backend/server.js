const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

let OpenAI;
try {
    OpenAI = require("openai").OpenAI || require("openai");
} catch (err) {
    OpenAI =
        require("../farmer-chatbot/node_modules/openai").OpenAI ||
        require("../farmer-chatbot/node_modules/openai");
}

const cropRoutes = require("./routes/cropRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy_key",
});

// Crop dataset routes
app.use("/api/crops", cropRoutes);
app.use("/api/weather", require("./routes/weatherRoutes"));

// Chatbot route
app.post("/ask", async (req, res) => {
    try {
        const { question, language } = req.body;

        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an agriculture assistant for farmers. Answer only farming-related questions. Give simple, practical advice. If language is Tamil, answer fully in Tamil. If language is English, answer in English. For pesticide/fertilizer/disease advice, suggest contacting local agriculture officer/KVK for exact dosage.",
                },
                {
                    role: "user",
                    content: `Language: ${language || "English"}\nFarmer question: ${question}`,
                },
            ],
        });

        res.json({ answer: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({
            error: "Something went wrong",
            details: error.message,
        });
    }
});

app.get("/", (req, res) => {
    res.send("Backend API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});