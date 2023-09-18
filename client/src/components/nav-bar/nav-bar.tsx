import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import Search from './search-bar';

export default function NavBar() {
  return (
    <div>
      <Image src="/logo.png" alt="logo" height={15} width={15} /><> </>
      <><Link href="/">Reverb</Link></>
      {cookies().has('access-token') ?
        <> | <Link href="/profile">Profile</Link></> : <></>}
      {cookies().has('access-token') ?
        <> | <Link href="/logout">Logout</Link></> :
        <> | <Link href="/login">Login</Link></>}
      <Search />
    </div>
  );
}
