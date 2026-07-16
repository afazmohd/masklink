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
            `https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`
        );

        const text = await response.text();

        console.log("is.gd response:", text);

        let data;

        try {
            data = JSON.parse(text);
        } catch {
            return res.status(400).json({
                error: text
            });
        }

        if (data.errorcode) {
            return res.status(400).json({
                error: data.errormessage
            });
        }

        res.json({
            shortUrl: data.shorturl
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "is.gd error"
        });

    }

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `MaskPhish running on port ${PORT}`
    );

});
