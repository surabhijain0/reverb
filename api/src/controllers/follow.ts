import {
  follow,
  followedCT,
  followerCT,
  following,
  unfollow,
} from '../models/database.ts';

export async function getFollow(req: any, res: any) {
  try {
    const varFollowerCT = await followerCT(req.params.id);
    const varFollowedCT = await followedCT(req.params.id);
    const varFollowing = await following(req.params.id, req.params.userID);

    return res.json({
      follower_ct: varFollowerCT,
      followed_ct: varFollowedCT,
      following: varFollowing,
    });
  } catch { return res.json({ error: 'Unable to fetch data' }).status(502); }
}

export async function postFollow(req: any, res: any) {
  try {
    const id = req.body.id;
    const userID = req.body.user_id;
    if (!id || !userID) return res.json({ success: false }).status(400);
  
    await follow(id, userID);

    return res.json({ success: true });
  } catch { return res.json({ success: false }).status(502); }
}

export async function postUnfollow(req: any, res: any) {
  try {
    const id = req.body.id;
    const userID = req.body.user_id;
    if (!id || !userID) return res.json({ success: false }).status(400);
  
    await unfollow(id, userID);

    return res.json({ success: true });
  } catch { return res.json({ success: false }).status(502); }
}
