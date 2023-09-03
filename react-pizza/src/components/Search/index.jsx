import { SearchContext } from "../../App";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useContext, useRef, useState, useCallback } from "react";

export function Search() {
  const inputRef = useRef();
  const [value, setValue] = useState("");
  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const updateSearch = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    []
  );
  const onChangeInputValue = (e) => {
    setValue(e.target.value);
    updateSearch(e.target.value);
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
}
