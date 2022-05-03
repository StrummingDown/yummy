import { atom } from "recoil";
import { joinInfo } from "../utils/typeDefs";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const modal = atom<boolean>({
  key: "modal",
  default: false,
});

export const signUp = atom<boolean>({
  key: "signUp",
  default: false,
});

export const emailCertiNum = atom<number>({
  key: "emailCertiNum",
  default: 0,
});

export const joinUserInfo = atom<joinInfo>({
  key: "joinUserInfo",
  default: {} as joinInfo,
});

export const allMaterials = atom<string[]>({
  key: "allMaterials",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const title = atom<string>({
  key: "title",
  default: "",
});
export const materialList = atom<string[]>({
  key: "materialList",
  default: [],
});

export const token = atom<string | undefined>({
  key: "token",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const social = atom<string>({
  key: "social",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
