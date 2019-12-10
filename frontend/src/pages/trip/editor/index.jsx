import { Alert, Button, Card, Descriptions, Icon, message } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageLoading from '../../../components/PageLoading';
import { fetchTrip } from '../actions';
import TripEditModal from '../components/TripEditModal';
import TripTable from '../components/TripTable';
import { saveTrip } from './actions';
import './style.css';

class TripEditor extends Component {
  componentDidMount() {
    const tripId = localStorage.getItem('trip-token');
    this.props.fetchTrip(tripId);
  }

  handleNewTrip = () => {
    localStorage.removeItem('trip-token');
    this.props.fetchTrip(null);
  };

  handleSaveTrip = data => {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.saveTrip(data);
    } else {
      message.warn('Please login first!');
    }
  };

  renderContent() {
    const { trip, history } = this.props;
    const { isLoading, data } = trip;
    const { tripId, name, summary, date, owner } = data;
    const link = `${window.location.host}/trips/${tripId}`;
    if (isLoading) {
      return <PageLoading />;
    }
    return (
      <>
        <Card bordered={false}>
          <Button.Group className="trip-editor-options">
            <Button onClick={this.handleNewTrip}>Start New</Button>
            <TripEditModal data={data} />
            {owner === null ? (
              <Button onClick={() => this.handleSaveTrip(data)}>Save</Button>
            ) : (
              <Button>
                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                Saved
              </Button>
            )}
          </Button.Group>
          <Descriptions title="Trip Info">
            <Descriptions.Item label="Name">{name}</Descriptions.Item>
            <Descriptions.Item label="Summary">{summary}</Descriptions.Item>
            <Descriptions.Item label="Date">
              {date ? moment(date).format('MMM DD, YYYY') : null}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card bordered={false} style={{ marginBottom: 24 }}>
          <h4>
            <Icon type="link" style={{ marginRight: 10 }} />
            <Link to={`/trips/${tripId}`}>{link}</Link>
          </h4>
        </Card>
        <Card bordered={false}>
          <TripTable data={data} editable />
          <Button type="primary" style={{ marginTop: 24 }} onClick={() => history.push('/places')}>
            <Icon type="plus" />
            Add a Place
          </Button>
        </Card>
      </>
    );
  }

  render() {
    const {
      trip: { error },
    } = this.props;

    return (
      <>
        <h5 className="trip-editor-header">Trip Builder</h5>
        <div className="trip-editor-container">
          {error ? <Alert message={error.statusText} type="error" /> : null}
          {this.renderContent()}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ editTrip, auth }) => ({
  trip: editTrip,
  auth,
});

export default connect(mapStateToProps, { fetchTrip, saveTrip })(TripEditor);
