import PreviewUserEmail from "@component/common/section/modUser/preview/PreviewUserEmail";
import PreviewRow from "@component/common/section/modUser/preview/PreviewRow";
import ModUserRoleCreateAt from "@component/common/section/modUser/preview/ModUserRoleCreateAt";
import React, {useEffect} from "react";
import {StModUserRowWrapper} from "@component/common/section/modUser/preview/ModUserInfoArea";
import {TModUserTab} from "@type/user.types";
import Withdrawal from "@component/common/section/modUser/withdrawal/Withdrawal";
import {useCurrentUserQuery} from "@query/MemberQuery";
import img_success from "@image/icon-success.png"
import img_failure from "@image/icon-failure.png"
import {DialogRightBtn} from "@component/common/dialog/DialogArea";
import {useViewStoreActions} from "@store/viewStore";

interface IProps {
    setStep: (step: TModUserTab) => void,
}

const UserPreview = ({setStep}: IProps) => {

    const viewStoreActions = useViewStoreActions();
    const {data: userInfo, refetch} = useCurrentUserQuery();
    const btnClickHandler = (step: TModUserTab) => {
        setStep(step)
    }

    useEffect(() => {
        const channel: BroadcastChannel = new BroadcastChannel('email-verification');
        channel.onmessage = (event) => {
            console.log(" event ", event)
            if (event.data.type === "EMAIL_VERIFIED") {
                refetch().then(() => viewStoreActions.setDialogStatus({
                    title: "복구 이메일 등록 · 변경",
                    msg: "복구용 이메일이 정상적으로 인증되었습니다!",
                    isOpen: true,
                    isJustConfirm: false,
                    status: "mod",
                    leftBtn: <></>,
                    rightBtn: <>
                        <DialogRightBtn
                            $status={"mod"}
                            onClick={() => viewStoreActions.initDialogStatus()}
                        >확인</DialogRightBtn>
                    </>,
                    noCloseBtn: true,
                }));
            }
        }

        return (() => {
            channel.close();
        })
    }, [])

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
                    icon={userInfo?.recoveryEmail ? userInfo?.isVerifyRcvryEmail ? img_success : img_failure : undefined}
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

