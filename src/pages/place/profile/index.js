import Axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Divider } from "antd";
import BusinessInfo from "./components/BusinessInfo";
import { deletePlace } from "../actions";

function PlaceProfile(props) {
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
        <Row>
          <Col span={16} className="place-general-info">
            <BusinessInfo place={data.place} />
          </Col>
          <Col span={8} className="place-location-info">
            <h4>Business Hours</h4>
            <Divider />
          </Col>
        </Row>
        <Button
          type="danger"
          onClick={() => props.deletePlace(id, props.history)}
        >
          Delete
        </Button>
      </div>
    );
  }
}
const mapStateToProps = ({ places: { error } }) => {
  return { error };
};
export default connect(mapStateToProps, { deletePlace })(PlaceProfile);
