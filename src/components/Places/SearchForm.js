import React, { Component } from "react";
import { Input, Button, Icon } from "antd";

class SearchForm extends Component {
  state = {
    place_search: null,
    location_search: null
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("received values of form", this.state);
  };
  render() {
    return (
      <Input.Group size="large" compact>
        <Input
          style={{ width: "50%" }}
          addonBefore="Find"
          placeholder="restaurants"
          onChange={e => this.setState({ place_search: e.target.value })}
          onPressEnter={this.handleSubmit}
        />
        <Input
          style={{ width: "40%" }}
          addonBefore="Near"
          placeholder="address, neighborhood, city, state, or zip"
          onChange={e => this.setState({ location_search: e.target.value })}
          onPressEnter={this.handleSubmit}
        />
        <Button size="large" type="primary" onClick={this.handleSubmit}>
          <Icon type="search" />
        </Button>
      </Input.Group>
    );
  }
}
export default SearchForm;
