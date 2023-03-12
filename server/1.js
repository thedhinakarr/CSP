import { Configuration, OpenAIApi } from "openai";
import fs from 'fs';
import SpotifyWebApi from 'spotify-web-api-node';
import readLineSync from "readline-sync";

let query = readLineSync.question("What's up: ");

const configuration = new Configuration({

  organization: "org-wNiSNOFSvKVFi9vX1nOtvz8x",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: query,
  temperature: 0.6,
  max_tokens: 150,
  top_p: 1,
  frequency_penalty: 1,
  presence_penalty: 1,
});

let x = response.data.choices[0].text;

console.log(x);
console.log("DETAILS:----------------------------------\n")

const token = "BQCwdu8t1AMokKcYDNiSaByCMAPvkMAWG4nQBZRj8QJx_lexoK7lKZ_Rq6T233R_rmWoXtDBqkx9LGlXFGqw0NQBeBhQWo0jydHJ4B0wWKvEg_64WhVA58c1A_ZS81kgeRpw_e6xQt1BOTZC4lHkuvXRDM0jTPNn9rAHKPcqHodViAuBus2v7ujDc5s9BDzhcuGq9z9KHl-twfkBj4QHX75nMvWWkxnPOUEVrH6xALAVeYn77P86X4lS-WXsj2MRcvFgo161BlbECe6tnCoRMH-n-NaXFF0Wdfzz2cF5VlSoA-Q240Z-V3RUMBHfoYA3iSPa1wgr1rkEiEIV7ILMS6QarQ"

spotifyApi.setAccessToken(token);

function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    console.log(me.body);

    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//id:3146unu5on6npck453kg34n4o5gm

async function searchSong(data) {
  const sdata = await spotifyApi.searchTracks(data);

  let ix = sdata.body.tracks.items.map((ele) => {
    return (ele.external_urls);
  })
  console.log(ix)

}

searchSong(x)
