import { Button, Result } from "antd";
import { push } from "connected-react-router";
import React from "react";
import { connect } from "react-redux";

const NoFoundPage = props => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => props.push("/")}>
        Back Home
      </Button>
    }
  ></Result>
);

export default connect(null, { push })(NoFoundPage);
