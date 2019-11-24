import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Icon } from "antd";
import { searchPlace } from "../../actions";

class SearchForm extends Component {
  state = {
    term: null,
    location: null
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.searchPlace(this.state);
  };
  render() {
    return (
      <Input.Group size="large" compact>
        <Input
          style={{ width: "50%" }}
          addonBefore="Find"
          placeholder="restaurants"
          onChange={e => this.setState({ term: e.target.value })}
          onPressEnter={this.handleSubmit}
        />
        <Input
          style={{ width: "40%" }}
          addonBefore="Near"
          placeholder="address, neighborhood, city, state, or zip"
          onChange={e => this.setState({ location: e.target.value })}
          onPressEnter={this.handleSubmit}
        />
        <Button size="large" type="primary" onClick={this.handleSubmit}>
          <Icon type="search" />
        </Button>
      </Input.Group>
    );
  }
}
export default connect(null, { searchPlace })(SearchForm);
