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

        const text = await response.text();

        console.log("Goo.su response:", text);

        let data;

        try {
            data = JSON.parse(text);
        } catch {

            return res.status(400).json({
                error: "Goo.su returned invalid response"
            });

        }


        if (!response.ok) {

            return res.status(response.status).json({
                error: data.error || "Goo.su error"
            });

        }


        res.json({
            shortUrl: data.short || data.short_url || data.url
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
