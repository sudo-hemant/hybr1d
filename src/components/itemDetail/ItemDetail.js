import React, { useState, useEffect, useCallback } from "react";

import { Tag } from "antd";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { ITEM_DETAIL_API } from "../api/api.constants";
import Comments from "./comments";
import Loading from "../separate/Loading";

import "react-toastify/dist/ReactToastify.css";
import "./itemDetail.css";

const ItemDetail = () => {
  const [loading, setLoading] = useState(false);
  const [itemDetail, setItemDetail] = useState({});

  const params = useParams();
  const itemId = params?.id;

  const displayError = () => {
    toast(`Error in question !`, { type: "error" });
  };

  const fetchItemDetail = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${ITEM_DETAIL_API}/${itemId}`);
      const data = response.data;
      console.log(data);
      setItemDetail(data);
      toast(`Successfully loaded data !`, { type: "success" });
    } catch (error) {
      toast(`Error occured: ${error} !`, { type: "error" });
    }

    setLoading(false);
  }, [itemId]);

  useEffect(() => {
    fetchItemDetail();
  }, [fetchItemDetail]);

  const heading = setItemDetail
    ? itemDetail.title || itemDetail.story_title
    : "";
  const points = setItemDetail ? itemDetail.points : "";

  useEffect(() => {
    if (Object.keys(itemDetail).length && !heading) {
      displayError();
    }
  }, [itemDetail, heading]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="item-detail">
          <div className="heading-container">
            <h1>
              <span className="points-tag">
                {points ? <Tag color="#ff6600"> {points}</Tag> : null}
              </span>

              {heading ? heading : `Question title not found !`}
            </h1>
          </div>

          <div className="comments-container">
            <hr />

            {itemDetail?.children?.length ? (
              <h2>
                <b>Comments : </b>
              </h2>
            ) : (
              <h1> No Comments </h1>
            )}

            <Comments comments={itemDetail.children} />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ItemDetail;
