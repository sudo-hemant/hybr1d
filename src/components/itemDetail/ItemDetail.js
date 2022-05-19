import React, { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";
import { Tag, Divider } from "antd";
import axios from "axios";

import { ITEM_DETAIL_API } from "../api/api.constants";
import Comments from "./comments";

import "./itemDetail.css";

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
      setItemDetail(data);

      // console.log("item detail");
      // console.log(data);

      // // temporary
      // const childrens = data.children;
      // console.log(childrens.length);

      // const handleChildrenFilter = (children) => {
      //   console.log(children.text);
      //   return children.type === "comment" && children.text;
      // };

      // const filteredChildrens = childrens.filter(handleChildrenFilter);
      // setChildrens(filteredChildrens);
      // console.log(filteredChildrens);
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
        <div> Loading ... </div>
      ) : (
        <div className="item-detail">
          <div className="heading-container">
            {/* <div className="item-title"> */}
            {heading}
            {/* </div> */}

            {/* <div className="item-points"> */}
            <Tag color="#f50"> {points}</Tag>
            {/* </div> */}
          </div>

          <div className="comments-container">
            <Comments comments={itemDetail.children} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
