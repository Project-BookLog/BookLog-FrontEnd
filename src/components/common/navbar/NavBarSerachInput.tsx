import { Search } from "../../../assets/icons";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: () => void; 
  hideIcon?: boolean;
}

function NavBarSearchInput({ 
  value, 
  onChange, 
  placeholder, 
  onSearch,
  hideIcon = false,
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(); 
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center">
      <div className="flex h-12 items-center rounded-full bg-gray-100 px-3 py-2 w-full relative">
        {!hideIcon && (
          <button
            type="submit"
            aria-label="검색"
          >
            <Search className="w-5 h-5 text-gray-600 mb-0.5" />
          </button>
        )}
        <input
          className="w-full bg-transparent outline-none text-body-01-m placeholder:text-gray-600 pr-10 pl-2"
          placeholder={placeholder ?? "도서 검색하기"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </form>
  );
}

export default NavBarSearchInput;
