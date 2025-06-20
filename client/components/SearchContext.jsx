import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const updateSearchQuery = (query) => {
        setSearchQuery(query);
    };

    const clearSearchQuery = () => {
        setSearchQuery('');
    };

    const updateCategory = (category) => {
        setSelectedCategory(category);
    };

    // Value object to be provided
    const value = {
        searchQuery,
        updateSearchQuery,
        clearSearchQuery,
        selectedCategory,
        updateCategory
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};
