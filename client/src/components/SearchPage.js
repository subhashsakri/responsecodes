import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';

const validResponseCodes = [100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 218, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 428, 429, 430, 431, 440, 444, 449, 450, 451, 460, 463, 464, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 520, 521, 522, 523, 524, 525, 526, 527, 529, 530, 561, 598, 599, 999];

const SearchPage = () => {
  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [filteredCodes, setFilteredCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    filterResponseCodes(searchCode);
  }, [searchCode]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://http.dog/${searchCode}`);
      setSearchResult(`https://http.dog/${searchCode}.jpg`);
    } catch (error) {
      console.error(error);
      setSearchResult(null);
    }
  };

  const filterResponseCodes = (code) => {
    let filtered = [];
    if (code === '1xx') {
      filtered = validResponseCodes.filter(c => String(c).startsWith('1'));
    } else if (code === '2xx') {
      filtered = validResponseCodes.filter(c => String(c).startsWith('2'));
    } else if (code === '3xx') {
      filtered = validResponseCodes.filter(c => String(c).startsWith('3'));
    } else if (code === '4xx') {
      filtered = validResponseCodes.filter(c => String(c).startsWith('4'));
    } else if (code === '5xx') {
      filtered = validResponseCodes.filter(c => String(c).startsWith('5'));
    } else if (code === '9xx') {
      filtered = validResponseCodes.filter(c => String(c).startsWith('9'));
    } else if (code.endsWith('x')) {
      filtered = validResponseCodes.filter(c => String(c).startsWith(code.slice(0, 2)));
    } else {
      filtered = validResponseCodes.filter(c => String(c) === code);
    }
    setFilteredCodes(filtered.map(c => String(c)));
  };
  

  

  const handleSaveList = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.post('/api/lists', {
        name: 'New List',
        responseCodes: filteredCodes,
        userId: user._id
      });
      navigate('/lists');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-page">
      <div className="search-page__container">
        <div className="search-page__input-container">
          <input
            type="text"
            placeholder="Enter response code (e.g., 200, 20x, 2xx)"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="search-page__input"
          />
          <button onClick={handleSearch} className="search-page__button">
            Search
          </button>
        </div>
        <div className="search-page__result-container">
          {searchResult && (
            <div className="search-page__result">
              <img src={searchResult} alt={`HTTP ${searchCode}`} className="search-page__image" />
            </div>
          )}
          <div className="search-page__result-list">
            {filteredCodes.map((code, index) => (
              <div key={index} className="search-page__result">
                <span className="search-page__code">{code}</span>
                <img src={`https://http.dog/${code}.jpg`} alt={`HTTP ${code}`} className="search-page__image" />
              </div>
            ))}
          </div>
          <button onClick={handleSaveList} className="search-page__button">
            Save List
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

