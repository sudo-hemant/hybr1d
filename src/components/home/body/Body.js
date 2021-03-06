import React, { Fragment, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import TypeSomethingPage from "../../separate/TypeSomethingPage";

import "./body.css";

const Body = ({ currentPage, setCurrentPage, searchQueryResult }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleItemClick = (e, el) => {
    const itemId = el.objectID;

    if (itemId) {
      navigate(`../item/${itemId}`, { replace: false });
    }
  };

  const options = useMemo(
    () => ({
      rootMargin: "100px",
      threshold: 0,
    }),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const lastChild = entries[0];
      if (!lastChild.isIntersecting) return;

      setCurrentPage(currentPage + 1);
      observer.unobserve(lastChild.target);
    }, options);

    if (containerRef.current && containerRef.current.children.length) {
      const childrenNodes = containerRef.current.children;
      if (childrenNodes.length > 10) {
        observer.observe(childrenNodes[childrenNodes.length - 10]);
      }
    }
  }, [containerRef, currentPage, options, searchQueryResult, setCurrentPage]);

  return (
    <Fragment>
      {searchQueryResult.length > 0 ? (
        <div className="home-body-container" ref={containerRef}>
          {searchQueryResult.map((el, i) => {
            const heading = el.title ? el.title : el.story_title;
            const title =
              heading?.length > 100 ? `${heading.slice(0, 100)}...` : heading;
            const details = ` on ${el.created_at?.slice(0, 10)}, by ${
              el.author
            }`;

            return (
              <button
                key={i}
                className="home-body-element"
                onClick={(e) => handleItemClick(e, el)}
              >
                <h1>{title}</h1>
                <h3>{details}</h3>
              </button>
            );
          })}
        </div>
      ) : (
        <TypeSomethingPage />
      )}
    </Fragment>
  );
};

export default Body;
