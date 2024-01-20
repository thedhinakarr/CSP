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

});

let csp = mongoose.model("cspModel", cspSchema);

let app = express();
let port = 6003;

const configuration = new Configuration({

    organization: "org-TylSzhOTzrZJt9k69aXFeZr7",
    apiKey: "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",

})

app.use(express.json());

app.post("/search", async (req, res) => {
    try {

        console.log(req.body);

        const openai = new OpenAIApi(configuration);

        const completion = await openai.createCompletion({
            model: 'gpt-3.5-turbo-instruct',
            prompt: req.body.query+ ". Just give me one song with no description."
        });

        // const response = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: req.body.query,
        //     temperature: 0.6,
        //     max_tokens: 150,
        //     top_p: 1,
        //     frequency_penalty: 1,
        //     presence_penalty: 1,
        // });

        let x = completion.data.choices[0].text;
        x = x.split('\n').join('')
        console.log(x);

        // Save Query, Result in database.

        // let ix = new csp({
        //     query:req.body.query,
        //     response: x
        // })

        //    await ix.save();

        console.log("DETAILS:----------------------------------\n")
        const spotifyApi = new SpotifyWebApi();
        
        const token = spotifyApi.getAccessToken();

        console.log(token);

        spotifyApi.setAccessToken(token);

        async function searchSong(data) {

            const sdata = await spotifyApi.searchTracks(data);

            let ix = sdata.body.tracks.items.map((ele) => {
                return (ele.uri);
            })

            console.log(ix);

            res.status(200).json({ "accessToken": token, "queryResult": x, "result": ix })
        }

        searchSong(x);

       // res.status(200).json({ "queryResult": x })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})

app.listen(port, () => {
    console.log("SERVER UP")
})





