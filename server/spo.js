import SpotifyWebApi from "spotify-web-api-node"
import express from "express"
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({

  organization: "org-TylSzhOTzrZJt9k69aXFeZr7",
  apiKey: "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",

})

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];

const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://192.168.0.166:8888/callback',
  clientId: "7bd2c40801d0462f9db5093b3dddcab5",
  clientSecret: "271ffc63fe4442d89ba59d3ae50d9fcb"
});

const app = express();

app.use(express.json());

app.get('/login', (req, res) => {

  let url = spotifyApi.createAuthorizeURL(scopes);
  res.status(200).redirect(url);

});

app.get('/callback', (req, res) => {

  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.status(500).send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {

      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );

      //Change the following redirection to the player page on successful login.
      res.status(200).redirect("http://192.168.0.166:3000/player");

      setInterval(async () => {

        const data = await spotifyApi.refreshAccessToken();

        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);

        spotifyApi.setAccessToken(access_token);

      }, expires_in / 2 * 1000);



    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.get('/token',(req,res)=>{

  try {

    let token = spotifyApi.getAccessToken();
    console.log("TOKEN END POINT CALLED.")
    res.status(200).json({"token":token});
    
  } catch (error) {
    res.status(500).json({"error":"internal server error"});
  }

});

app.post("/search", async (req, res) => {
  try {
    console.log(req.body);

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: 'gpt-3.5-turbo-instruct',
      prompt: req.body.query + ". Just give me one song with no description."
    });

    let x = completion.data.choices[0].text;
    x = x.split('\n').join('')
    console.log(x);

    console.log("DETAILS:----------------------------------\n");

    async function searchSong(data) {

      const sdata = await spotifyApi.searchTracks(data);

      let ix = sdata.body.tracks.items.map((ele) => {
        return (ele.uri);
      })

      console.log(ix);

      res.status(200).json({ "accessToken": spotifyApi.getAccessToken(), "queryResult": x, "result": ix })
    }

    searchSong(x);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" })
  }
});

app.listen(8888, () =>
  console.log('HTTP Server up. Now go to http://localhost:8888/login in your browser.')
);

