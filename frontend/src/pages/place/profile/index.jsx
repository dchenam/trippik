import { Alert, Button, Card, Col, Icon, Row } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import PageLoading from "../../../components/PageLoading";
import { deletePlace } from "../actions";
import { fetchPlace } from "./actions";
import BusinessInfo from "./components/BusinessInfo";
import "./style.css";

class PlaceProfile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPlace(id);
  }

  renderContent() {
    const { auth, place, deletePlace, history } = this.props;
    const { data, isLoading } = place;
    if (isLoading) {
      return <PageLoading />;
    }
    if (data) {
      return (
        <div>
          <Row gutter={20}>
            <Col span={16} className="place-general-info">
              <BusinessInfo data={data} />
            </Col>
            <Col span={8} className="place-location-info">
              <Card>
                <h4>Location</h4>
                <Icon type="compass" /> {data.location.display_address}
              </Card>
            </Col>
          </Row>
          {auth.user && auth.user.username === data.owner ? (
            <Button onClick={() => deletePlace(data.place_id, history)}>
              Delete
            </Button>
          ) : null}
        </div>
      );
    }
  }

  render() {
    const { error } = this.props.place;
    return (
      <div className="place-profile-container">
        {error ? <Alert message={error.statusText} type="error" /> : null}
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, place }) => {
  return { auth, place };
};

export default connect(mapStateToProps, { deletePlace, fetchPlace })(
  PlaceProfile
);
