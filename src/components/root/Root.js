import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import { ROUTES } from "./root.constants";
import { Home } from "./routes.lazyload";
import NotFound from "./NotFound";

const Root = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={Home} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Root;
