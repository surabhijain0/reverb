import spotifyAPI from '../models/spotify.ts';

export async function auth(req: any, res: any) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.json({ error: 'No token provided' }).status(401);

    const dataTokens = await spotifyAPI.authorizationCodeGrant(token);
    spotifyAPI.setAccessToken(dataTokens.body.access_token);
    const dataUser = await spotifyAPI.getMe();
    
    return res.json({
      accessToken: dataTokens.body.access_token,
      refreshToken: dataTokens.body.refresh_token,
      userID: dataUser.body.id,
    });
  } catch { return res.json({ error: 'Unable to fetch data' }).status(502); }
}
