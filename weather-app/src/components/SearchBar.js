import { Search } from 'lucide-react';
import '../styles/SearchBar.css';

export default function SearchBar({ city, setCity, handleSearch }) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(city);
  };

  return (
    <form onSubmit={onSubmit} className="search-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="search-input"
      />
      <button type="submit" className="search-button">
        <Search size={18} className="search-icon" />
        Search
      </button>
    </form>
  );
}