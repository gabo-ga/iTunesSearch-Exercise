import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          iTunes Search
        </h1>
        
        <div className="flex items-center justify-center gap-4">
          <input 
            type="text"
            placeholder="Search for music, artists, albums..."
            className="w-full max-w-lg px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="music">Music</option>
            <option value="movie">Movie</option>
            <option value="podcast">Podcast</option>
            <option value="audiobook">Audiobook</option>
            <option value="ebook">eBook</option>
          </select>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </main>
  );
}
