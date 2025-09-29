import {FieldName, FieldRow, InputWrapper} from "@component/common/section/modUser/ModUserSection";
import {LoadingArea} from "@component/common/section/modUser/ReCheckPw";
import React, {useEffect, useMemo, useState} from "react";
import {StModBtn} from "@component/common/section/modUser/preview/ModUserInfoArea";
import {useCurrentUserQuery, useModUserNickMutation} from "@query/MemberQuery";
import {TStatus} from "@type/common.types";
import {QueryKeys} from "@query/QueryKeys";
import {useViewStoreActions} from "@store/viewStore";
import {useQueryClient} from "@tanstack/react-query";
import useDebounce from "@hook/useDebounce";
import {DEBOUNCE_DELAY} from "@config/common.const";
import {validationSpecialChar, validationXSS} from "@utils/commons";
import {IValid, TErrorMsg} from "@type/user.types";
import styled from "styled-components";

interface IProps {
    userEmail: string,
    userNick: string,
}

const UserNick = ({userEmail, userNick}: IProps) => {
    const INIT_VALID: { msg: TErrorMsg, isValid: boolean } = {msg: "", isValid: false};

    const queryClient = useQueryClient();
    const {refetch} = useCurrentUserQuery();
    const viewStoreActions = useViewStoreActions();

    const {mutate: modifyUserNick, isPending: isPendingUserNick} = useModUserNickMutation(
        (res: boolean) => successHandler(res, "mod"),
        (errorCd?: string | number, msg?: string | undefined | unknown) => failHandler("mod", errorCd, msg)
    )

    const [valid, setValid] = useState<{ msg: TErrorMsg, isValid: boolean }>(INIT_VALID);
    const [typing, setTyping] = useState<string>(userNick ? userNick : "")

    const debounceTyping = useDebounce<string>(typing, DEBOUNCE_DELAY);

    useEffect(() => {
        if (debounceTyping.length === 0) {
            setValid(INIT_VALID)
            return;
        } else {
            const test = validUserNick;
            console.log("userNick ", userNick, "test    ", test, "debounce    ", debounceTyping)
        }


    }, [debounceTyping])

    const validUserNick: IValid = useMemo(() => {
        const lengthPattern = /^.{2,10}$/;
        const lengthValid = lengthPattern.test(debounceTyping);
        if (!lengthValid) {
            return {msg: "2글자 이상 10글자 이내 여야 합니다.", isValid: false};
        }

        const xssValid: boolean = validationXSS(debounceTyping);
        const specialCharValid: boolean = validationSpecialChar(debounceTyping);
        if (!xssValid || !specialCharValid) {
            return {msg: "특수 문자가 포함되어 있습니다.", isValid: false};
        }

        return {msg: "", isValid: true};
    }, [debounceTyping]);

    const modifyUserNickBtnClickHandler = () => {
        if (valid.isValid) {
            console.log("valid.isValid ", valid.isValid);
            // modifyUserNick()
        }
    }

    const successHandler = (res: boolean, status: TStatus) => {
        if (res) {
            viewStoreActions.setToastStatus({status: "success", msg: `닉네임이 성공적으로 ${status === "add" ? "등록" : "변경"}되었습니다.`})
            queryClient.invalidateQueries({queryKey: [QueryKeys.member.me]})
            refetch();
        }
    }

    const failHandler = (status: TStatus, res?: string | number, msg?: string | undefined | unknown,) => {
        viewStoreActions.setToastStatus({
            status: "failed",
            msg: `(${res ?? 405}) ${msg ? msg : `${status === "add" ? "등록" : "변경"} 요청에 실패하였습니다.`}`
        })
    }

    return (
        <FieldRow $isFirst={true}>
            <FieldName htmlFor={`USER_NICK`}
                       $height={"45px"}
                       $width={"125px"}
                       $padding={"0 0 0 5px"}
            >
                닉네임
            </FieldName>
            <InputWrapper>
                <StNick
                    id={`USER_NICK`}
                >
                    {typing}
                </StNick>
                <StModBtn
                    $ml={"10px"}
                    disabled={valid.isValid}
                    onClick={() => modifyUserNickBtnClickHandler()}
                >
                    {isPendingUserNick ? LoadingArea() : "수정"}
                </StModBtn>
            </InputWrapper>
        </FieldRow>
    )
}

export default UserNick

const StNick = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 304px;
    height: 44px;
    border-bottom: 2px solid #769FCD;
    margin-left: 10px;
    font-size: 17px;
`
