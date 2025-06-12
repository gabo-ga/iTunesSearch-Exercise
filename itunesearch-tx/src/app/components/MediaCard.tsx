import Image from 'next/image'
import type { FC } from 'react'
import type { MediaItem } from '../../../models/itunes'

interface MediaCardProps {
  item: MediaItem
}

export const MediaCard: FC<MediaCardProps> = ({ item }) => {
  const {
    artworkUrl100,
    collectionName,
    trackName,
    artistName,
    collectionPrice,
    currency,
  } = item

  const defaultImage = '/default.png'
  const imageSrc = artworkUrl100 ?? defaultImage
  const title = collectionName ?? trackName ?? 'Unknown Title'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-64 w-full">
        <Image
          src={imageSrc}
          alt={`${title} cover`}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = defaultImage
          }}
        />
      </div>
      <div className="p-4 flex flex-col">
        <h3 className="font-semibold text-lg truncate" title={title}>
          {title}
        </h3>
        <p className="text-gray-600 truncate" title={artistName}>
          {artistName}
        </p>
        {collectionPrice != null && currency && (
          <p className="mt-2 text-green-600 font-medium">
            {collectionPrice}
          </p>
        )}
      </div>
    </div>
  )
}
