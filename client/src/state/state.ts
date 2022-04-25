import { atom } from "recoil";
import { joinInfo } from "./typeDefs";

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

export const materialList = atom<string[]>({
  key: "materialList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
