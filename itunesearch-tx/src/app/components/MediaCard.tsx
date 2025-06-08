import Image from 'next/image';

interface MediaCardProps {
  coverImage: string;
  albumName: string;
  artistName: string;
  price?: number;
}

export function MediaCard({ coverImage, albumName, artistName, price }: MediaCardProps) {
  const defaultImage = '/default.png';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 transition-transform hover:scale-105">
      <div className="relative h-64 w-full">
        <Image
          src={coverImage || defaultImage}
          alt={`${albumName} cover`}
          fill
          className="object-cover"
          onError={(e: any) => {
            e.target.src = defaultImage;
          }}
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate" title={albumName}>
          {albumName}
        </h3>
        <p className="text-gray-600 truncate" title={artistName}>
          {artistName}
        </p>
        {price !== undefined && (
          <p className="mt-2 text-green-600 font-medium">
            ${price.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}