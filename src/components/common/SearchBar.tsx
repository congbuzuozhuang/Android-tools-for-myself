import { useCallback, type ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = '搜索...' }) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className="search-bar">
      <span>🔍</span>
      <input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
      {value && (
        <button onClick={() => onChange('')} style={{ fontSize: '16px' }}>
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;