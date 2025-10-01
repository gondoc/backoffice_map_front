import {TModUserTab} from "@type/user.types";
import styled from "styled-components";
import {useCurrentRecoveryMailQuery, useCurrentUserQuery, useRcvryEmailMutation} from "@query/MemberQuery";
import React, {useMemo, useState} from "react";
import {FieldName, FieldRow, InputWrapper} from "@component/common/section/modUser/ModUserSection";
import {StModBtn} from "@component/common/section/modUser/preview/ModUserInfoArea";
import {LoadingArea} from "@component/common/section/modUser/ReCheckPw";
import {StNickInput} from "@component/common/section/modUser/nickname/ModUserNick";
import {TStatus} from "@type/common.types";
import {useViewStoreActions} from "@store/viewStore";
import {DialogRightBtn} from "@component/common/dialog/DialogArea";
import {isEqual} from "@utils/commons";
import useDebounce from "@hook/useDebounce";
import {DEBOUNCE_DELAY} from "@config/common.const";

interface IProps {
    setStep: (step: TModUserTab) => void,
    recoveryMail: string,
}

const ModUserRcvryEmail = ({setStep, recoveryMail}: IProps) => {

    const {data: userInfo, isSuccess: userFetchSuccess, refetch} = useCurrentUserQuery();
    const viewStoreActions = useViewStoreActions();
    const [helpMsg, setHelpMsg] = useState<string>("");
    const {mutate: reqRcvryEmail, isPending} = useRcvryEmailMutation(
        (res: boolean) => successHandler(res, "mod"),
        (errorCd?: string | number, msg?: string | undefined | unknown) => failHandler("mod", errorCd, msg)
    );

    const [typing, setTyping] = useState<string>(recoveryMail);
    const debounceTyping = useDebounce<string>(typing, DEBOUNCE_DELAY);

    const validRcvryEmail = useMemo(() => {
        if (debounceTyping.length === 0) {
            setHelpMsg("");
            return false;
        }

        if (!userFetchSuccess) {
            setHelpMsg("");
            return false;
        }

        if (isEqual(debounceTyping, userInfo?.email)) {
            setHelpMsg("접속 계정으로는 복구용 이메일로 등록 할 수 없습니다.");
            return false;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailPatternCheck = emailPattern.test(debounceTyping);
        if (!emailPatternCheck) {
            setHelpMsg("이메일 형식과 맞지 않습니다.");
            return false;
        }

        return true;
    }, [userFetchSuccess, debounceTyping, userInfo]);

    const successHandler = (res: boolean, status: TStatus) => {
        if (res) {
            viewStoreActions.setDialogStatus({
                title: "복구 이메일 등록 · 변경",
                msg: "복구용 이메일 주소로 안내 메일이 발송되었어요.\n메일함을 확인해주세요!",
                isOpen: true,
                isJustConfirm: false,
                status: "mod",
                leftBtn: <></>,
                rightBtn: <>
                    <DialogRightBtn
                        $status={"mod"}
                        onClick={() => {
                            refetch()
                                .then(() => viewStoreActions.initDialogStatus())
                                .finally(() => setStep("default"))
                        }}
                    >이동</DialogRightBtn>
                </>,
                noCloseBtn: true,
            })
        }
    }

    const failHandler = (status: TStatus, res?: string | number, msg?: string | undefined | unknown,) => {
        viewStoreActions.setToastStatus({
            status: "failed",
            msg: `(${res ?? 405}) ${msg ? msg : `${status === "add" ? "등록" : "변경"} 요청에 실패하였습니다.`}`
        })
    }

    const reqRcvryEmailBtnClickHandler = () => {
        if (!userFetchSuccess || !validRcvryEmail) {
            return;
        }

        reqRcvryEmail({email: userInfo?.email, rcvryEmail: typing});
    }

    return (
        <StModUserRcvryEmailWrapper>

            <StNotiArea>
                <StTitle $height={"20px"}>
                    {
                        <StNotiMsg><StUserEmail>{userInfo?.nick}</StUserEmail> 님의 계정은 <StUserEmail>{userInfo?.email}</StUserEmail>입니다.</StNotiMsg>
                    }
                </StTitle>
                {
                    !userInfo?.recoveryEmail ?
                        <StNotiMsg>추후 아이디 찾기, 비밀번호 재설정을 위한 복구 이메일을 등록해주세요!</StNotiMsg> :
                        <StTitle $height={"20px"}>
                            <StNotiMsg>현재 복구용 이메일 주소가 등록 되어있습니다.</StNotiMsg>
                        </StTitle>
                }
            </StNotiArea>

            <StAreaWrapper>
                <FieldRow $isFirst={true}>
                    <FieldName htmlFor={`USER_RCVRY_EMAIL`}
                               $height={"45px"}
                               $width={"105px"}
                               $padding={"0 0 0 5px"}
                    >
                        복구용<br/>
                        이메일 주소
                    </FieldName>
                    <InputWrapper>
                        <StNickInput
                            autoFocus={true}
                            autoComplete={"off"}
                            id={`USER_RCVRY_EMAIL`}
                            value={typing}
                            placeholder={"복구용 이메일 주소를 입력해주세요"}
                            onChange={(e) => setTyping(e.target.value)}
                        />
                        <StModBtn
                            type={"button"}
                            $ml={"10px"}
                            disabled={!validRcvryEmail || isPending}
                            onClick={() => reqRcvryEmailBtnClickHandler()}
                        >
                            {isPending ? LoadingArea() : userInfo?.recoveryEmail ? "변경" : "등록"}
                        </StModBtn>
                    </InputWrapper>
                </FieldRow>
                <StHelpMsgArea>{helpMsg}</StHelpMsgArea>
            </StAreaWrapper>
        </StModUserRcvryEmailWrapper>
    )
}

export default ModUserRcvryEmail

const StModUserRcvryEmailWrapper = styled.form`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 1700px;
    height: 753px;
    padding-bottom: 130px;
    margin-top: -25px;
    gap: 20px;
`

const StNotiArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #FFFFFF;
    border: 2px solid #769FCD;
    border-radius: 10px;
    padding: 15px;
`

const StAreaWrapper = styled.div`

`

const StTitle = styled.div<{ $height: string }>`
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-items: center;

    border-radius: 3px;
    width: 600px;
    padding: 10px;

    height: ${(props) => props?.$height ? props.$height : "30px"};
`

const StNotiMsg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`

const StUserEmail = styled.span`
    margin: 0 10px;
    font-weight: 600;
    font-size: 17px;
`

const StHelpMsgArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    width: 422px;
    height: 30px;
    color: #ff0101;
`

