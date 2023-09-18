import { followedCT, followedReviews } from '../models/database.ts';

export async function dashboard(req: any, res: any) {
  try {
    const varFollowedCT = await followedCT(req.params.id);

    if (varFollowedCT == 0) {
      return res.json({ followed: false }).status(204);
    }

    const reviews = await followedReviews(req.params.id)

    return res.json({ reviews: reviews });
  } catch { return res.json({ error: 'Unable to fetch data' }).status(502); }
}
