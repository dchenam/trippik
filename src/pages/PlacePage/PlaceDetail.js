import Axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Button } from "antd";
import BusinessInfo from "../../components/Places/BusinessInfo";
import { deletePlace } from "./actions";

function PlaceDetail(props) {
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

  if (data.error) {
    return <div>{data.error.message}</div>;
  } else if (props.error) {
    return <div>{props.error.message}</div>;
  } else {
    return (
      <div>
        <Button
          type="danger"
          onClick={() => props.deletePlace(id, props.history)}
        >
          Delete
        </Button>
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
}
const mapStateToProps = ({ places: { error } }) => {
  return { error };
};
export default connect(
  mapStateToProps,
  { deletePlace }
)(PlaceDetail);
