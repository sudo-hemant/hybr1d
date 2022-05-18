import React, { useEffect, useRef } from "react";

const Body = ({
  searchText,
  currentPage,
  setCurrentPage,
  searchQueryResult,
  setSearchQueryResult,
}) => {
  const containerRef = useRef(null);

  const options = {
    rootMargin: "100px",
    threshold: 0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const lastChild = entries[0];
      if (!lastChild.isIntersecting) return;

      // NOTE: CALL API AND LOAD MORE DATA
      setCurrentPage(currentPage + 1);

      observer.unobserve(lastChild.target);
    }, options);

    if (containerRef.current && containerRef.current.children.length) {
      const childrenNodes = containerRef.current.children;
      observer.observe(childrenNodes[childrenNodes.length - 10]);
    }
  }, [containerRef, searchQueryResult]);

  const searchQueryResultDataList = searchQueryResult;

  return (
    <div className="test" ref={containerRef}>
      {searchQueryResultDataList &&
        searchQueryResultDataList.map((el, i) => {
          return <div key={i}> {el.title} </div>;
        })}
    </div>
  );
};

export default Body;
