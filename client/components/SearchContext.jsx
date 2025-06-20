import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);


export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');


    const updateSearchQuery = (query) => {
        setSearchQuery(query);
    };

    const clearSearchQuery = () => {
        setSearchQuery('');
    };

    // Value object to be provided 
    const value = {
        searchQuery,
        updateSearchQuery,
        clearSearchQuery
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};
