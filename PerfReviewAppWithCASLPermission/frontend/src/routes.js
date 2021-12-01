import React from "react";
const Employees = React.lazy(() => import("./views/employees/Employees"));
const Employee = React.lazy(() => import("./views/employees/Employee"));
const EmployeeEdit = React.lazy(() => import("./views/employees/EmployeeEdit"));
const EmployeeAdd = React.lazy(() => import("./views/employees/EmployeeAdd"));

const Reviews = React.lazy(() => import("./views/reviews/Reviews"));
const Review = React.lazy(() => import("./views/reviews/Review"));
const ReviewEdit = React.lazy(() => import("./views/reviews/ReviewEdit"));
const ReviewAdd = React.lazy(() => import("./views/reviews/ReviewAdd"));
const ReviewSubmit = React.lazy(() => import("./views/reviews/ReviewSubmit"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/employees",
    exact: true,
    name: "List of Employees",
    component: Employees,
  },
  {
    path: "/employee/add",
    exact: true,
    name: "Add Employee",
    component: EmployeeAdd,
  },
  { path: "/employee/:id", exact: true, name: "Employee", component: Employee },
  {
    path: "/employee/:id/edit",
    exact: true,
    name: "Edit",
    component: EmployeeEdit,
  },
  {
    path: "/reviews",
    exact: true,
    name: "List of Reviews",
    component: Reviews,
  },
  {
    path: "/review/add",
    exact: true,
    name: "Add Review",
    component: ReviewAdd,
  },
  { path: "/review/:id", exact: true, name: "Review", component: Review },
  {
    path: "/review/:id/edit",
    exact: true,
    name: "Edit",
    component: ReviewEdit,
  },
  {
    path: "/review/:id/submit",
    exact: true,
    name: "Submit Feedback",
    component: ReviewSubmit,
  },
];

export default routes;
