import express from "express";
import { Configuration, OpenAIApi } from "openai";
import SpotifyWebApi from 'spotify-web-api-node';
import mongoose from "mongoose";

const dbConnect = async () =>{
    try {
        await mongoose.connect("mongodb+srv://thedhinakarr:Dhinakar1%40@cluster0.zdl2lue.mongodb.net/csp");
        console.log("CONNECTED TO DB");
    } catch (error) {
        console.log(error);
    }
};

// await dbConnect();


let cspSchema = new mongoose.Schema({

    query:{
        type:String,
        required:true
    },

    response:{
        type:String,
        required:true
    }

})

let csp = mongoose.model("cspModel",cspSchema);

let app = express();
let port = 6003;

const configuration = new Configuration({

    organization: "org-wNiSNOFSvKVFi9vX1nOtvz8x",
    apiKey: "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",
});

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

        const token = "BQCpzrYw7I-j-x1RCXFvu02Dl5wtrg-4KRpL-E04unrswa6hX5-k9uQJDhPee5_B5XiWSrqJHNv4SK8LIoFsHxLZ5l9JBRafNt9ZnMmL11UE_rwurqXANjEvEqmnU6mMumJFWkqRDPnF4uewWVk2EiwVITk7Od0JiTyp5ez14_X3ucU0fne-UZlJgavYE8ZsJW1USInmmFS2zJBaTyeDMXwiE2z__1wCVmlEJOceM8_iZjcjNSWvez_YutvhvMBwFm4gPaMsiCfAG1ggO9BCveNGT9rrGks-TgemcJcCNuoWqqU2ywaLR0UNgp0pyw6CIGJm4iKHdPppSc4NNG_ombIYYQ";
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);

        async function searchSong(data) {

            const sdata = await spotifyApi.searchTracks(data);
            let ix = sdata.body.tracks.items.map((ele) => {
              return (ele.uri);
            })

            console.log(ix)
            res.status(200).json({"accessToken":token,"queryResult" : x,"result":ix})
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





