import {TStatus} from "@type/common.types";
import {ILocation, IRegisterForm} from "@type/location.types";
import Url from "@config/url";
import {ICategory} from "@type/categories.types";
import {IHistRegisterForm} from "@type/hist.types";
import dayjs from "dayjs";
import {TErrorMsg} from "@type/user.types";
import {useMemo} from "react";

export const parseStatus = (status: TStatus) => {
    switch (status) {
        case "none":
            return "관리"
        case "add":
            return "등록"
        case "mod":
            return "수정"
        default :
            return ""
    }
}

export const findNavLabel = (label: string, status: TStatus | undefined): string => {
    if (label.includes("관리") && status) {
        return label.replace("관리", parseStatus(status));
    } else {
        return label;
    }
}

export const validateIsWriting = (currentForm: IRegisterForm) => {
    return currentForm.name.trim().length !== 0 ||
        currentForm.x.trim().length !== 0 ||
        currentForm.y.trim().length !== 0;
}

export const validateCategoryRegForm = (currentForm: ICategory) => {
    return currentForm.nm.trim().length !== 0 &&
        currentForm.content.trim().length !== 0;
}

/**
 * 사용자가 작성한 histRegForm 에 대해서 검증하는 함수
 * 검증 실패시 false 를 반환하고, 검증 성공시 true 를 반환한다.
 * @param currentForm
 * @return boolean type
 */
export const validateHistRegForm = (currentForm: IHistRegisterForm): boolean => {
    const inputResult: boolean = validateInputs(currentForm);
    if (!inputResult) return false;
    const dtmValid: boolean = validateHistDtmRegForm(currentForm);
    if (!dtmValid) return false;
    return true;
}


const validateInputs = (currentForm: IHistRegisterForm) => {
    return currentForm.histNm.trim().length > 5 &&
        currentForm.siteId.trim().length > 0 &&
        currentForm.cateId.trim().length > 0 &&
        Number(currentForm.staffCnt) > 0;
}

export const validateHistDtmRegForm = (currentForm: IHistRegisterForm): boolean => {
    const st: string | undefined = currentForm.startDtm
    const ed: string | undefined = currentForm.endDtm

    // 자료 타입 확인
    if (typeof st === "undefined" || typeof ed === "undefined") return false;

    // 문자열 길이 확인
    if (st.trim().length <= 0 || ed.trim().length <= 0) return false;

    // 정규식 확인
    const dtmRegex: RegExp = /^(\d{4})-(\d{2})$/;
    const stResult: boolean = dtmRegex.test(st).valueOf();
    const edResult: boolean = dtmRegex.test(ed).valueOf();
    if (!(stResult && edResult)) return false;

    // 년월 변수화
    const stDtmStrArr: string[] = st.split("-");
    const stYear: number = Number(stDtmStrArr[0]);
    const stMonth: number = Number(stDtmStrArr[1]);
    const edDtmStrArr: string[] = ed.split("-");
    const edYear: number = Number(edDtmStrArr[0]);
    const edMonth: number = Number(edDtmStrArr[1]);

    // 작성값 확인 년, 월 - 00 일 경우
    if (stMonth === 0 || edMonth === 0) return false;

    // 작성값 확인 년 - 시작년이 종료년보다 클 경우 검증
    if (stYear > edYear) return false;

    // 작성값 확인 월 - 12 보다 클 경우
    if (stMonth > 12 || edMonth > 12) return false;

    // 값이 같을 경우 한달 짜리 프로젝트로 가정하고 검증 통과 처리
    if (st === ed) return true;

    const stDayJs = dayjs(st, "YYYY-MM");
    const edDayJs = dayjs(ed, "YYYY-MM");

    // 작성값 확인 년, 월 - 시작일, 종료일 비교
    const isBefore: boolean = stDayJs.isBefore(edDayJs).valueOf();
    if (!isBefore) return false;

    return true;
}

export const validateChangedForm = (originForm: IRegisterForm | null, newForm: IRegisterForm): boolean => {
    return JSON.stringify({
        name: originForm?.name,
        x: originForm?.x,
        y: originForm?.y,
        file: originForm?.file,
    }) !== JSON.stringify({
        name: newForm?.name,
        x: newForm?.x,
        y: newForm?.y,
        file: newForm?.file,
    });
}


export const findFile = async (site: ILocation) => {
    const response = await fetch(Url.IMAGE(site.id, site.logoImgPath));
    const blob = await response.blob();
    return new File([blob], site.logoImgPath, {type: blob.type});
}

export const makePayload = async (site: ILocation): Promise<IRegisterForm> => {
    return {
        id: site.id,
        name: site.nm,
        x: site.lng,
        y: site.lat,
        fileName: site.logoImgPath,
        isShow: true,
        file: site?.logoImgPath ? await findFile(site) : undefined,
    };
};

export const validationXSS = (typing: string): boolean => {
    const xssPattern = /<[^>]*>|["'`]|(on\w+=)|(javascript:)/gi;
    return xssPattern.test(typing);
}

export const validationSpecialChar = (typing: string): boolean => {
    return /[!@#$%^&*(),.?":;={}|<>]/.test(typing);
}

export const isEqual = (value1: string, value2: string): boolean => {
    return JSON.stringify(value1) === JSON.stringify(value2);
};

export const isNumeric = (typing: string) => {
    return typing.trim() !== "" && !isNaN(Number(typing.trim()));
};

export const typingNumCheck = (key: string) => {
    const checkRegex: RegExp = /[^0-9]/g;
    return key.replace(checkRegex, "");
};

export const validationPw = (userPw: string): TErrorMsg => {
    // 기본 상태
    // if (userPw.length === 0) {
    //     validFailed("");
    //     return false;
    // }

    // 1. 길이 검사: 6글자 이상 15글자 이내
    if (userPw.length < 6 || userPw.length > 15) {
        return "6글자 이상 15글자 이내 여야 합니다.";
    }

    // 2. 비밀번호 구성 검사: 영문, 숫자, 특문 조합
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(userPw);
    const hasLetter = /[A-Za-z]/.test(userPw);
    const hasNumber = /[0-9]/.test(userPw);
    if (!(hasSpecialChar && hasLetter && hasNumber)) {
        return "영문자와 숫자, 그리고 1글자 이상의 특수문자가 포함되어야 합니다.";
    }

    return '';
}

export const validationNick = (userNick: string): TErrorMsg => {
    // 1. 길이 검사: 2글자 이상 10글자 이내 여야 합니다.
    if (userNick.length < 6 || userNick.length > 15) {
        return "2글자 이상 13글자 이내 여야 합니다.";
    }

    // 2. 비밀번호 구성 검사: 영문, 숫자, 특문 조합
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(userNick);
    const hasLetter = /[A-Za-z]/.test(userNick);
    const hasNumber = /[0-9]/.test(userNick);
    if (!(hasSpecialChar && hasLetter && hasNumber)) {
        return "영문자와 숫자, 그리고 1글자 이상의 특수문자가 포함되어야 합니다.";
    }

    return '';
}
