import { Ability, AbilityBuilder } from "@casl/ability";
import store from "../redux/store";

const ability = new Ability();

export default (action, subject) => {
  return ability.can(action, subject);
};

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
