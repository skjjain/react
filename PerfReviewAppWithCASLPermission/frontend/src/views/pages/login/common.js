import { employeeFields } from "src/data/masters";

export function renderUsers(employees) {
  let options = employees.map((e) => {
    let selected = employeeFields["role"].values.filter((d) => d.k == e.role);

    return (
      <option value={e.emp_id} key={e.emp_id}>
        {e.name} ({e.emp_id}) / {selected[0]["v"]}
      </option>
    );
  });
  return <>{options}</>;
}
