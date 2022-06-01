import React, { useCallback, useEffect, useState } from "react";

import { Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import {
  BASE_API,
  PAGE_QUERY,
  SEARCH_QUERY,
  HITS_PER_PAGE_QUERY,
} from "../api/api.constants";
import Body from "./body";
import NoResultsFound from "../separate/NoResultsFound";
import Loading from "../separate/Loading";

import "react-toastify/dist/ReactToastify.css";
import "./home.scss";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [nbPages, setNbPages] = useState(1);
  const [searchQueryResult, setSearchQueryResult] = useState([]);
  const [noResultFound, setNoResultFound] = useState(false);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleEnterOnSearchBar = async () => {
    const updatedCurrentPage = 0;
    setIsLoading(true);
    setCurrentPage(updatedCurrentPage);
    setNbPages(1);

    try {
      const response = await axios.get(
        `${BASE_API}${SEARCH_QUERY}${searchText}${PAGE_QUERY}${updatedCurrentPage}${HITS_PER_PAGE_QUERY}`
      );
      const data = response.data;

      if (data && Object.keys(data).length) {
        setNoResultFound(false);
        setNbPages(data.nbPages);
        setSearchQueryResult([...data.hits]);
      }
      if (
        !Object.keys(data).length ||
        !(Array.isArray(data.hits) && data.hits.length)
      ) {
        setNoResultFound(true);
        toast(`No Results Found`, { type: "error" });
      }
    } catch (error) {
      setNoResultFound(true);
      toast(`Error occured: ${error}`, { type: "error" });
    }

    setIsLoading(false);
  };

  const handleLoadMoreData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BASE_API}${SEARCH_QUERY}${searchText}${PAGE_QUERY}${currentPage}${HITS_PER_PAGE_QUERY}`
      );
      const data = response.data;

      if (data && Object.keys(data).length && data.hits.length) {
        data.nbPages && setNbPages(data.nbPages);
        setSearchQueryResult([...searchQueryResult, ...data.hits]);
      }
    } catch (error) {
      toast(`Error occured: ${error}`, { type: "error" });
    }
  }, [currentPage, searchQueryResult, searchText]);

  useEffect(() => {
    if (currentPage && currentPage < nbPages) {
      handleLoadMoreData();
    }
  }, [handleLoadMoreData, currentPage, nbPages]);

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-header-title">
          <h1> Search Hacker News </h1>
        </div>

        <Input
          className="home-header-input-antd"
          value={searchText}
          onChange={handleSearchTextChange}
          onPressEnter={handleEnterOnSearchBar}
          placeholder="type something to search Hacker news"
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : noResultFound ? (
        <NoResultsFound />
      ) : (
        <Body
          searchText={searchText}
          setSearchText={setSearchText}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          searchQueryResult={searchQueryResult}
          setSearchQueryResult={setSearchQueryResult}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default Home;
