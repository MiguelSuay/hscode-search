# HSCodeSearch

A fast and efficient search utility for HS Codes. Allows users to search HS codes either by number or description.

## Features

- Numeric and Textual search capability.
- Fast search using Fuse.js under the hood.
- Debounced search, with customizable delay.
- Provides result based on the closeness of the search string.
- Integrated HS code dataset.

## Installation

To install the module, run: 
```bash
npm install HSCodeSearch --save
```

## Example of React Usage

import React, { useState, useEffect } from 'react';
import HSCodeSearch from 'hscode-search';

const HSCodeSearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const searcher = new HSCodeSearch();

    useEffect(() => {
        if (searchTerm) {
            searcher.search(searchTerm, (searchResults) => {
                setResults(searchResults);
            });
        } else {
            setResults([]);
        }
    }, [searchTerm]);

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search HSCode..."
            />
            {results.length > 0 && (
                <ul>
                    {results.map((item, index) => (
                        <li key={index}>
                            {item.HS} - {item.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HSCodeSearchComponent;