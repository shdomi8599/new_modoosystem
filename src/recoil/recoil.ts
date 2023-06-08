import { RecoilEnv, atom } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const headerNavState = atom({
  key: "headerNavState",
  default: false,
});

export const currentPageNameState = atom({
  key: "currentPageNameState",
  default: "",
});
