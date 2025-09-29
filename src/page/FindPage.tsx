import React, {useState} from "react";
import CommBackBtn from "@component/common/CommBackBtn";
import {useNavigate} from "react-router-dom";
import {useFindIdMutation, useForgotPwMutation} from "@query/MemberQuery";
import {useViewStoreActions} from "@store/viewStore";
import ToastArea from "@component/common/toast/ToastArea";
import DialogArea, {DialogLeftBtn, DialogRightBtn} from "@component/common/dialog/DialogArea";
import FindId from "@component/find/FindId";
import FindPw from "@component/find/FindPw";

import "@css/find.css"

const FindPage = () => {
    const navigator = useNavigate();
    const viewStoreActions = useViewStoreActions();
    const [idTyping, setIdTyping] = useState<string>("");
    const [pwTyping, setPwTyping] = useState<string>("");
    const [activeFind, setActiveFind] = useState<string>("id");

    const {mutate: findReq, isPending: idPending} = useFindIdMutation(
        () => resultHandler(),
        () => failHandler(),
    );
    const {mutate: forgotPwReq, isPending: pwPending} = useForgotPwMutation(
        () => resultHandler(),
        () => failHandler(),
    );

    const findBtnClickHandler = () => {
        if (activeFind === "id") {
            if (idTyping.length === 0) {
                viewStoreActions.setDialogStatus({
                    title: `<span>아이디</span> 찾기`,
                    msg: `복구용 이메일 주소를 입력하지 않았습니다.`,
                    isOpen: true,
                    isJustConfirm: false,
                    status: "mod",
                    leftBtn: <></>,
                    rightBtn: <>
                        <DialogRightBtn
                            $status={"mod"}
                            onClick={() => {
                                viewStoreActions.initDialogStatus()
                            }}
                        >확인</DialogRightBtn>
                    </>,
                });
                return;
            }

            findReq(idTyping);
        } else {

            if (pwTyping.length === 0) {
                viewStoreActions.setDialogStatus({
                    title: `<span>비밀번호</span> 찾기`,
                    msg: `이메일 주소를 입력하지 않았습니다.`,
                    isOpen: true,
                    isJustConfirm: false,
                    status: "mod",
                    leftBtn: <></>,
                    rightBtn: <>
                        <DialogRightBtn
                            $status={"mod"}
                            onClick={() => {
                                viewStoreActions.initDialogStatus()
                            }}
                        >확인</DialogRightBtn>
                    </>,
                });
                return;
            }

            forgotPwReq(pwTyping);
        }
    }

    const resultHandler = () => {
        viewStoreActions.setDialogStatus({
            title: "계정 정보 찾기",
            msg: "이메일이 등록된 경우\n해당 주소로 안내 메일이 발송됩니다.",
            isOpen: true,
            isJustConfirm: false,
            status: "mod",
            leftBtn: <>
                <DialogLeftBtn
                    $status={"mod"}
                    onClick={() => {
                        viewStoreActions.initDialogStatus()
                    }}
                >확인</DialogLeftBtn>
            </>,
            rightBtn: <>
                <DialogRightBtn
                    $status={"mod"}
                    onClick={() => {
                        viewStoreActions.initDialogStatus()
                        navigator("/login")
                    }}
                >로그인 이동</DialogRightBtn>
            </>,
        });
    }

    const failHandler = (res?: string | number, msg?: string | undefined | unknown) => {
        const resText: string = res !== undefined ? `(${res})` : '';
        viewStoreActions.setToastStatus({
            status: "failed",
            msg: `${resText} ${msg ? msg : '요청에 실패하였습니다.'}`
        })
    }

    return (
        <>
            <div className={"find-wrapper"}>
                <div className="find-container">
                    <div className={"back-btn-wrapper"}>
                        <CommBackBtn onClickHandler={() => navigator("/login")}/>
                    </div>
                    <div className="title-area">
                        <div className={"logo"}>Career Map Back Office</div>
                        <div className={"title"}>계정 정보 찾기</div>
                    </div>

                    <div className={"find-btn-group"}>
                        <div
                            className={`find-btn-id ${activeFind === "id" ? "active" : ""}`}
                            onClick={() => setActiveFind("id")}
                        >
                            아이디 찾기
                        </div>
                        <div
                            className={`find-btn-pw ${activeFind === "pw" ? "active" : ""}`}
                            onClick={() => setActiveFind("pw")}
                        >
                            비밀번호 재설정
                        </div>
                    </div>

                    <div className={"find-area"}>
                        {/* 아이디 찾기 */}
                        {activeFind === "id" && <FindId typing={idTyping} setTyping={setIdTyping}/>}

                        {activeFind === "pw" && <FindPw typing={pwTyping} setTyping={setPwTyping}/>}
                    </div>

                    <div className={"button-wrapper"}>
                        <button
                            type="button"
                            onClick={() => findBtnClickHandler()}
                            disabled={activeFind === "id" ? idPending : pwPending}
                        >
                            {
                                !(activeFind === "id" ? idPending : pwPending) ? (
                                    `${activeFind === "id" ? "아이디 찾기" : "비밀번호 재설정"}`
                                ) : (
                                    <div className={"loading"}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/*토스트알림 영역*/}
            <ToastArea/>
            {/*다이얼록 영역*/}
            <DialogArea/>
        </>

    );
};

export default FindPage;
