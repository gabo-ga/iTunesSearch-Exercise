"use client"
import { useState } from 'react'
import type { NextPage } from 'next'

import { SearchInput } from './components/SearchInput'
import { DropdownList } from './components/Dropdown'
import { MediaCard } from './components/MediaCard'
import { useSearch } from '../../hooks/useSearch'


const HomePage: NextPage = () => {
  const [term, setTerm] = useState('')
  const [media, setMedia] = useState('all')
  const { results, loading, isError } = useSearch({ term, media })

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        <SearchInput
          value={term}
          onChange={setTerm}
        />
        <div className="w-full sm:w-48">
          <DropdownList
            value={media}
            onChange={setMedia}
          />
        </div>
      </div>

      {isError && (
        <p className="text-red-600 text-center mb-4">Error occurred during search.</p>
      )}
      {loading && (
        <p className="text-gray-700 text-center mb-4">Loading…</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(item => (
          <MediaCard key={item.trackId ?? item.collectionId} item={item} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
