import React from 'react';

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchInput({ value = '', onChange }: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <input 
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Search for music, artists, albums..."
      className="w-full max-w-lg px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
