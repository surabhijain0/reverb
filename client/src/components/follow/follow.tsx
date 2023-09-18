import { cookies } from 'next/headers';
import FollowDisplay from './follow-display';
import { follow } from '@/lib/get-requests';

export default async function Follow({ params }: { params: {
  id: string,
}}) {
  try {
    const userID = cookies().get('user-id')?.value || '';
    const id = params.id;

    const following = await follow(id);
    if (following.error) return (<div>{following.error}</div>);

    return (<div><FollowDisplay params={{ id, userID, following }} /></div>);
  } catch { return (<div>Unable to fetch data</div>); }
}
