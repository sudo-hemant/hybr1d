import React, { lazy, Suspense } from "react";

const renderLoader = () => <div> ...loading </div>;

const LazyLoad = (fn) => {
  const Component = lazy(fn);
  return (
    <div>
      <Suspense fallback={renderLoader()}>
        <Component />
      </Suspense>
    </div>
  );
};

export default LazyLoad;
