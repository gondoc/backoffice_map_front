import useUserStore from "@store/userStore";
import React, {useEffect, useRef} from "react";
import EmailVerifyCodeInput from "@component/join/phase2/EmailVerifyCodeInput";
import {isNumeric, typingNumCheck} from "@utils/commons";
import {useSendEmailCode, useVerifyEmailCodeMutation,} from "@query/MemberQuery";
import EmailVerifyTitle from "@component/join/phase2/EmailVerifyTitle";

const VerifyCodeArea = () => {
    const {joinValid, setJoinValid, joinPayload, verifyCode, setVerifyCode} =
        useUserStore();
    const focusRef = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null));
    const {data: emailCodeReqRes} = useSendEmailCode(joinPayload.userEmail);
    const {mutate: verify} = useVerifyEmailCodeMutation(
        (res: boolean) =>
            setJoinValid({
                ...joinValid,
                emailVerify: res
                    ? {isValid: true}
                    : {
                        isValid: false,
                        errorMsg: "유효하지 않은 인증번호입니다.",
                    },
            }),
        () =>
            setJoinValid({
                ...joinValid,
                emailVerify: {
                    isValid: false,
                    errorMsg: "오류가 발생했습니다. 잠시후 시도 바랍니다.",
                },
            }),
    );

    useEffect(() => {
        if (emailCodeReqRes) {
            setJoinValid({
                ...joinValid,
                emailVerify: {
                    ...joinValid.emailVerify,
                    time: emailCodeReqRes,
                },
            });
        }
    }, [emailCodeReqRes]);

    useEffect(() => {
        // 6글자 작성완료 여부 검증
        if (verifyCode.valid()) {
            verify({code: verifyCode.getCodes(), email: joinPayload.userEmail});
        }
    }, [verifyCode.cd]);

    // 붙여넣기 적용 함수
    const pasteValue = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const code: string = e.clipboardData.getData("text");
        if (isNumeric(code)) {
            setVerifyCode([...code.split("")]);
            focusRef.current[focusRef.current.length]?.focus();
        }
    };

    // Backspace key down handler
    const keyDownHandler = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        const key: string = e.key;
        if (key === "Backspace") {
            if (index !== 0) {
                moveFocus(index - 1);
            }
            verifyCode.cd[index] = "";
            return setVerifyCode([...verifyCode.cd]);
        }
    };

    // 타이핑에 따라 호출 및 적용되는 함수
    const changeHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const value: string = e.target.value;
        // 정상 값 타이핑한 경우
        if (isNumeric(value)) {
            verifyCode.cd[index] = typingNumCheck(value);
            setVerifyCode([...verifyCode.cd]);
            if (index < 5) {
                moveFocus(index + 1);
            }
        }
    };

    // 포커스 이동 함수
    const moveFocus = (moveIndex: number) => {
        if (focusRef.current && focusRef.current[moveIndex]) {
            focusRef.current[moveIndex]?.focus();
        }
    };

    return (
        <div className={"verify-code-wrapper"}>
            {/* 이메일 인증코드 타이틀 영역 */}
            <EmailVerifyTitle/>

            {/* 이메일 인증코드 작성 영역 */}
            <div className={"verify-code-area"}>
                {Array.from({length: 6}).map((_, index: number) => {
                    return (
                        <EmailVerifyCodeInput
                            key={`EMAIL_VERIFY_CODE_INPUT_${index}`}
                            index={index}
                            value={verifyCode.cd[index]}
                            ref={(el: HTMLInputElement) => {
                                focusRef.current[index] = el;
                            }}
                            disabled={joinValid.emailVerify.isValid}
                            onPaste={(e) => pasteValue(e)}
                            onKeyDown={(e) => keyDownHandler(e, index)}
                            onChange={(e) => changeHandler(e, index)}
                        />
                    );
                })}
            </div>
        </div>
    );
};
export default VerifyCodeArea;
