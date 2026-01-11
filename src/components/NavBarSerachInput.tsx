import { Search } from "../assets/icons";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function NavBarSearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="w-full flex items-center">
      <div className="flex h-12 items-center rounded-full bg-gray-100 px-3 py-2 w-full">
        <span className="mr-2">
          <Search className="w-5 h-5" />
        </span>
        <input
          className="w-full bg-transparent outline-none text-body-01-m placeholder:text-gray-600"
          placeholder={placeholder ?? "도서 검색하기"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default NavBarSearchInput;
