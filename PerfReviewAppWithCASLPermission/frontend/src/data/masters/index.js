export const employeeFields = {
  name: {
    type: "text",
    label: "Name",
  },
  email: {
    type: "text",
    label: "Email",
  },
  role: {
    type: "select",
    label: "Role",
    values: [
      { k: "1", v: "Admin" },
      { k: "2", v: "Employee" },
    ],
  },
};

export const reviewFields = {
  name_from: { type: "employee", label: "From", id: "from_emp" },
  name_to: { type: "employee", label: "To", id: "to_emp" },
  year: { type: "text", label: "Year" },
  quarter: { type: "text", label: "Quarter" },
  remarks: { type: "text", label: "Remarks" },
  rating: {
    type: "select",
    label: "Ratings",
    values: [
      { k: "5", v: "Exceeds Expectation" },
      { k: "3", v: "Meets Expectation" },
      { k: "1", v: "Below Expectation" },
    ],
  },
  status: {
    type: "select",
    label: "Status",
    values: [
      { k: "1", v: "Assigned" },
      { k: "2", v: "Submitted" },
    ],
  },
};
