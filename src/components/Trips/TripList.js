import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Table, Divider, Pagination, Spin, Button } from "antd";

const columns = [
  { title: "Time", key: "time" },
  {
    title: "Name",
    key: "name",
    render: item => <Link to={`/places/${item.id}`}>{item.name}</Link>
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Tag",
    key: "tag"
  },
  {
    title: "Action",
    key: "action",
    render: item => (
      <span>
        <Link to={`/places/${item.id}`}>Explore</Link>
        <Divider type="vertical" />
        <a href="/">Delete</a>
      </span>
    )
  }
];

export default class TripList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      isLoading: false,
      error: null
    };
  }

  getPlaces = async () => {
    try {
      const res = await Axios.get("http://localhost:3000/places/");
      this.setState({ places: res.data, isLoading: false });
      console.log(res);
    } catch (error) {
      this.setState({ error: error, isLoading: false });
      console.error(error);
    }
  };

  componentDidMount() {
    // this.setState({ isLoading: true });
    // this.getPlaces();
  }

  render() {
    const { places, isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <Spin />;
    }
    return (
      <>
        <Table
          columns={columns}
          dataSource={places.results}
          pagination={
            <Pagination
              onChange={() => {
                console.log("clicked");
              }}
            ></Pagination>
          }
          rowKey="id"
        ></Table>

        <Button type="primary" href="/places">
          Add a Place
        </Button>
      </>
    );
  }
}
