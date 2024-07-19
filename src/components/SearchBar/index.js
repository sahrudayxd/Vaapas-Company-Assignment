import { IoSearch } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";
import "./index.css";

const SearchBar = (props) => {
  const { searchInput, onSetSearchInput, onClearSearchInput, onHandleSearch } =
    props;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onHandleSearch();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onHandleSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-icon">
        <IoSearch color="#000" size={22} />
      </div>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchInput}
        onChange={onSetSearchInput}
        onKeyDown={handleKeyDown}
      />

      {searchInput.length > 0 && (
        <button
          type="button"
          className="search-clear-button"
          onClick={onClearSearchInput}
        >
          <MdOutlineClear color="#000" size={24} />
        </button>
      )}

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
