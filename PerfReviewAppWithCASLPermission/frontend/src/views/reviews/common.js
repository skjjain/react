import { reviewFields } from "src/data/masters";

export function renderEmployees(employees) {
  let options = employees.map((e) => (
    <option value={e.emp_id} key={e.emp_id}>
      {e.name} ({e.emp_id})
    </option>
  ));
  return <>{options}</>;
}

export function renderRatings() {
  let options = reviewFields["rating"].values.map((e) => (
    <option value={e.k} key={e.k}>
      {e.v}
    </option>
  ));
  return <>{options}</>;
}
