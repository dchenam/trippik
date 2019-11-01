import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Row, Col } from "antd";
import BusinessInfo from "../../components/Places/BusinessInfo";

export default function PlaceDetail() {
  const { id } = useParams();
  const url = `/api/places/${id}`;
  const [data, setData] = useState({
    place: [],
    isFetching: false,
    error: null
  });

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await Axios.get(url);
        setData({ place: res.data, isFetching: false });
      } catch (error) {
        setData({ error: error, isFetching: false });
      }
    };
    fetchPlace();
  }, [url]);

  console.log(data);

  return (
    <div>
      <Row>
        <Col span={16} style={{ padding: "2em" }}>
          <BusinessInfo place={data.place}></BusinessInfo>
        </Col>
        <Col span={8} style={{ background: "green" }}>
          <h1>Business Hours</h1>
        </Col>
      </Row>
    </div>
  );
}
