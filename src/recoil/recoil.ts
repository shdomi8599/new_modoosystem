import { RecoilEnv, atom } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const headerNavState = atom({
  key: "headerNavState",
  default: false,
});

export const routerLoadingState = atom({
  key: "routerLoadingState",
  default: false,
});

export const searchState = atom({
  key: "searchState",
  default: { category: "", searchVal: "" },
});

export const adminEndPointState = atom({
  key: "adminEndPointState",
  default: "installStatuses",
});

export const isAdminLoginedState = atom({
  key: "isAdminLoginedState",
  default: false,
});

export const adminRequestIdState = atom({
  key: "adminRequestIdState",
  default: "",
});
