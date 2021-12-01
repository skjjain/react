import { employeeFields } from "src/data/masters";

export function renderEmployeeOptions() {
  let options = employeeFields["role"]["values"].map((e) => (
    <option value={e.k}>{e.v}</option>
  ));
  return <>{options}</>;
}
