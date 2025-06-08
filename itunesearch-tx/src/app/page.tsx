import Image from "next/image";
import { DropdownList } from "./components/Dropdown";
import { SearchInput } from "./components/SearchInput";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          iTunes Search
        </h1>
        
        <div className="flex items-center justify-center gap-4">
          <SearchInput/>
         <DropdownList/>
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
