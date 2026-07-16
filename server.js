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

        const response = await fetch(
            `https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`
        );

        const data = await response.json();

        console.log("is.gd response:", data);

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

app.listen(3000, () => {

    console.log(
        "MaskPhish running at http://localhost:3000"
    );

});
