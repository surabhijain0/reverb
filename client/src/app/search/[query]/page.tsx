import { InfoList } from '@/components';
import { search } from '@/lib/get-requests';

export default async function Page({ params }: { params: { query: string } }) {
  try {
    const data = await search(params.query);
    if (data.error) return (<div>{data.error}</div>);
    
    const artists = data.artists;
    const albums = data.albums;

    return (
      <div>
        Artists:
        <InfoList params={{ artists }} />
        <br />Albums:
        <InfoList params={{ albums }} />
      </div>
    );
  } catch { return (<div>Unable to fetch data</div>); }
}
