import {IValid, TErrorMsg, TModUserTab} from "@type/user.types";
import {useQueryClient} from "@tanstack/react-query";
import {useChangePwMutation, useCurrentUserQuery} from "@query/MemberQuery";
import {useViewStoreActions} from "@store/viewStore";
import {TStatus} from "@type/common.types";
import {QueryKeys} from "@query/QueryKeys";
import styled from "styled-components";
import {FieldName, FieldRow, InputWrapper} from "@component/common/section/modUser/ModUserSection";
import {LoadingArea} from "@component/common/section/modUser/ReCheckPw";
import React, {useEffect, useMemo, useState} from "react";
import {StErrorMsg, StNickInput} from "@component/common/section/modUser/nickname/ModUserNick";
import {isEqual, validationPw} from "@utils/commons";
import useDebounce from "@hook/useDebounce";

interface IProps {
    userEmail: string,
    setStep: (step: TModUserTab) => void,
}

const ModUserPassword = ({userEmail, setStep}: IProps) => {

    const [typing, setTyping] = useState<{
        email: string,
        pw: string,
        newPw: string,
        confirmPw: string,
    }>({
        email: userEmail,
        pw: "",
        newPw: "",
        confirmPw: "",
    });

    const queryClient = useQueryClient();
    const {refetch} = useCurrentUserQuery();
    const viewStoreActions = useViewStoreActions();

    const {mutate: modifyUserPw, isPending: isPendingUserNick} = useChangePwMutation(
        (res: boolean) => successHandler(res, "mod"),
        (errorCd?: string | number, msg?: string | undefined | unknown) => failHandler("mod", errorCd, msg)
    )

    const successHandler = (res: boolean, status: TStatus) => {
        if (res) {
            queryClient.invalidateQueries({queryKey: [QueryKeys.member.me]})
                .then(() => refetch())
                .then(() => setStep("default"))
                .then(() => viewStoreActions.setToastStatus({status: "success", msg: `비밀번호가 성공적으로 ${status === "add" ? "등록" : "변경"}되었습니다.`}));
        }
    }

    const failHandler = (status: TStatus, res?: string | number, msg?: string | undefined | unknown,) => {
        viewStoreActions.setToastStatus({
            status: "failed",
            msg: `(${res ?? 405}) ${msg ? msg : `${status === "add" ? "등록" : "변경"} 요청에 실패하였습니다.`}`
        })
    }

    // 최종 검증 결과를 useMemo로 계산

    const validationResult: IValid = useMemo(() => {
        const {pw, newPw, confirmPw} = typing;

        // 1. 기본 빈 값 검사
        if (pw === "" && newPw === "" && confirmPw === "") {
            return {isValid: false, errorMsg: ""};
        }
        // 2. 기존 비밀번호 필수 입력 검사
        if (pw === "") {
            return {isValid: false, errorMsg: "기존 비밀번호란을 입력해주세요."};
        }

        // 3. 신규 비밀번호 검증
        if (newPw === "") {
            return {isValid: false, errorMsg: "신규 비밀번호란을 입력해주세요."};
        }

        const newPwValidationError: TErrorMsg = validationPw(newPw);
        if (newPwValidationError !== "") {
            return {isValid: false, errorMsg: newPwValidationError};
        }

        // 4. 비밀번호 확인 검증
        if (confirmPw === "") {
            return {isValid: false, errorMsg: "비밀번호 확인란을 입력해주세요."};
        }
        if (!isEqual(newPw, confirmPw)) {
            return {isValid: false, errorMsg: "비밀번호가 일치하지 않습니다."};
        }

        // 5. 기존 비밀번호와 신규 비밀번호 동일성 검사
        if (isEqual(pw, newPw)) {
            return {isValid: false, errorMsg: "기존 비밀번호와 다른 비밀번호를 입력해주세요."};
        }

        // 모든 검증 통과
        return {isValid: true, errorMsg: ""};
    }, [typing]);

    const hasError = !validationResult.isValid && validationResult.errorMsg !== "";

    const modifyUserNickBtnClickHandler = () => {
        if (validationResult.isValid) {
            modifyUserPw({userEmail: typing.email, pw: typing.pw, newPw: typing.newPw});
        }
    }

    useEffect(() => {
        console.log("typing ", typing);
    }, [typing])

    const debounceErrorMsg = useDebounce<string>((validationResult?.errorMsg && validationResult?.errorMsg) ? validationResult.errorMsg : "", 2000);

    return (
        <StModUserNickWrapper>
            <FieldRow $isFirst={true}>
                <FieldName htmlFor={`USER_PASSWORD`}
                           $height={"45px"}
                           $width={"105px"}
                           $padding={"0 0 0 5px"}
                >기존 비밀번호</FieldName>
                <InputWrapper>
                    <StNickInput
                        type={"password"}
                        autoComplete={"off"}
                        id={`USER_PASSWORD`}
                        value={typing.pw}
                        onChange={(e) => setTyping({...typing, pw: e.target.value})}
                    />
                </InputWrapper>
            </FieldRow>
            <FieldRow>
                <FieldName htmlFor={`USER_NEW_PASSWORD`}
                           $height={"45px"}
                           $width={"105px"}
                           $padding={"0 0 0 5px"}
                >신규 비밀번호</FieldName>
                <InputWrapper>
                    <StNickInput
                        type={"password"}
                        autoComplete={"off"}
                        id={`USER_NEW_PASSWORD`}
                        value={typing.newPw}
                        onChange={(e) => setTyping({...typing, newPw: e.target.value})}
                    />
                </InputWrapper>
            </FieldRow>
            <FieldRow $isLast={true}>
                <FieldName htmlFor={`USER_CONFIRM_PASSWORD`}
                           $height={"45px"}
                           $width={"105px"}
                           $padding={"0 0 0 5px"}
                >비밀번호 확인</FieldName>
                <InputWrapper>
                    <StNickInput
                        type={"password"}
                        autoComplete={"off"}
                        id={`USER_CONFIRM_PASSWORD`}
                        value={typing.confirmPw}
                        onChange={(e) => setTyping({...typing, confirmPw: e.target.value})}
                    />
                </InputWrapper>
            </FieldRow>
            <StModPasswordBtn
                type={"button"}
                $ml={"10px"}
                disabled={!validationResult.isValid}
                onClick={() => modifyUserNickBtnClickHandler()}
            >
                {isPendingUserNick ? LoadingArea() : "변경"}
            </StModPasswordBtn>
            <StModPasswordErrorMsg $hasError={debounceErrorMsg !== ""}>
                {debounceErrorMsg ? debounceErrorMsg : ""}
            </StModPasswordErrorMsg>
        </StModUserNickWrapper>
    )
}

export default ModUserPassword

const StModUserNickWrapper = styled.form`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 1700px;
    height: 753px;
    padding-bottom: 130px;
`

const StModPasswordErrorMsg = styled(StErrorMsg)`
    margin-top: 15px;
`

const StModPasswordBtn = styled.button<{ $ml: string }>`
    display: flex;
    height: 44px;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    border-radius: 5px;
    transition: all 150ms ease-out;
    cursor: pointer;
    border: none;
    font-size: 18px;
    width: 96px;
    margin-left: ${({$ml}) => $ml ? $ml : "340px"};

    background-color: #769FCD;
    color: #FFFFFF;

    &:hover {
        background-color: #93B7E4;
    }

    &:active {
        background-color: #769FCD;
    }

    &:disabled {
        background-color: #AAAAAA;
        cursor: not-allowed;
    }
`