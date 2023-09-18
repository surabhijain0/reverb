import { review } from '../models/database.ts';
import spotifyAPI from '../models/spotify.ts';

export async function getReview(req: any, res: any) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.json({ error: 'No token provided' }).status(401);

    spotifyAPI.setAccessToken(token);
    const dataAlbum = await spotifyAPI.getAlbum(req.params.album);
    const dataUser = await spotifyAPI.getUser(req.params.user);

    return res.json({
      album: dataAlbum.body.name,
      user: dataUser.body.display_name,
    });
  } catch { return res.json({ error: 'Unable to fetch data' }).status(502); }
}

export async function postReview(req: any, res: any) {
  try {
    const id = req.body.id;
    const userID = req.body.user_id;
    const rating = req.body.rating;
    const text = req.body.text;
    if (!id || !userID || !rating) {
      return res.json({ success: false }).status(400);
    }

    await review(id, userID, rating, text);

    return res.json({ success: true });
  } catch { return res.json({ success: false }).status(502); }
}
