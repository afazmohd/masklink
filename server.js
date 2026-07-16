const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Load your HTML files
app.use(express.static("./"));

app.post("/shorten", async (req, res) => {

    try {

        const longUrl = req.body.url;

        if (!longUrl) {
            return res.status(400).json({
                error: "URL is required"
            });
        }

        const response = await fetch(
            `https://goo.su/api/links/create?url=${encodeURIComponent(longUrl)}`
        );

        const data = await response.json();

        console.log("Goo.su response:", data);

        if (!response.ok || data.error) {
            return res.status(400).json({
                error: data.error || "Goo.su error"
            });
        }

        res.json({
            shortUrl: data.short
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Goo.su error"
        });

    }

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `MaskPhish running on port ${PORT}`
    );

});
