import config from '../config/database.config.ts';
import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp(config);

// An alternative database structure might involve creating an additional
// table 'users' in which Spotify IDs are assigned unique INT ids which are
// referenced by the followed_id and follower_id fields in the 'follows' table
// and the user_id field in the 'reviews' table. Albums might also be assigned
// INT ids, although this would see a smaller benefit since they simple are not
// referenced as much as users.
// This approach would allow for greater scalability of data storage, since
// INT data takes up less space than VARCHAR data. However, it would decrease
// the speed at which users can follow or unfollow others or make reviews,
// because each Spotify ID involved in the action would have to be checked
// against the 'users' table before the information could be stored in or
// deleted from the 'follows' or 'reviews' table. Thus, it is not entirely clear
// which approach yields a greater benefit, especially on a small scale.

db.none(`CREATE TABLE IF NOT EXISTS follows (
  followed_id   VARCHAR(80) NOT NULL,
  follower_id   VARCHAR(80) NOT NULL,
  PRIMARY KEY   (followed_id, follower_id)
)`);
db.none(`CREATE TABLE IF NOT EXISTS reviews (
  album_id      VARCHAR(80) NOT NULL,
  user_id       VARCHAR(80) NOT NULL,
  timestamp     TIMESTAMP NOT NULL,
  edited        TIMESTAMP,
  rating        REAL NOT NULL,
  text          VARCHAR(5000),
  PRIMARY KEY   (album_id, user_id)
)`);

export async function follow(id: string, userID: string) {
  await db.none(`
    INSERT INTO follows(followed_id, follower_id)
    VALUES ($1, $2)
  `, [id, userID]);
  return;
}

export async function unfollow(id: string, userID: string) {
  await db.none(`
    DELETE FROM follows
    WHERE followed_id=$1 AND follower_id=$2
  `, [id, userID]);
  return;
}

export async function followedCT(id: string) {
  const followedCT = await db.one(`
    SELECT COUNT(followed_id)
      FROM follows
    WHERE follower_id=$1
  `, [id]);
  return followedCT.count;
}

export async function followerCT(id: string) {
  const followerCT = await db.one(`
    SELECT COUNT(followed_id)
      FROM follows
    WHERE followed_id=$1
  `, [id]);
  return followerCT.count;
}

export async function following(id: string, userID: string) {
  const following = await db.one(`
    SELECT COUNT(followed_id)
      FROM follows
    WHERE followed_id=$1
      AND follower_id=$2
  `, [id, userID]);
  return following.count == 1;
}

export async function albumReviews(id: string) {
  return await db.any(`
    SELECT album_id, user_id, timestamp, edited, rating, text
      FROM reviews
    WHERE album_id=$1
    ORDER BY timestamp DESC
  `, [id]);
}

export async function artistReviews(album_ids: any[]) {
  return await db.any(`
    SELECT album_id, user_id, timestamp, edited, rating, text
      FROM reviews
    WHERE album_id IN ($1:csv)
    ORDER BY timestamp DESC
  `, [album_ids]);
}

export async function followedReviews(id: string) {
  return await db.any(`
    SELECT album_id, user_id, timestamp, edited, rating, text
      FROM reviews
      JOIN follows
        ON user_id=followed_id
    WHERE follower_id=$1
    ORDER BY timestamp DESC
  `, [id]);
}

export async function userReviews(id: string) {
  return await db.any(`
    SELECT album_id, user_id, timestamp, edited, rating, text
      FROM reviews
    WHERE user_id=$1
    ORDER BY timestamp DESC
  `, [id]);
}

export async function review(
  id: string,
  userID: string,
  rating: number,
  text?: string,
) {
  await db.none(`
    INSERT INTO reviews(album_id, user_id, timestamp, rating, text)
    VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (album_id, user_id)
        DO UPDATE SET edited=EXCLUDED.timestamp,
                      rating=EXCLUDED.rating,
                      text=EXCLUDED.text
  `, [id, userID, new Date, rating, text]);
  return;
}
