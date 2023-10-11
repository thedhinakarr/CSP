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

const token = "BQC8h9PjQ_VJM-xWgBF0UgE1w4tBpCcp7BcZ078dFt6aHszACteuItqiarZXP5CHnEuZe4o8xXhxB_sNKwQikYlSQRpn9pXVd8-LrNMkEaIPtVN8w39Eclh9kL1zi8EGgKepP5dakYzVJeIdQPYDvFy4GQEf6D0WS5n_YhEl2ygUSzxg2mT5hFZwNyuSRdOB-xU4lbRtLSLgiwnZUWw9iWzJ0_4zoZHpPdo7VjNyqyOHJyGCOsuTtMFjFn3_I3-FcXz2OfoW0CbtVHppbv3coXSTE8KmbIZpNyfJLXh4knKK2D6W9w-erWCHf4qfGcYojvunMpUCx7rlKRJ9Aoue3oJhyA"

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
