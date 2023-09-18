'use client'

import { review } from '@/lib/post-requests';
import { useState } from 'react';

export default function ReviewForm({ params }: { params: {
  id: string,
  userID: string,
} }) {
  const [submitted, setSubmitted] = useState(<></>);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const form = new FormData(event.target);
    const rating = Number(form.get('rating')?.valueOf());
    const text = form.get('text')?.toString();
    const data = await review(params.id, params.userID, rating, text);
    if (data.error) return (<div>{data.error}</div>);
    if (data.success) setSubmitted(<><br />Review submitted successfully</>);
  }
  
  try {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            name="rating"
            type="range"
            list="markers"
            min={0}
            max={5}
            step={0.5}
          />
          <datalist id="markers">
            <option value={0} />
            <option value={1} />
            <option value={2} />
            <option value={3} />
            <option value={4} />
            <option value={5} />
          </datalist>
          <br /><label htmlFor="text">Review</label>
          <input id="text" name="text" type="text" maxLength={5000} />
          <br /><input type="submit" value="Submit" />
        </form>
        {submitted}
      </div>
    );
  } catch { return (<div>Unable to fetch data</div>); }
}
