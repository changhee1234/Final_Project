import React, { useState } from "react";
import axios from "axios";

function BlogSearch() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/naver/blog?query=${query}`);
            setSearchResults(response.data.items);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <input
                className={'form-control'}
                type="text"
                placeholder="검색어 입력"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <button className={'btn btn-primary'} onClick={handleSearch}>검색</button>
            <div>
                <h2>검색 결과:</h2>
                <ul>
                    {searchResults.map((item, index) => (
                        <li key={index}>
                            <h3 dangerouslySetInnerHTML={{ __html: item.title }}></h3>
                            <p>
                                블로그 주소: <a href={item.bloggerlink}>{item.bloggername}</a>
                            </p>
                            <p>
                                작성일: {item.postdate}
                            </p>
                            <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                            <hr />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BlogSearch;
