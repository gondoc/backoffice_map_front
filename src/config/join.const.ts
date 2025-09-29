import {IJoinPayload, IJoinValid} from "@type/user.types";

export const INIT_JOIN_PAYLOAD: IJoinPayload = {
  userPw: "",
  userPwConfirm: "",
  userEmail: "",
  userNick: "",
};

export const INIT_VALID = {
  isValid: false,
};

export const INIT_JOIN_VALID: IJoinValid = {
  topPhase: 0,
  phase: 0,
  // topPhase: 1,
  // phase: 1,
  // topPhase: 2,
  // phase: 2,
  // topPhase: 3,
  // phase: 3,
  email: INIT_VALID,
  pw: INIT_VALID,
  pwConfirm: INIT_VALID,
  emailVerify: INIT_VALID,
  nick: INIT_VALID,
};
