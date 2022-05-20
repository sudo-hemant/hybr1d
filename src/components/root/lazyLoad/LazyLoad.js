import React, { Fragment, lazy, Suspense } from "react";

const renderLoader = () => <div> ...loading </div>;

const LazyLoad = (fn) => {
  const Component = lazy(fn);
  return (
    <Fragment>
      <Suspense fallback={renderLoader()}>
        <Component />
      </Suspense>
    </Fragment>
  );
};

export default LazyLoad;
