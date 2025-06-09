import React from 'react';

interface MediaTypeSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function DropdownList({ value = 'all', onChange }: MediaTypeSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="all">All</option>
      <option value="music">Music</option>
      <option value="movie">Movie</option>
      <option value="podcast">Podcast</option>
    </select>
  );
}
