import React from "react";
import axios from "axios";

import sinon from "sinon";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import TripList from "./TripList";

configure({ adapter: new Adapter() });
describe("TripList", () => {
  const result = {
    data: {
      places: []
    }
  };
  const promise = Promise.resolve(result);
  beforeAll(() => {
    sinon
      .stub(axios, "get")
      .withArgs("http://localhost:3000/places/")
      .returns(promise);
  });
  afterAll(() => {
    axios.get.restore();
  });
  it("renders data when it fetched data successfully", done => {});
  it("stores data in local state", done => {});
});
