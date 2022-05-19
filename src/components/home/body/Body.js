import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./body.css";

const Body = ({
  searchText,
  currentPage,
  setCurrentPage,
  searchQueryResult,
  setSearchQueryResult,
}) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleItemClick = (e, el) => {
    console.log("clicked");
    console.log(el);

    const itemId = el.objectID
    if (itemId) {
      navigate(`../item/${itemId}`, { replace: false, name: 'hemant' });
    }
  };

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
    <div className="body" ref={containerRef}>
      {searchQueryResultDataList &&
        searchQueryResultDataList.map((el, i) => {
          const heading = el.title ? el.title : el.story_title;
          const title =
            heading?.length > 100 ? `${heading.slice(0, 100)}...` : heading;
          const details = ` on ${el.created_at?.slice(0, 10)}, by ${el.author}`;

          return (
            <button
              key={i}
              className="body-element"
              onClick={(e) => handleItemClick(e, el)}
            >
              <p>{title}</p>
              <p>{details}</p>
            </button>
          );
        })}
    </div>
  );
};

export default Body;
