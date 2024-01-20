import fs  from 'fs';
import SpotifyWebApi from 'spotify-web-api-node';
const token = "BQDN_s0o02Mmv0ZMFPs9eV4bPqE96uwtxe-fOfg4LxxWEHW8m6LJ4gZVkWBYUulEFiLxi-9hJPDHGWVgfOlgPFVrJ45ARZNUC_xDSbWs8voyWhtSnnqMMVHKM_Y62NYIdcjUshEhfTg3OBL28rkC-V-o_Yue9sSjiBfhLmPJ_D4zsRiylMKgHOWWVaMVvc_GLgMhK0CW00uFmY2GKfNOzfTJIIYgyW0JSoqqOtFR3tCMRn2FgTZK2ZBEwf-1B8JaytJaduAl5bBqt1upvkFfcIvemYCUN72-Aw25A4hMo8QGiNFTh0FEonXr-3wnQSS3hBH84frUpDiVEVh5nzb2Cg"
const spotifyApi = new SpotifyWebApi();
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

async function searchSong(data){
    const sdata = await spotifyApi.searchTracks(data);
    sdata.body.tracks.items.forEach((ele)=>{
        console.log(ele.name);
    })
}

searchSong("humble kendrick lamar")