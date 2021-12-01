import React from "react";
import { shallow, mount } from "enzyme/build";
import App from "./App";
import Login from "./views/pages/login/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import Employees from "src/views/employees/Employees";
import Reviews from "src/views/reviews/Reviews";
import Review from "src/views/reviews/Review";
import Employee from "src/views/employees/Employee";

it("mounts App without crashing", () => {
  const wrapper = shallow(<App />);
  wrapper.unmount();
});

it("mounts Login without crashing", () => {
  const wrapper = mount(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  wrapper.unmount();
});

it("mounts Employees without crashing", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Employees />
    </Provider>
  );
  wrapper.unmount();
});

it("mounts Reviews without crashing", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Reviews />
    </Provider>
  );
  wrapper.unmount();
});

it("mounts Employee without crashing", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Employee />
    </Provider>
  );
  wrapper.unmount();
});

it("mounts Review without crashing", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Review />
    </Provider>
  );
  wrapper.unmount();
});
