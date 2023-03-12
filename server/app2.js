//Auto token refreshing.

// Import packages
import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

// Set up Spotify API credentials
const spotifyApi = new SpotifyWebApi({
  clientId: "fac187d038d3424b90561ef2a9e9bc3e",
  clientSecret: "8080e2925007483ca03bbe2d5d68f75c",
  redirectUri: 'http://localhost:8888/callback'
});

// Set up Express app
const app = express();

// Set up routes
app.get('/login', (req, res) => {

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

  const state = 'some-state-of-my-choice';
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);

});

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { body } = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = body;
    console.log(body)
    // save the access token and refresh token to your database for future use
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.redirect('/'); // redirect the user to the homepage after successful login
  } catch (err) {
    res.redirect('/login'); // redirect the user to the login page if there's an error
  }
});

setInterval(() => {
    spotifyApi.refreshAccessToken()
      .then(data => {
        // Save the new access token to your database or wherever you're storing it
        spotifyApi.setAccessToken(data.body.access_token);
      })
      .catch(err => {
        console.log('Could not refresh access token', err);
      });
  }, 3600 * 1000); // 1 hour
  

app.listen(8888,()=>{
    console.log("Listening on port 3000")
})