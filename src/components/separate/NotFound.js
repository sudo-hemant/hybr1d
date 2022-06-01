import React, { Fragment, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./notFound.css";

const NotFound = () => {
  useEffect(() => {
    toast(`Page Not Found.`, { type: "error" });
  }, []);

  return (
    <Fragment>
      <div className="not-found-container">Error: Page Not Found ...</div>
      <ToastContainer />
    </Fragment>
  );
};

export default NotFound;
