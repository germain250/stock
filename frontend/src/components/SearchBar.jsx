import PropTypes from 'prop-types';
import { useState } from 'react';

const SearchBar = ({ products, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value) ||
      (product.categoryName && product.categoryName.toLowerCase().includes(value)) ||
      (product.description && product.description.toLowerCase().includes(value))
    );
    onSearch(filtered);
  };

  return (
    <form className="flex items-center max-w-sm">
      <label htmlFor="search-bar" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search-bar"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          placeholder="Search by name, category, or description..."
          value={query}
          onChange={handleInputChange}
          required
        />
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      categoryName: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
