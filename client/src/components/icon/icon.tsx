import Image from 'next/image';

export default function Icon({ params }: { params: { icon?: any }}) {
  if (params.icon) {
    return (
      <Image
        src={params.icon.url}
        alt='icon'
        width={params.icon.width}
        height={params.icon.height}
        style={{ maxHeight: '250px', width: 'auto' }}
      />
    );
  } else return;
}
