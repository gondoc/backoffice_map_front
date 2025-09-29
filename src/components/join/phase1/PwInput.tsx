import JoinRowInput from "@component/join/common/JoinRowInput";
import useUserStore from "@store/userStore";
import {useEffect} from "react";
import {TErrorMsg} from "@type/user.types";

const PwInput = () => {
    const {joinPayload, setJoinPayload, joinValid, setJoinValid} =
        useUserStore();

    useEffect(() => {
        if (joinPayload.userPw) {
            const userPwValid: boolean = validationUserPw(joinPayload.userPw);
            console.log("userPwValid ", userPwValid)
            if (userPwValid) {
                setJoinValid({
                    ...joinValid,
                    pw: {isValid: true},
                });
            }
        } else {
            setJoinValid({
                ...joinValid,
                pw: {isValid: false},
            });
        }
    }, [joinPayload.userPw]);

    const validFailed = (reason: TErrorMsg) => {
        return setJoinValid({
            ...joinValid,
            pw: {isValid: false, errorMsg: reason},
        });
    };

    const validationUserPw = (userPw: string): boolean => {
        // 기본 상태
        if (userPw.length === 0) {
            validFailed("");
            return false;
        }

        // 1. 길이 검사: 6글자 이상 15글자 이내
        if (userPw.length < 6 || userPw.length > 15) {
            validFailed("6글자 이상 15글자 이내 여야 합니다.");
            return false;
        }

        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(userPw);
        const hasLetter = /[A-Za-z]/.test(userPw);
        const hasNumber = /[0-9]/.test(userPw);
        if (!(hasSpecialChar && hasLetter && hasNumber)) {
            validFailed(
                "영문자와 숫자, 그리고 1글자 이상의 특수문자가 포함되어야 합니다.",
            );
            return false;
        }

        return true;
    };

    return (
        <JoinRowInput
            type={"password"}
            className={"password-wrapper"}
            placeholder={"영문, 숫자, 특수문자 조합 8~16자"}
            label={"비밀번호"}
            required={true}
            errorMsg={
                joinValid.pw.errorMsg !== "" && joinValid.pw?.errorMsg
                    ? joinValid.pw.errorMsg
                    : ""
            }
            setPayload={(payloadValue) =>
                setJoinPayload({...joinPayload, userPw: payloadValue})
            }
        />
    );
};

export default PwInput;
