import config from '../config/spotify.config.ts';
import spotifyWebAPI from 'spotify-web-api-node';

const spotifyAPI = new spotifyWebAPI(config);

export default spotifyAPI;
