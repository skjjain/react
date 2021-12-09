import { Ability, AbilityBuilder } from "@casl/ability";
import store from "../redux/store";
import { Redirect } from "react-router-dom";
const ability = new Ability();

export function Can(props) {
  if (ability.can(props.I, props.A)) {
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
      if (p.can) {
        can(p.i, p.a);
      } else {
        cannot(p.i, p.a);
      }
    });
  }

  return rules;
};
