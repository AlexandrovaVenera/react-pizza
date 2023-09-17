import { useDispatch, useSelector } from "react-redux";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useRef, useState, useCallback } from "react";
import { setSearch } from "../../redux/Slice/filterSlice";

export const Search: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.filter.searchValue);
  const setSearchValue = (str: string) => {
    dispatch(setSearch(str));
  };
  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearch = useCallback(
    debounce((str: string) => {
      setSearchValue(str);
    }, 1000),
    []
  );
  const onChangeInputValue = (e: Event) => {
    setValue((e.target as HTMLInputElement).value);
    updateSearch((e.target as HTMLInputElement).value);
  };
  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInputValue}
        className={styles.input}
        placeholder="Поиск пиццы"
      />
      {searchValue && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" fill="white" />
          <path
            d="M7 17L16.8995 7.10051"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 7.00001L16.8995 16.8995"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};
