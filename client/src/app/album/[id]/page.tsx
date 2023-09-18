import { cookies } from 'next/headers';
import { Icon, InfoList, ReviewForm, ReviewList } from '@/components';
import { item } from '@/lib/get-requests';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const data = await item('album', params.id);
    if (data.error) return (<div>{data.error}</div>);

    const icon = data.icon;
    const artists = data.artists;
    const id = params.id;
    const userID = cookies().get('user-id')?.value || '';
    const tracks = data.tracks;
    const reviews = data.reviews;
    const album = true;

    return (
      <div>
        {data.name}
        <br /><Icon params={{ icon }} />
        <InfoList params={{ artists }} />
        <ReviewForm params={{ id, userID }} />
        <InfoList params={{ tracks }} />
        <ReviewList params={{ reviews, album }} />
      </div>
    );
  } catch { return (<div>Unable to fetch data</div>); }
}
