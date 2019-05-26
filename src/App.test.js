import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = shallow(<App />);
});

it("should show mode selection at the start", () => {
  expect(wrapper.state("mode")).toBe(null);
  expect(wrapper.find(".mode-section").length).toBe(1);
});

it("should show mode selection at the start", () => {
  expect(wrapper.state("mode")).toBe(null);
  expect(wrapper.find(".round-section").length).toBe(0);
});

describe("renderGameSection", () => {
  let wrapper;
  wrapper = shallow(<App />);
  wrapper.find(".mode-pvc").simulate("click");

  it("should show game section when mode is selected", () => {
    expect(wrapper.state("mode")).toBe("PVC");
    expect(wrapper.find(".mode-section").length).toBe(0);
    expect(wrapper.find(".game-section").length).toBe(1);
  });

  it("should render game sub sections properly", () => {
    expect(wrapper.find(".player1-section").length).toBe(1);
    expect(wrapper.find(".player2-section").length).toBe(1);
    expect(wrapper.find(".game-timer-section").length).toBe(1);
  });

  it("should see move selection for PVC", () => {
    expect(wrapper.state("mode")).toBe("PVC");
    expect(wrapper.find(".player-select-move").length).toBe(1);
  });

  it("should see player1CurrentMove when move is selected", () => {
    wrapper.find(".player-select-rock").simulate("click");
    expect(wrapper.state("player1CurrentMove")).toBe("rock");
  });
});

describe("renderResultsSection", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
    wrapper.find(".mode-pvc").simulate("click");
    wrapper.find(".player-select-rock").simulate("click");
    wrapper.setState({ roundOutcome: "rock" });
  });

  it("should see results", () => {
    expect(wrapper.state("roundOutcome")).toBe("rock");
    expect(wrapper.find(".results-section").length).toBe(1);
    expect(wrapper.find(".results-text").length).toBe(1);
  });

  it("should allow next round if play again is selected", () => {
    expect(wrapper.find(".round-reset").length).toBe(1);
    expect(wrapper.state().roundOutcome).toBe("rock");
    wrapper.find(".round-reset").simulate("click");
    expect(wrapper.state().roundOutcome).toBe(null);
    expect(wrapper.find(".results-section").length).toBe(0);
    expect(wrapper.find(".player-select-move").length).toBe(1);
  });

  it("should bring to mode screen if back is selected", () => {
    expect(wrapper.find(".back-to-mode").length).toBe(1);
    wrapper.find(".back-to-mode").simulate("click");
    expect(wrapper.state("mode")).toBe(null);
    expect(wrapper.find(".mode-section").length).toBe(1);
    expect(wrapper.find(".game-section").length).toBe(0);
  });
});
