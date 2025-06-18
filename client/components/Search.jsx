import React, { useState } from 'react';

export default function Search() {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    }

    const handleSubmit = () => {
        console.log("Submit clicked");
    }

    const handleClear = () => {
        setSearch('');
        console.log("Clear clicked");
    }

    return (
        <div className="search-bar">
            <input value={search} onChange={handleSearch} placeholder="Search boards" />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    )
}
