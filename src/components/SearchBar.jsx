import { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { useCitySearch } from '../hooks/useWeather';
import './SearchBar.css';

export default function SearchBar({ onCitySelect, currentCity }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { results, loading, search } = useCitySearch();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.length >= 2) {
        search(query);
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, search]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    onCitySelect(city);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="search-bar" ref={wrapperRef}>
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          id="city-search"
          className="search-input"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          aria-label="Search for a city"
          aria-autocomplete="list"
          aria-expanded={isOpen}
        />
        {query && (
          <button className="clear-btn" onClick={handleClear} aria-label="Clear search">
            <X size={18} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="search-results">
          {loading ? (
            <div className="search-loading">Searching...</div>
          ) : results.length > 0 ? (
            results.map((city) => (
              <button
                key={`${city.latitude}-${city.longitude}`}
                className="search-result-item"
                onClick={() => handleSelect(city)}
                aria-label={`Select ${city.name}, ${city.country}`}
              >
                <MapPin size={16} />
                <span className="city-name">
                  {city.name}
                  {city.admin1 && <span className="admin1">, {city.admin1}</span>}
                </span>
                <span className="country">{city.country}</span>
              </button>
            ))
          ) : (
            <div className="search-no-results">No cities found</div>
          )}
        </div>
      )}
    </div>
  );
}
