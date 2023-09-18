import Link from 'next/link';
import { review } from '@/lib/get-requests';
import { Suspense } from 'react';

export default function ReviewList({ params }: { params: {
  reviews: any[],
  album?: boolean,
  user?: boolean,
} }) {
  if (params.reviews.length == 0) return (<div>No reviews</div>);

  const album = params.album;
  const user = params.user;
  
  return (
    <div>
      {params.reviews.map(review =>
        <Suspense fallback={<p>Loading review...</p>}>
          <p><Review params={{ review, album, user }} /></p>
        </Suspense>)}
    </div>
  );
}

async function Review({ params }: { params: {
  review: any,
  album?: boolean,
  user?: boolean,
} }) {
  function timeFormatter(timestamp: string) {
    const [year, month, datecoda] = timestamp.split('-', 3);
    const [day, time] = datecoda.split('T', 2)
    const [hour, minute, timecoda] = time.split(':', 3);

    return `${month}/${day}/${year} ${hour}:${minute} UTC`
  }

  try {
    const data = await review(params.review.album_id, params.review.user_id);
    if (data.error) return (<div>{data.error}</div>);

    return (
      <div>
        {params.album ? <></> : <><Link href={
          `http://localhost:3000/album/${params.review.album_id}`
        }>{data.album}</Link><br /></>}
        {params.user ? <></> : <><Link href={
          `http://localhost:3000/user/${params.review.user_id}`
        }>{data.user}</Link> | </>}
        <>{params.review.rating.toString()} | </>
        <br />{timeFormatter(params.review.timestamp.toString())}
        {params.review.edited ?
          <> (Edited {timeFormatter(params.review.edited.toString())})</> :
          <></>}
        {params.review.text ? <><br />{params.review.text}</> : <></>}
      </div>
    );
  } catch { return (<div>Unable to fetch data</div>); }
}
