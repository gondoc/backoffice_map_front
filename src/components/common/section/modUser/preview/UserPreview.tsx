import PreviewUserEmail from "@component/common/section/modUser/preview/PreviewUserEmail";
import PreviewRow from "@component/common/section/modUser/preview/PreviewRow";
import ModUserRoleCreateAt from "@component/common/section/modUser/preview/ModUserRoleCreateAt";
import React from "react";
import {StModUserRowWrapper} from "@component/common/section/modUser/preview/ModUserInfoArea";
import {TModUserTab} from "@type/user.types";
import Withdrawal from "@component/common/section/modUser/withdrawal/Withdrawal";
import {useCurrentUserQuery} from "@query/MemberQuery";
import img_back_btn from "@image/img_back_btn.svg"

interface IProps {
    setStep: (step: TModUserTab) => void,
}

const UserPreview = ({setStep}: IProps) => {

    const {data: userInfo} = useCurrentUserQuery();

    const btnClickHandler = (step: TModUserTab) => {
        setStep(step)
    }

    return (
        <>
            <PreviewUserEmail userEmail={userInfo?.email ?? ""}/>

            <StModUserRowWrapper>
                <PreviewRow
                    isFirst={true}
                    value={userInfo?.nick ?? ""}
                    btn={{
                        btnLabel: "변경",
                        clickHandler: () => btnClickHandler("nickname")
                    }}
                    key={`USER_NICK`}
                    labelId={`USER_NICK`}
                    labelNm={"닉네임"}
                />
                <PreviewRow
                    value={userInfo?.recoveryEmail ?? "등록된 복구용 이메일 주소가 없습니다."}
                    btn={{
                        btnLabel: userInfo?.recoveryEmail ? "변경" : "등록",
                        clickHandler: () => btnClickHandler("recoveryEmail")
                    }}
                    key={`USER_RECOVERY_EMAIL`}
                    labelId={`USER_RECOVERY_EMAIL`}
                    labelNm={"복구용 이메일"}
                    icon={img_back_btn}
                />
            </StModUserRowWrapper>

            <ModUserRoleCreateAt
                role={userInfo?.role ?? ""}
                createAt={userInfo?.createAt ?? ""}
                updateAt={userInfo?.updateAt}
            />

            {/*회원 탈퇴*/}
            <Withdrawal/>
        </>
    )
}

export default UserPreview

