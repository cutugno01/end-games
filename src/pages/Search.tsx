//*| Components

const Search = () => {
  return (
    <div>
      <div className="search">
        <div className="search-bar">
          <div className="search-bar-decoration">
            <svg
              className="search-bar-decoration-border-left"
              height="100%"
              viewBox="0 0 45 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M44.5 26C37 23 26.5 0 0 0V26H44.5Z" fill="#EC2C45" />
            </svg>
            <svg
              className="search-bar-decoration-border-right"
              height="100%"
              viewBox="0 0 45 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M44.5 26C37 23 26.5 0 0 0V26H44.5Z" fill="#EC2C45" />
            </svg>
          </div>
          <svg
            className="search-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="search-bar-input"
            type="text"
            placeholder="Search game..."
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
