import spotifyAPI from '../models/spotify.ts';

export async function search(req: any, res: any) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.json({ error: 'No token provided' }).status(401);

    spotifyAPI.setAccessToken(token);
    const dataArtists = await spotifyAPI.searchArtists(req.params.query);
    const dataAlbums = await spotifyAPI.searchAlbums(req.params.query);
    
    return res.json({
      artists: dataArtists.body.artists?.items,
      albums: dataAlbums.body.albums?.items,
    })
  } catch { return res.json({ error: 'Unable to fetch data' }).status(502); }
}
