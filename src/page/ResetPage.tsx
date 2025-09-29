import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CommBackBtn from "@component/common/CommBackBtn";
import {useResetPwMutation} from "@query/MemberQuery";
import DialogArea, {DialogRightBtn} from "@component/common/dialog/DialogArea";
import {useViewStoreActions} from "@store/viewStore";
import "@css/find.css"
import ToastArea from "@component/common/toast/ToastArea";
import JoinRowInput from "@component/join/common/JoinRowInput";
import {isEqual, validationPw} from "@utils/commons";
import {TErrorMsg} from "@type/user.types";
import styled from "styled-components";

const INIT_ERROR_MSG: { pw: TErrorMsg, confirmPw: TErrorMsg } = {pw: "", confirmPw: ""};

const ResetPage = () => {

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const viewStoreActions = useViewStoreActions();

    const [msg, setMsg] = useState<string>(!token ? "유효한 토큰이 필요합니다." : "비밀번호 변경");
    const [valid, setValid] = useState<boolean>(!!token)

    const [passwordObj, setPasswordObj] = useState<{ pw: string, confirmPw: string }>({pw: "", confirmPw: ""})
    const [errorMsg, setErrorMsg] = useState<{ pw: TErrorMsg, confirmPw: TErrorMsg }>(INIT_ERROR_MSG)
    const navigate = useNavigate();

    const {mutate: req, isPending} = useResetPwMutation(
        () => resultHandler(),
        () => failHandler(),
    );

    useEffect(() => {
        if (!token) {
            setValid(false);
            setMsg('유효한 토큰이 필요합니다.')
        }
    }, [token]);

    useEffect(() => {
        console.log('msg', msg)
    }, [msg])

    const resultHandler = () => {
        viewStoreActions.setDialogStatus({
            title: "비밀번호 재설정 알림",
            msg: "정상적으로 비밀번호가 변경되었습니다.\n로그인 페이지로 이동합니다.",
            isOpen: true,
            isJustConfirm: true,
            status: "mod",
            leftBtn: <></>,
            rightBtn: <>
                <DialogRightBtn
                    $status={"mod"}
                    onClick={() => {
                        viewStoreActions.initDialogStatus()
                        navigate("/login")
                    }}
                >로그인 이동</DialogRightBtn>
            </>,
            noCloseBtn: true,
        });
    }

    const failHandler = (res?: string | number, msg?: string | undefined | unknown) => {
        const resText: string = res !== undefined ? `(${res})` : '';
        viewStoreActions.setToastStatus({
            status: "failed",
            msg: `${resText} ${msg ? msg : '요청에 실패하였습니다.'}`
        })
    }

    const findBtnClickHandler = () => {
        if (!token) {
            return;
        }

        if (!valid) {
            return;
        }

        req({token: token, newPw: passwordObj.pw});
    }

    useEffect(() => {
        if (passwordObj.pw === "" && passwordObj.confirmPw === "") {
            setValid(false);
            return;
        }

        const validationPwError: TErrorMsg = validationPw(passwordObj.pw);
        if (validationPwError !== "") {
            setValid(false);
            setErrorMsg({pw: validationPwError, confirmPw: errorMsg.confirmPw});
            return;
        }

        const validationUserPwError: boolean = validationUserPwConfirm();
        console.log("validationUserPwError ", validationUserPwError);
        if (!validationUserPwConfirm()) {
            setValid(false);
            setErrorMsg({pw: errorMsg.pw, confirmPw: "비밀번호가 일치하지 않습니다."});
            return;
        }

        setValid(true);
        setErrorMsg(INIT_ERROR_MSG);

        console.log("!valid", (!valid));
        console.log("(!isPending) ", (!isPending));
        console.log("(!isPending || !valid) ", (!isPending || !valid));
    }, [passwordObj.pw, passwordObj.confirmPw])

    const validationUserPwConfirm = (): boolean => {
        return isEqual(passwordObj.pw, passwordObj.confirmPw);
    };

    return (
        <>
            <div className={"find-wrapper"}>
                <div className="find-container">
                    <div className={"back-btn-wrapper"}>
                        <CommBackBtn onClickHandler={() => navigate("/login")}/>
                    </div>
                    <div className="title-area">
                        <div className={"logo"}>Career Map Back Office</div>
                        <div className={"title"}>비밀번호 재설정</div>
                    </div>

                    <StPasswordForm>
                        <div className={"find-area"}>
                            {/* 아이디 찾기 */}
                            <div className={"input-area"}>
                                <JoinRowInput
                                    label={"새 비밀번호 설정"}
                                    className={"password-wrapper"}
                                    type={"password"}
                                    placeholder={"영문, 숫자, 특수문자 조합 8~16자"}
                                    required={true}
                                    errorMsg={errorMsg.pw}
                                    setPayload={(payloadValue) =>
                                        setPasswordObj({confirmPw: passwordObj.confirmPw, pw: payloadValue})
                                    }
                                />
                            </div>
                            <div className={"input-area"}>
                                <JoinRowInput
                                    label={"새 비밀번호 확인"}
                                    className={"password-wrapper"}
                                    type={"password"}
                                    placeholder={"새 비밀번호 확인"}
                                    required={true}
                                    errorMsg={errorMsg.confirmPw}
                                    setPayload={(payloadValue) =>
                                        setPasswordObj({pw: passwordObj.pw, confirmPw: payloadValue})
                                    }
                                />
                            </div>
                        </div>

                        <div className={"button-wrapper"}>
                            <button
                                type="button"
                                onClick={() => findBtnClickHandler()}
                                disabled={isPending || !valid}
                            >
                                {!isPending ?
                                    (msg) :
                                    (<div className={"loading"}>
                                        <span/><span/><span/>
                                    </div>)}
                            </button>
                        </div>
                    </StPasswordForm>
                </div>
            </div>

            {/*토스트알림 영역*/}
            <ToastArea/>
            {/*다이얼록 영역*/}
            <DialogArea/>
        </>
    )
}

export default ResetPage

const StPasswordForm = styled.form`

`
