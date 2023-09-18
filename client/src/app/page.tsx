import { cookies } from 'next/headers';
import { dashboard } from '@/lib/get-requests';
import { ReviewList } from '@/components';

export default function Page() {
  return (
    <div className="App">
      {cookies().has('access-token') ? <Dashboard /> : <About />}
    </div>
  );
}

function About() {
  return (<div><embed src="/about.html" width="100%"></embed></div>);
}

async function Dashboard() {
  try {
    const data = await dashboard();
    if (data.error) return (<div>{data.error}</div>);
    if (data.followed == false) return (<div>No followed accounts</div>);

    const reviews = data.reviews;

    return (<div><ReviewList params={{ reviews }} /></div>);
  } catch { return (<div>Unable to fetch data</div>); }
}
