import Image from 'next/image';
import Link from 'next/link';

const images = [
  { id: 1, src: 'https://picsum.photos/id/10/500/500', alt: 'Image 1' },
  { id: 2, src: 'https://picsum.photos/id/20/500/500', alt: 'Image 2' },
  { id: 3, src: 'https://picsum.photos/id/30/500/500', alt: 'Image 3' },
  { id: 4, src: 'https://picsum.photos/id/40/500/500', alt: 'Image 4' },
  { id: 5, src: 'https://picsum.photos/id/50/500/500', alt: 'Image 5' },
  { id: 6, src: 'https://picsum.photos/id/60/500/500', alt: 'Image 6' },
];


const Gallery = ({data}) => {
  return (
    <div className="flex flex-wrap justify-center">
      {data?.map((image) => (
        <div key={image.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
          <Link href={`/posts/${image.id}`}>
           
            <Image src={image.url} alt={image.id} width={500} height={500} />
           
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Gallery;