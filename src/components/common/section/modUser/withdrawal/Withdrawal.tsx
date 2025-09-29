import React from "react";
import {StModUserRowWrapper} from "@component/common/section/modUser/preview/ModUserInfoArea";
import {DialogLeftBtn, DialogRightBtn} from "@component/common/dialog/DialogArea";
import {useViewStoreActions} from "@store/viewStore";

const Withdrawal = () => {

    const viewStoreActions = useViewStoreActions();

    const memberWithdrawal = () => {
        viewStoreActions.setDialogStatus({
            title: `회원 탈퇴`,
            msg: `정말 탈퇴 하시겠습니까?`,
            isOpen: true,
            isJustConfirm: false,
            status: "del",
            leftBtn: <>
                <DialogLeftBtn
                    $status={"del"}
                    onClick={() => viewStoreActions.initDialogStatus()}
                >아니오</DialogLeftBtn>
            </>,
            rightBtn: <>
                <DialogRightBtn
                    $status={"del"}
                    onClick={() => {
                        viewStoreActions.initDialogStatus()
                    }}
                >회원 탈퇴</DialogRightBtn>
            </>,
        });
    }
    return (
        <StModUserRowWrapper
            $cursor={"pointer"}
            onClick={() => memberWithdrawal()}
        >회원 탈퇴</StModUserRowWrapper>
    )
}

export default Withdrawal