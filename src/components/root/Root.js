import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import { ROUTES } from "./root.constants";
import { Home, ItemDetail } from "./lazyLoad/routes.lazyload";
import NotFound from "../separate/NotFound";

const Root = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={Home} />
          <Route path={ROUTES.POST_DETAIL} element={ItemDetail} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Root;
