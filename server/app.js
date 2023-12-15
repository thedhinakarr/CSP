import express from "express";
import { Configuration, OpenAIApi } from "openai";
import SpotifyWebApi from 'spotify-web-api-node';
import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://thedhinakarr:Dhinakar1%40@cluster0.zdl2lue.mongodb.net/csp");
        console.log("CONNECTED TO DB");
    } catch (error) {
        console.log(error);
    }
};

// await dbConnect();


let cspSchema = new mongoose.Schema({

    query: {
        type: String,
        required: true
    },

    response: {
        type: String,
        required: true
    }

})

let csp = mongoose.model("cspModel", cspSchema);

let app = express();
let port = 6003;

const configuration = new Configuration({

    organization: "org-QjO3P2GedlHtE4zAuNJthG7u",
    apiKey: "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",

})

app.use(express.json());

app.post("/search", async (req, res) => {
    try {

        console.log(req.body);

        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.query,
            temperature: 0.6,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 1,
            presence_penalty: 1,
        });

        let x = response.data.choices[0].text;
        console.log(x);

        // Save Query, Result in database.

        // let ix = new csp({
        //     query:req.body.query,
        //     response: x
        // })

        //    await ix.save();

        console.log("DETAILS:----------------------------------\n")


        const token = "BQDbq0CPAxXj3UyGmvVAS1TpKWi8wFjIE53D6n-CRCxOLbFzebRi0ia0bIm-aNamrNavNYDN2QVJ17KK-s8k5fQ-IRLqTUogtNMnJLIX2-SMTrTjtMpmfIMK8_8hLZ_kpnO5zTMm33BFHh3exG5WymRJT1-x6u5EbMwQRgIAcxVs8Xm1QuGHwTck72TdnYbdZ3VjuwH-MvNfIvDu3zCix4cKU17o4gq9B3o2DwRg9_lMRfJCxsEjx-q22D0Xh3Q8cFOBmcjWEtkthE8YKBm2vrLgU-ZL8daKvRnw6kjmVxkyw7fjT7HlBOrQt6HZ9GBaHZPstnvIeF9jTUUGt8bzGY3J";
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);

        async function searchSong(data) {

            const sdata = await spotifyApi.searchTracks(data);
            let ix = sdata.body.tracks.items.map((ele) => {
                return (ele.uri);
            })

            console.log(ix)
            res.status(200).json({ "accessToken": token, "queryResult": x, "result": ix })
        }

        searchSong(x);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})

app.listen(port, () => {
    console.log("SERVER UP")
})





