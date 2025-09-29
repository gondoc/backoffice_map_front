import styled from "styled-components";
import {useCurrentUserQuery} from "@query/MemberQuery";
import React, {useEffect, useState} from "react";
import {NameInput, NameLabel} from "@component/common/section/category/reg/CategoryRegArea";
import {DialogLeftBtn, DialogRightBtn} from "@component/common/dialog/DialogArea";
import useViewStore, {useViewStoreActions} from "@store/viewStore";
import {useNavigate} from "react-router-dom";
import ReCheckPw from "@component/common/section/modUser/ReCheckPw";
import ModUserInfoArea from "@component/common/section/modUser/preview/ModUserInfoArea";

const ModUserSection = () => {

    const navigate = useNavigate();
    const currentNav = useViewStore(state => state.currentNav);
    const viewStoreActions = useViewStoreActions();
    const {data: userInfo} = useCurrentUserQuery();
    const [isReCheckPw, setIsReCheckPw] = useState<boolean>(false);

    useEffect(() => {
        if (!userInfo) {
            viewStoreActions.setDialogStatus({
                title: "내 정보 관리",
                msg: "로그인 정보가 없습니다.\n지금 로그인 하시겠습니까?",
                isOpen: true,
                isJustConfirm: true,
                status: "mod",
                leftBtn: <>
                    <DialogLeftBtn
                        $status={"mod"}
                        onClick={() => {
                            viewStoreActions.initDialogStatus()
                            viewStoreActions.setCurrentNav({
                                ...currentNav, value: currentNav.prevNav!.value, label: currentNav.prevNav!.label,
                            })
                        }}
                    >돌아가기</DialogLeftBtn>
                </>,
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
    }, [userInfo])

    return (
        <>
            {/*{*/}
            {/*    !isReCheckPw ?*/}
            {/*        <StModAccountWrapper onSubmit={(e) => {*/}
            {/*            e.preventDefault();*/}
            {/*            return false;*/}
            {/*        }}>*/}
            {/*            <ReCheckPw setIsReCheckPw={setIsReCheckPw}/>*/}
            {/*        </StModAccountWrapper>*/}
            {/*        :*/}
                    <ModUserInfoArea/>
            {/*}*/}
        </>
    )
}

export default ModUserSection

const StModAccountWrapper = styled.form`
    display: flex;
    //justify-content: flex-start;
    flex-direction: column;
    padding: 53px;
`

export const FieldRow = styled.div<{ $isFirst?: boolean , $isLast?: boolean }>`
    display: flex;
    align-content: flex-start;
    height: 45px;
    margin-top: ${(props) => props.$isFirst ? "15px" : "0"};
    margin-bottom: ${(props) => props.$isLast ? "30px" : "15px"};
`
    // margin-bottom: 15px;

export const FieldName = styled(NameLabel)`
    color: #6c757d;
`

export const InputWrapper = styled.div<{ $width?: string }>`
    display: flex;
    align-items: center;
    width: ${({$width}) => $width ? $width : "420px"};
`

export const ContentInput = styled(NameInput)<{
    $height?: string,
    $fontSize?: string,
    $backgroundColor?: string,
    $border?: string,
}>`
    height: ${(props) => props?.$height ? props.$height : "40px"};
    font-size: ${(props) => props?.$fontSize ? props.$fontSize : "16px"};
    background-color: ${({$backgroundColor}) => $backgroundColor ? $backgroundColor : "#FFFFFF"};
    border: ${({$border}) => $border ? $border : "2px solid #769FCD"};
`
// font-size: ${(props) => props?.$fontSize ? props.$fontSize : "40px"};

const TypingCntArea = styled.div<{ $isOver: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 90px;
    color: #6c757d;
    margin-right: 5px;

    span {
        color: ${(props) => props.$isOver ? "#FBA4A0" : "#6c757d"};
    }
`
