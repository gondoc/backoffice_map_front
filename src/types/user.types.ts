export interface IUserInfo {
    email: string,
    nick: string,
    createAt: string,
    updateAt?: string,
    recoveryEmail: string,
    role: string,
    password?: string,
    isVerifyRcvryEmail: boolean,
}

export interface ILoginPayload {
    id: string;
    pw: string;
}

export interface IJoinPayload {
    userEmail: string;
    userPw: string;
    userPwConfirm: string;
    userNick: string;
}

export interface IJoinValid {
    topPhase: number;
    phase: number;
    email: IValid;
    pw: IValid;
    pwConfirm: IValid;
    emailVerify: IValid;
    nick: IValid;
}

export interface IValid {
    isValid: boolean;
    errorMsg?: TErrorMsg;
    time?: number;
}

export type TUser = "member" | "admin";

export type TErrorMsg =
    | ""
    | "유효하지 않은 인증번호입니다."
    | "중복된 아이디입니다."
    | "이미 등록된 이메일 주소입니다."
    | "사용할 수 없는 이메일 주소입니다."
    | "영문자 혹은 영문자와 숫자로 이루어져야 합니다."
    | "사용할 수 없는 닉네임입니다."
    | "한글 혹은 특수 문자가 포함되어 있습니다."
    | "특수 문자가 포함되어 있습니다."
    | "비밀번호가 일치하지 않습니다."
    | "이메일 주소 형식과 맞지 않습니다."
    | "2글자 이상 13글자 이내 여야 합니다." // 닉네임
    | "6글자 이상 15글자 이내 여야 합니다." // 비밀번호
    // 비밀번호 변경
    | "기존 비밀번호란을 입력해주세요."
    | "신규 비밀번호란을 입력해주세요."
    | "비밀번호 확인란을 입력해주세요."
    | "기존 비밀번호와 다른 비밀번호를 입력해주세요."
    | "신규 비밀번호를 입력해주세요."
    | "오류가 발생했습니다. 잠시후 시도 바랍니다."
    | "숫자만 입력된 아이디는 사용할 수 없습니다."
    | "영문자와 숫자, 그리고 1글자 이상의 특수문자가 포함되어야 합니다.";

export type TModUserTab =
    | "nickname"
    | "password"
    | "recoveryEmail"
    | "default";
