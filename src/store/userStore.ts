import { create } from "zustand";
import { IJoinPayload, IJoinValid } from "@type/user.types";
import {INIT_JOIN_PAYLOAD, INIT_JOIN_VALID} from "@config/join.const";

interface IUserStore {
  joinPayload: IJoinPayload;
  setJoinPayload: (arg: IJoinPayload) => void;

  joinValid: IJoinValid;
  setJoinValid: (arg: IJoinValid) => void;

  verifyCode: { cd: string[]; getCodes: () => string; valid: () => boolean };
  setVerifyCode: (arg: string[]) => void;

  // 초기화
  setInitState: () => void;
}

const useUserStore = create<IUserStore>((set) => ({
  joinPayload: INIT_JOIN_PAYLOAD,
  setJoinPayload: (arg: IJoinPayload) => set(() => ({ joinPayload: arg })),

  joinValid: INIT_JOIN_VALID,
  setJoinValid: (arg: IJoinValid) => set(() => ({ joinValid: arg })),

  // verifyCode: [],
  verifyCode: {
    cd: [],
    getCodes: (): string => {
      return useUserStore.getState().verifyCode.cd.join().replace(/,/g, "");
    },
    valid: (): boolean => {
      return (
        useUserStore.getState().verifyCode.cd.join().replace(/,/g, "")
          .length === 6
      );
    },
  },
  setVerifyCode: (arg: string[]) =>
    set(() => ({
      verifyCode: { ...useUserStore.getState().verifyCode, cd: arg },
    })),

  setInitState: () =>
    set(() => ({
      joinPayload: INIT_JOIN_PAYLOAD,
      joinValid: INIT_JOIN_VALID,
      verifyCode: {
        cd: [],
        getCodes: (): string => {
          return useUserStore.getState().verifyCode.cd.join().replace(/,/g, "");
        },
        valid: (): boolean => {
          return (
            useUserStore.getState().verifyCode.cd.join().replace(/,/g, "")
              .length === 6
          );
        },
      },
    })),
}));

export default useUserStore;
