export async function follow(
  id: string,
  userID: string,
  following: boolean,
) {
  try {
    const path = following ? 'unfollow' : 'follow';
    const res = await fetch(`http://localhost:3001/follow/${path}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        user_id: userID,
      }),
    });
    return await res.json();
  } catch { return { error: 'Unable to fetch data' }; }
}

export async function review(
  id: string,
  userID: string,
  rating: number,
  text?: string,
) {
  try {
    const res = await fetch('http://localhost:3001/review/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        user_id: userID,
        rating: rating,
        text: text,
      }),
    });
    return await res.json();
  } catch { return { error: 'Unable to fetch data' }; }
}
