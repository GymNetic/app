// components/SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Pesquisar exercícios..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button className="search-button">
                    <FaSearch />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;