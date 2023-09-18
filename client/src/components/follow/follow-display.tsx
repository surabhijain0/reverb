'use client'

import { follow } from '@/lib/post-requests';
import { useState } from 'react';

export default function FollowDisplay({ params }: { params: {
  id: string,
  userID: string,
  following: any,
} }) {
  const [followerCT, setFollowerCt] = useState(params.following.follower_ct);
  const [label, setLabel] = useState(
    params.following.following ? 'Unfollow' : 'Follow'
  );

  async function handleClick() {
    try {
      const data = await follow(
        params.id,
        params.userID,
        params.following.following,
      );
      if (data.error) return (<div>{data.error}</div>);
      
      if (data.success) {
        params.following.following = !params.following.following;
        setFollowerCt(params.following.following ?
          followerCT + 1 : followerCT - 1
        );
        setLabel(params.following.following ? 'Unfollow' : 'Follow');
      }
    } catch { return (<div>Unable to fetch data</div>); }
  }
  
  return (
    <div>
      {followerCT} Followers | {params.following.followed_ct} Following
      {params.id == params.userID ? <></> :
        <><br /><button onClick={handleClick}>{label}</button></>}
    </div>
  );
}
