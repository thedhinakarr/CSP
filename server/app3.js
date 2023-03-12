import SpotifyWebApi from 'spotify-web-api-node';

// Initialize your SpotifyWebApi instance with your client ID, client secret, and redirect URI
const spotifyApi = new SpotifyWebApi({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  redirectUri: 'http://localhost:3000/callback'
});

// Set your access token and refresh token (these could be stored in a database or elsewhere)
spotifyApi.setAccessToken('your_access_token');
spotifyApi.setRefreshToken('your_refresh_token');

// Use setInterval to refresh the access token every hour (or any other desired interval)
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
