import React, { useEffect, useRef, useState } from "react";
import { debounceTime, Subject } from "rxjs";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Search Pokemon...",
  className = "p-2 mb-4 border rounded",
}) => {
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
      className={className}
      placeholder={placeholder}
      value={input}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
