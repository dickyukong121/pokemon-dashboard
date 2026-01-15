import { useEffect, useState } from "react";
import { debounceTime, Subject } from "rxjs";

const SearchInput2: React.FC<{
  value: string;
  onChange(value: string): void;
}> = ({ value, onChange }) => {
  const searchSubject = new Subject<string>();
  const [input, setInput] = useState(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    searchSubject.next(e.target.value);
    // onChange(e.target.value);
  };
  useEffect(() => {
    const subscription = searchSubject
      .pipe(debounceTime(1000))
      .subscribe((searchValue) => {
        onChange(searchValue);
      });

    return () => subscription.unsubscribe();
  }, [onChange]);

  return (
    <input
      className="p-2 mb-4 border rounded "
      placeholder="Search Pokemon..."
      value={input}
      onChange={handleChange}
    />
  );
};
export default SearchInput2;
