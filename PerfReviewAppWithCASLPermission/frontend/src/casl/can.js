import { Ability, AbilityBuilder } from "@casl/ability";
import store from "../redux/store";
import { Redirect } from "react-router-dom";
const ability = new Ability();

export function ProtectedComponent(props) {
  if (ability.can(props.action, props.subject)) {
    return props.children;
  } else {
    return "";
  }
}

export function ProtectedRoute(props) {
  if (ability.can("route", props.path)) {
    return props.children;
  } else {
    return <Redirect path="/" />;
  }
}

store.subscribe(() => {
  let auth = store.getState().AuthReducers;
  ability.update(defineRulesFor(auth));
});

const defineRulesFor = (auth) => {
  const permissions = auth.permissions;
  const { can, cannot, rules } = new AbilityBuilder();
  // This logic depends on how the
  // server sends you the permissions array
  if (permissions) {
    permissions.forEach((p) => {
      if (p.permission) {
        can(p.action, p.object);
      } else {
        cannot(p.action, p.object);
      }
    });
  }

  return rules;
};
