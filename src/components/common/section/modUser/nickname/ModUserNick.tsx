import styled from "styled-components";
import {FieldName, FieldRow, InputWrapper} from "@component/common/section/modUser/ModUserSection";
import {StModBtn} from "@component/common/section/modUser/preview/ModUserInfoArea";
import {LoadingArea} from "@component/common/section/modUser/ReCheckPw";
import React, {useEffect, useMemo, useState} from "react";
import {IValid, TModUserTab} from "@type/user.types";
import {useQueryClient} from "@tanstack/react-query";
import {useCurrentUserQuery, useModUserNickMutation, useUserNickDupCheck} from "@query/MemberQuery";
import {useViewStoreActions} from "@store/viewStore";
import useDebounce from "@hook/useDebounce";
import {DEBOUNCE_DELAY} from "@config/common.const";
import {validationSpecialChar, validationXSS} from "@utils/commons";
import {TStatus} from "@type/common.types";
import {QueryKeys} from "@query/QueryKeys";

interface IProps {
    userEmail: string,
    userNick: string,
    setStep: (step: TModUserTab) => void,
}

const ModUserNick = ({userEmail, userNick, setStep}: IProps) => {

    const INIT_VALID: IValid = {errorMsg: "", isValid: false};

    const queryClient = useQueryClient();
    const {refetch} = useCurrentUserQuery();
    const viewStoreActions = useViewStoreActions();

    const {mutate: modifyUserNick, isPending: isPendingUserNick} = useModUserNickMutation(
        (res: boolean) => successHandler(res, "mod"),
        (errorCd?: string | number, msg?: string | undefined | unknown) => failHandler("mod", errorCd, msg)
    )

    const [typing, setTyping] = useState<string>(userNick ? userNick : "")

    const debounceTyping = useDebounce<string>(typing, DEBOUNCE_DELAY);


    // 기본 형식 검증 함수 (useMemo 외부로 분리)
    const isValidFormat = (nickname: string): boolean => {
        const lengthPattern = /^.{2,13}$/;
        const lengthValid = lengthPattern.test(nickname);
        if (!lengthValid) return false;

        const xssValid: boolean = validationXSS(nickname);
        const specialCharValid: boolean = validationSpecialChar(nickname);
        return !(xssValid || specialCharValid);
    };

    // 중복 체크는 debounceTyping이 변경되고 기본 검증을 통과한 경우에만 실행
    const shouldCheckDup = useMemo(() => {
        return debounceTyping.length > 0 &&
            userNick !== debounceTyping &&
            isValidFormat(debounceTyping);
    }, [debounceTyping, userNick]);

    const {data: checkDup, isSuccess} = useUserNickDupCheck(
        shouldCheckDup ? debounceTyping : ""
    );

    // 최종 검증 결과를 useMemo로 계산
    const validationResult: IValid = useMemo(() => {
        console.log("useMemo 실행 - debounceTyping:", debounceTyping);

        // 빈 값이거나 원래 닉네임과 같으면 초기 상태
        if (debounceTyping.length === 0 || userNick === debounceTyping) {
            return INIT_VALID;
        }

        // 길이 검증
        const lengthPattern = /^.{2,13}$/;
        const lengthValid = lengthPattern.test(debounceTyping);
        if (!lengthValid) {
            return {errorMsg: "2글자 이상 13글자 이내 여야 합니다.", isValid: false};
        }

        // XSS 및 특수문자 검증
        const xssValid: boolean = validationXSS(debounceTyping);
        const specialCharValid: boolean = validationSpecialChar(debounceTyping);
        if (xssValid || specialCharValid) {
            return {errorMsg: "특수 문자가 포함되어 있습니다.", isValid: false};
        }

        // 중복 검사 결과 확인 (API 호출이 완료된 경우에만)
        if (shouldCheckDup && isSuccess) {
            return checkDup ?
                {isValid: true} :
                {isValid: false, errorMsg: "사용할 수 없는 닉네임입니다."};
        }

        // API 호출 중이거나 아직 결과가 없는 경우
        return {isValid: false, errorMsg: ""};

    }, [debounceTyping, userNick, shouldCheckDup, checkDup, isSuccess]);

    useEffect(() => {
        console.log('validationResult 변경:', validationResult);
    }, [validationResult]);

    const modifyUserNickBtnClickHandler = () => {
        if (validationResult.isValid) {
            modifyUserNick({userEmail: userEmail, userNick: debounceTyping})
        }
    }

    const successHandler = (res: boolean, status: TStatus) => {
        console.log("res: boolean, status: TStatus ", res, status)
        if (res) {
            queryClient.invalidateQueries({queryKey: [QueryKeys.member.me]})
                .then(() => refetch())
                .then(() => setStep("default"))
                .then(() => viewStoreActions.setToastStatus({status: "success", msg: `닉네임이 성공적으로 ${status === "add" ? "등록" : "변경"}되었습니다.`}));
        }
    }

    const failHandler = (status: TStatus, res?: string | number, msg?: string | undefined | unknown,) => {
        viewStoreActions.setToastStatus({
            status: "failed",
            msg: `(${res ?? 405}) ${msg ? msg : `${status === "add" ? "등록" : "변경"} 요청에 실패하였습니다.`}`
        })
    }

    const hasError = !validationResult.isValid && validationResult.errorMsg !== "";

    return (
        <StModUserNickWrapper>
            <FieldRow $isFirst={true}>
                <FieldName htmlFor={`USER_NICK`}
                           $height={"45px"}
                           $width={"85px"}
                           $padding={"0 0 0 5px"}
                >
                    닉네임
                </FieldName>
                <InputWrapper>
                    <StNickInput
                        $hasError={hasError}
                        autoComplete={"off"}
                        id={`USER_NICK`}
                        value={typing}
                        onChange={(e) => setTyping(e.target.value)}
                    />
                    <StModBtn
                        $ml={"10px"}
                        disabled={!validationResult.isValid}
                        onClick={() => modifyUserNickBtnClickHandler()}
                    >
                        {isPendingUserNick ? LoadingArea() : "수정"}
                    </StModBtn>
                </InputWrapper>
            </FieldRow>
            <StErrorMsg $hasError={hasError}>
                {hasError ? validationResult.errorMsg : debounceTyping === userNick ? "" : `사용 가능한 닉네임입니다.`}
            </StErrorMsg>
        </StModUserNickWrapper>
    )
}

export default ModUserNick

const StModUserNickWrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 1700px;
    height: 753px;
    padding-bottom: 130px;
`

export const StNickInput = styled.input<{ $hasError?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 304px;
    height: 44px;
    border-radius: 5px;
    padding-left: 10px;
    margin-left: 10px;
    font-size: 17px;

    border: ${({$hasError}) => $hasError ? "2px solid #FF7777" : "2px solid #769FCD"};

    &:focus {
        border: ${({$hasError}) => $hasError ? "2px solid #FF7777" : "2px solid #769FCD"};
        outline: none;
    }
`

export const StErrorMsg = styled.span<{ $hasError: boolean }>`
    display: table;
    font-size: 16px;
    text-align: center;
    width: 550px;
    height: 25px;
    //margin-top: -15px;
    color: ${({$hasError}) => $hasError ? "#FF7777" : "#769FCD"};
`
