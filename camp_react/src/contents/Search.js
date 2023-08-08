import React, { useState } from "react";
import axios from "axios";

function Search(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        const encodedQuery = encodeURIComponent(searchQuery);
        const apiUrl = `http://localhost:8080/search/blog?query=${encodedQuery}`;

        axios
            .get(apiUrl)
            .then((res) => {
                setSearchResults(res.rss.channel);

            })
            .catch((err) => {
                console.error("Error:", err);
            });
    };

    return (
        <div className={'d-flex'}>
            <input
                className={'form-control'}
                type="text"
                placeholder="검색어 입력"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button type={'submit'} className={'btn btn-primary'} onClick={handleSearch}>검색</button>
            <ul>
                {searchResults.map((item) => (
                    <li key={item.link}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search;
