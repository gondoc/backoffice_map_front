import EmailInput from "@component/join/phase1/EmailInput";
import PwInput from "@component/join/phase1/PwInput";
import PwConfirmInput from "@component/join/phase1/PwConfirmInput";

const UserIdPwArea = () => {
    return (
        <>
            {/* 이메일 작성영역 */}
            <EmailInput/>

            {/* 비밀번호 작성영역 */}
            <PwInput/>

            {/* 비밀번호 확인 작성영역 */}
            <PwConfirmInput/>
        </>
    );
};
export default UserIdPwArea;
