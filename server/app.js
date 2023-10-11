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

    organization: "org-XgG9u1AG5jwcN3iY0f7VLKiH",
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

        const token = "BQC8h9PjQ_VJM-xWgBF0UgE1w4tBpCcp7BcZ078dFt6aHszACteuItqiarZXP5CHnEuZe4o8xXhxB_sNKwQikYlSQRpn9pXVd8-LrNMkEaIPtVN8w39Eclh9kL1zi8EGgKepP5dakYzVJeIdQPYDvFy4GQEf6D0WS5n_YhEl2ygUSzxg2mT5hFZwNyuSRdOB-xU4lbRtLSLgiwnZUWw9iWzJ0_4zoZHpPdo7VjNyqyOHJyGCOsuTtMFjFn3_I3-FcXz2OfoW0CbtVHppbv3coXSTE8KmbIZpNyfJLXh4knKK2D6W9w-erWCHf4qfGcYojvunMpUCx7rlKRJ9Aoue3oJhyA";
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





