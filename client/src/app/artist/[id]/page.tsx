import { Icon, InfoList, ReviewList } from '@/components';
import { item } from '@/lib/get-requests';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const data = await item('artist', params.id);
    if (data.error) return (<div>{data.error}</div>);

    const icon = data.icon;
    const albums = data.albums;
    const reviews = data.reviews;

    return (
      <div>
        {data.name}
        <br /><Icon params={{ icon }} />
        <InfoList params={{ albums }} />
        <ReviewList params={{ reviews }} />
      </div>
    );
  } catch { return (<div>Unable to fetch data</div>); }
}
