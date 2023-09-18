'use client'

import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  
  function handleSubmit(event: any) {
    event.preventDefault();
    const form = new FormData(event.target);
    router.push('../search/' + form.get('query')?.toString());
  }
  
  try {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            id="query"
            name="query"
            type="text"
            placeholder="Search..."
            required={true}
          />
        </form>
      </div>
    );
  } catch { return (<div>Unable to fetch data</div>); }
}
