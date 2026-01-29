import { Search } from "../../../assets/icons";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: () => void; 
}

function NavBarSearchInput({ 
  value, 
  onChange, 
  placeholder, 
  onSearch 
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(); 
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center">
      <div className="flex h-12 items-center rounded-full bg-gray-100 px-3 py-2 w-full relative">
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="검색"
        >
          <Search className="w-5 h-5 text-gray-400" />
        </button>
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
