import spotifyAPI from '../models/spotify.ts';

export async function login(req: any, res: any) {
  return res.json({ url: spotifyAPI.createAuthorizeURL([], '') });
}
