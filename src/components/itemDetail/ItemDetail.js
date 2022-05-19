import React, { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";
import { Tag } from "antd";
import axios from "axios";

import { ITEM_DETAIL_API } from "../api/api.constants";
import Comments from "./comments";
import Loading from "../separate/Loading";

import "./itemDetail.css";

import { data } from "./dummy";

const ItemDetail = () => {
  const [loading, setLoading] = useState(false);
  const [itemDetail, setItemDetail] = useState({});

  const params = useParams();
  const itemId = params?.id;

  const fetchItemDetail = useCallback(async () => {
    console.log("api hit");
    setLoading(true);

    try {
      const response = await axios.get(`${ITEM_DETAIL_API}/${itemId}`);
      const data = response.data;
      console.log(data);
      setItemDetail(data);
    } catch (error) {
      console.error("error");
      console.log(error);
    }

    setLoading(false);
  }, [itemId]);

  useEffect(() => {
    fetchItemDetail();
  }, []);
  // }, [fetchItemDetail]);

  const heading = setItemDetail
    ? itemDetail.title || itemDetail.story_title
    : "";
  const points = setItemDetail ? itemDetail.points : "";

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="item-detail">
          <div className="heading-container">
            {/* <div className="item-title"> */}
            <h1>
              <span className="points-tag">
                <Tag color="#ff6600"> {points}</Tag>
              </span>
              {heading}
            </h1>
            {/* </div> */}

            {/* <div className="item-points"> */}

            {/* </div> */}
          </div>

          {/* <hr /> */}

          <div className="comments-container">
            <hr />
            <h2>
              <b>Comments : </b>
            </h2>
            <Comments comments={itemDetail.children} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
