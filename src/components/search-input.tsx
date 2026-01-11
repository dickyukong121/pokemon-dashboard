import React, { useEffect, useRef, useState } from "react";
import { debounceTime, Subject } from "rxjs";

const SearchInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({value, onChange}) => {
  const [input, setInput] = useState(value);
  const searchSubject = useRef(new Subject<string>());

  useEffect(() => {
    const subscription = searchSubject.current
      .pipe(debounceTime(1000))
      .subscribe((searchValue) => {
        onChange(searchValue);
      });

    return () => subscription.unsubscribe();
  }, [onChange]);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    searchSubject.current.next(e.target.value);
  };

  return (
    <input
      className="p-2 mb-4 border rounded"
      placeholder="Search Pokemon..."
      value={input}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
