import useTimer from "@hook/useTimer";
import {useSendEmailCode} from "@query/MemberQuery";
import useUserStore from "@store/userStore";
import dayjs from "dayjs";
import {useEffect} from "react";
import ExpireVerifyCode from "@component/join/phase2/ExpireVerifyCode";

const EmailVerifyHelpMsg = () => {
    const {joinPayload} = useUserStore();

    const {data: emailCodeReqRes} = useSendEmailCode(joinPayload.userEmail);

    useEffect(() => {
        console.log("emailCodeReqRes ", emailCodeReqRes);
    }, [emailCodeReqRes]);

    const isExpired: boolean = useTimer(emailCodeReqRes);

    return (
        <div className={"help-msg"}>
            {!isExpired ? (
                <>
                    보내드린 인증 코드는{" "}
                    <span>{dayjs(emailCodeReqRes).format("HH:mm:ss")}</span>
                    까지 유효합니다.
                </>
            ) : (
                <ExpireVerifyCode/>
            )}
        </div>
    );
};

export default EmailVerifyHelpMsg;
