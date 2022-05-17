import React, {useState} from "react";

import { Input } from "antd";

import "./home.css";

const Home = () => {

  const [searchText, setSearchText] = useState('')

  const handleSearchTextChange = (e) => {
    console.log(e)
    setSearchText(e.target.value)
  }

  const handleEnterOnSearchBar = () => {
    console.log('enter')
  }


  return (
    <div>
      <div className="home-header">
          <Input
            className="home-header-input-antd"

            value={searchText}

            onChange={handleSearchTextChange}
            onPressEnter={handleEnterOnSearchBar}
            placeholder="type something to search Hacker news"
          />
      </div>

      <div className="home-body">
        
      </div>
    </div>
  );
};

export default Home;
