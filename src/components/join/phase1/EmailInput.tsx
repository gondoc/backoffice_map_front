import {useEffect} from "react";
import {useUserEmailDupCheck} from "@query/MemberQuery";
import useUserStore from "@store/userStore";
import JoinRowInput from "@component/join/common/JoinRowInput";

const EmailInput = () => {
    const {joinPayload, setJoinPayload, joinValid, setJoinValid} =
        useUserStore();
    const {refetch: idCheck} = useUserEmailDupCheck(joinPayload.userEmail);

    useEffect(() => {
        if (joinPayload.userEmail) {
            const userEmailValid: boolean = validationUserEmail(
                joinPayload.userEmail,
            );
            if (userEmailValid) {
                idCheck().then(({data}) => {
                    const checkDupEmail: boolean = data?.data?.data as boolean;
                    setJoinValid({
                        ...joinValid,
                        email: checkDupEmail
                            ? {isValid: true}
                            : {
                                isValid: false,
                                errorMsg: "이미 등록된 이메일 주소입니다.",
                            },
                    });
                });
            } else {
                setJoinValid({
                    ...joinValid,
                    email: {
                        isValid: false,
                        errorMsg: "사용할 수 없는 이메일 주소입니다.",
                    },
                });
            }
        } else {
            setJoinValid({
                ...joinValid,
                email: {isValid: false},
            });
        }
    }, [joinPayload.userEmail]);

    const validationUserEmail = (userEmail: string): boolean => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(userEmail);
    };

    return (
        <JoinRowInput
            type={"text"}
            placeholder={"로그인시 활용될 이메일 주소를 입력해주세요"}
            label={"이메일 주소"}
            required={true}
            autoFocus={true}
            errorMsg={
                joinValid.email.errorMsg !== "" && joinValid.email?.errorMsg
                    ? joinValid.email.errorMsg
                    : ""
            }
            setPayload={(payloadValue) =>
                setJoinPayload({...joinPayload, userEmail: payloadValue})
            }
        />
    );
};

export default EmailInput;
