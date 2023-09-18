import { albumReviews, artistReviews, userReviews } from '../models/database.ts';
import spotifyAPI from '../models/spotify.ts';

export async function album(req: any, res: any) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.json({ error: 'No token provided' }).status(401);

    spotifyAPI.setAccessToken(token);
    const data = await spotifyAPI.getAlbum(req.params.id);
    const reviews = await albumReviews(req.params.id);

    return res.json({
      name: data.body.name,
      icon: data.body.images.at(0),
      artists: data.body.artists,
      tracks: data.body.tracks.items,
      reviews: reviews,
    });
  } catch { return res.json({ error: 'Unable to fetch data' }).status(502); }
}

export async function artist(req: any, res: any) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.json({ error: 'No token provided' }).status(401);
  
    spotifyAPI.setAccessToken(token);
    const dataArtist = await spotifyAPI.getArtist(req.params.id);
    const dataAlbums = await spotifyAPI.getArtistAlbums(req.params.id);
    const album_ids: any[] = [];
    dataAlbums.body.items.map((element: any) => album_ids.push(element.id));
    const reviews = await artistReviews(album_ids);

    return res.json({
      name: dataArtist.body.name,
      icon: dataArtist.body.images.at(0),
      albums: dataAlbums.body.items,
      reviews: reviews,
    });
  } catch { return res.json({ error: 'Unable to fetch data' }).status(502); }
}

export async function user(req: any, res: any) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.json({ error: 'No token provided' }).status(401);

    spotifyAPI.setAccessToken(token);
    const data = await spotifyAPI.getUser(req.params.id);
    const reviews = await userReviews(req.params.id);

    return res.json({
      name: data.body.display_name,
      icon: data.body.images?.at(0),
      reviews: reviews,
    });
  } catch { return res.json({ error: 'Unable to fetch data' }).status(502); }
}
