import React, {useState} from "react";
import {InputWrapper} from "@component/common/section/modUser/ModUserSection";
import styled from "styled-components";
import {useCurrentUserQuery, useUserInfoMutation} from "@query/MemberQuery";

const INIT_COMMENT: string = "회원님의 소중한 정보 보호를 위해 비밀번호를 확인해주세요";

export const LoadingArea = () => {
    return <Loading>
        <span></span>
        <span></span>
        <span></span>
    </Loading>
}

const ReCheckPw = (props: { setIsReCheckPw: (isCheck: boolean) => void }) => {

    const [typing, setTyping] = useState<string>("")
    const {data: userInfo} = useCurrentUserQuery();
    const [helpMsg, setHelpMsg] = useState<string>(INIT_COMMENT);

    const {mutate, isPending} = useUserInfoMutation(
        (msg: string) => {
            setHelpMsg(msg)
        },
        (res: boolean) => {
            if (res) {
                console.log(" success !! login!! ")
                props.setIsReCheckPw(true)
            }
        },
        () => {
            alert("로그인이 실패하였습니다")
        },
    );

    const onKeyUpHandler = (key: string) => {
        if (typing.length === 0) {
            setHelpMsg(INIT_COMMENT)
        }

        if (key === "Escape") {
            setHelpMsg(INIT_COMMENT)
            return setTyping("");
        }

        if (key === "Enter") {
            if (typing.length === 0) {
                setHelpMsg("비밀번호를 입력하지 않았습니다.");
                return;
            }

            if (typing.length > 0) {
                mutate({id: userInfo!.email, pw: typing})
            }
            return;
        }
    }

    const confirmBtnClickHandler = () => {
        if (typing.length === 0) {
            setHelpMsg(INIT_COMMENT)
        }

        if (typing.length === 0) {
            setHelpMsg("비밀번호를 입력하지 않았습니다.");
            return;
        }

        if (typing.length > 0) {
            mutate({id: userInfo!.email, pw: typing})
        }
        return;
    }

    return (
        <ReCheckWrapper>
            <StSubArea>
                <SubTitle>{isPending ? LoadingArea() : helpMsg}</SubTitle>
                <StReCheckRow>
                    <InputWrapper>
                        <StReCheckInput
                            autoFocus={true}
                            autoComplete={"off"}
                            minLength={5}
                            maxLength={25}
                            type={"password"}
                            id={`USER_RE_CHECK_PW`}
                            value={typing}
                            onKeyUp={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onKeyUpHandler(e.key)
                            }}
                            onChange={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setTyping(e.target.value)
                            }}
                            placeholder={"비밀번호를 입력해주세요."}
                        />
                    </InputWrapper>
                    <ConfirmBtn onClick={() => confirmBtnClickHandler()}>확인</ConfirmBtn>
                </StReCheckRow>
            </StSubArea>
        </ReCheckWrapper>
    )
}

export default ReCheckPw

const ReCheckWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const StReCheckInput = styled.input`
    height: 40px;
    display: inline-block;
    padding-left: 10px;
    border: 2px solid #769FCD;
    border-radius: 3px;
    width: 410px;
    font-size: 17px;
`

const StReCheckRow = styled.div`
    display: flex;
    align-content: flex-start;
    height: 45px;
    margin-bottom: 15px;
    align-items: center;
    justify-content: space-around;
    gap: 40px;
`

const StSubArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 1094px;
    height: 827px;
    border: 2px solid #769FCD;
    border-radius: 10px;
`

const SubTitle = styled.h3`
    display: inline;
    text-align: center;
    align-items: center;
    padding: 10px 0;
    width: 568px;
    height: 30px;
    background-color: #e7f3ff;
    border: 1px solid #93b7e4;
    border-radius: 4px;
    margin: 0 0 40px 0;
    color: #769fcd;
`

export const Loading = styled.div`
    span {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #4D4D4D;
        border-radius: 50%;
        animation: loading 1.3s 0s linear infinite;
        margin: 2px;
    }

    span:nth-child(1) {
        animation-delay: 0s;
    }

    span:nth-child(2) {
        animation-delay: 0.2s;
    }

    span:nth-child(3) {
        animation-delay: 0.4s;
    }
`

const ConfirmBtn = styled.button`
    display: flex;
    width: 106px;
    height: 54px;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    border-radius: 5px;
    transition: all 150ms ease-out;
    cursor: pointer;
    border: none;
    font-size: 18px;
    //margin-left: 30px;

    color: #FFFFFF;
    background-color: #769FCD;

    &:hover {
        background-color: #93B7E4;
    }

    &:active {
        background-color: #769FCD;
    }
`
