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
            `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
        );

        const shortUrl = await response.text();

        console.log("TinyURL response:", shortUrl);

        if (shortUrl.startsWith("Error")) {
            return res.status(400).json({
                error: shortUrl
            });
        }

        res.json({
            shortUrl: shortUrl
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "TinyURL error"
        });

    }

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `MaskPhish running on port ${PORT}`
    );

});
