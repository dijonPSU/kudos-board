import React, { useState } from 'react';
import { useSearch } from './SearchContext.jsx';

export default function Search() {
    const [search, setSearch] = useState('');
    const { updateSearchQuery, clearSearchQuery } = useSearch();

    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            clearSearchQuery();
        }
    }

    const handleSubmit = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        updateSearchQuery(search);
    }

    const handleClear = () => {
        setSearch('');
        clearSearchQuery();
    }

    return (
        <div className="search-bar">
            <input
                value={search}
                onChange={handleSearch}
                placeholder="Search boards by title"
            />
            <button onClick={handleSubmit}>Search</button>
            <button onClick={handleClear} className="clear">Clear</button>
        </div>
    )
}
