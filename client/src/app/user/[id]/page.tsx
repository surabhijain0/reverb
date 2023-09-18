import { Follow, Icon, ReviewList } from '@/components';
import { item } from '@/lib/get-requests';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const data = await item('user', params.id);
    if (data.error) return (<div>{data.error}</div>);

    const icon = data.icon;
    const id = params.id;
    const reviews = data.reviews;
    const user = true;

    return (
      <div>
        {data.name}
        <br /><Icon params={{ icon }} />
        <br/><Follow params={{ id }} />
        <ReviewList params={{ reviews, user }} />
      </div>
    );
  } catch { return (<div>Unable to fetch data</div>); }
}
