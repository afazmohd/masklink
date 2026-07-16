const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// load your html files
app.use(express.static("./"));


app.post("/shorten", async (req, res) => {

    try {

        const longUrl = req.body.url;


        const response = await fetch(
            "https://api-ssl.bitly.com/v4/shorten",
            {
                method: "POST",

                headers: {
                    "Authorization":
                    `Bearer ${process.env.BITLY_TOKEN}`,

                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    long_url: longUrl
                })
            }
        );

const data = await response.json();

console.log("Bitly response:", data);

if (!response.ok) {
    return res.status(response.status).json(data);
}

res.json({
    shortUrl: data.link
});
        
    
    catch(error) {

        res.status(500).json({
            error:"Bitly error"
        });

    }

});


app.listen(3000, () => {

console.log(
"MaskPhish running at http://localhost:3000"
);

});
