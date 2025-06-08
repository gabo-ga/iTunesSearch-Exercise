interface MediaTypeSelectProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function DropdownList({ value, onChange }: MediaTypeSelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="all">All</option>
      <option value="music">Music</option>
      <option value="movie">Movie</option>
      <option value="podcast">Podcast</option>
    </select>
  );
}