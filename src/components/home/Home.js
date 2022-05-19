import React, { useCallback, useEffect, useState } from "react";

import { Input } from "antd";
import axios from "axios";

import {
  BASE_API,
  PAGE_QUERY,
  SEARCH_QUERY,
  HITS_PER_PAGE_QUERY,
} from "../api/api.constants";
import Body from "./body";

import "./home.css";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [nbPages, setNbPages] = useState(1);
  const [searchQueryResult, setSearchQueryResult] = useState([]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleEnterOnSearchBar = async () => {
    const updatedCurrentPage = 0;
    setCurrentPage(updatedCurrentPage);
    setNbPages(1);

    try {
      const response = await axios.get(
        `${BASE_API}${SEARCH_QUERY}${searchText}${PAGE_QUERY}${updatedCurrentPage}${HITS_PER_PAGE_QUERY}`
      );
      const data = response.data;
      console.log(data);

      if (data && Object.keys(data).length) {
        setNbPages(data.nbPages);
        setSearchQueryResult([...data.hits]);
      }
    } catch (error) {
      console.error("error");
      console.log(error);
    }
  };

  const handleLoadMoreData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BASE_API}${SEARCH_QUERY}${searchText}${PAGE_QUERY}${currentPage}${HITS_PER_PAGE_QUERY}`
      );
      const data = response.data;
      console.log(data);

      if (data && Object.keys(data).length) {
        setNbPages(data.nbPages);
        setSearchQueryResult([...searchQueryResult, ...data.hits]);
      }
    } catch (error) {
      console.error("error");
      console.log(error);
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage && currentPage < nbPages) {
      handleLoadMoreData();
    }
  }, [handleLoadMoreData, currentPage, nbPages]);

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
        <Body
          searchText={searchText}
          setSearchText={setSearchText}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          searchQueryResult={searchQueryResult}
          setSearchQueryResult={setSearchQueryResult}
        />
      </div>
    </div>
  );
};

export default Home;
