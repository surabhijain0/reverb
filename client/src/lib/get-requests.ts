import { cookies } from 'next/headers';

export async function auth(token: string) {
  try {
    const res = await fetch('http://localhost:3001/auth/', {
        headers: { 'Authorization': `Bearer ${token}` },
        next: { revalidate: 3600},
      });
    return await res.json();
  } catch { return { error: 'Unable to fetch data' }; }
}

export async function dashboard() {
  try {
    const res = await fetch(
      `http://localhost:3001/dashboard/${cookies().get('user-id')?.value}`
    );
    return await res.json();
  } catch { return { error: 'Unable to fetch data' }; }
}

export async function follow(id: string) {
  try {
    const res = await fetch(
      `http://localhost:3001/follow/${id}/${
        cookies().get('user-id')?.value
      }`
    );
    return await res.json();
  } catch { return { error: 'Unable to fetch data' }; }
}

export async function item(type: string, id: string) {
  try {
    const res = await fetch(`http://localhost:3001/item/${type}/${id}`, {
      headers: {
        'Authorization': `Bearer ${cookies().get('access-token')?.value}`,
      },
    });
    return await res.json();
  } catch { return { error: 'Unable to fetch data' }; }
}

export async function login() {
  try {
    const res = await fetch('http://localhost:3001/login/');
    return await res.json();
  } catch { return { error: 'Unable to fetch data' }; }
}

export async function review(album: string, user: string) {
  try {
    const res = await fetch(`http://localhost:3001/review/${album}/${user}`, {
      headers: {
        'Authorization': `Bearer ${cookies().get('access-token')?.value}`
      },
    });
    return await res.json();
  } catch { return { error: 'Unable to fetch data' }; }
}

export async function search(query: string) {
  try {
    const res = await fetch(`http://localhost:3001/search/${query}`, {
      headers: {
        'Authorization': `Bearer ${cookies().get('access-token')?.value}`,
      },
    });
    return await res.json();
  } catch { return { error: 'Unable to fetch data' }; }
}
