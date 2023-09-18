import Link from 'next/link';

export default function InfoList({ params }: { params: {
  artists?: any[],
  albums?: any[],
  tracks?: any[],
}}) {
  if (params.artists) return (params.artists.length > 0 ?
    <div>
      {params.artists.map((artist) =>
        <><br /><Link href={`http://localhost:3000/artist/${artist.id}`}>
          {artist.name}
        </Link></>
      )}
    </div> :
    <div>No artists</div>
  );
  
  if (params.albums) return (params.albums.length > 0 ?
    <div>
      {params.albums.map((album) =>
        <><br /><Link href={`http://localhost:3000/album/${album.id}`}>
          {album.name}
        </Link></>
      )}
    </div> :
    <div>No albums</div>
  );

  if (params.tracks) return (params.tracks.length > 0 ?
    <div>
      {params.tracks.map((track) =>
        <><br /><Link href={track.uri}>{track.name}</Link></>
      )}
    </div> :
    <div>No tracks</div>
  );

  return (<div>No data</div>);
}
