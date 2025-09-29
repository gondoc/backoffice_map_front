import styled from "styled-components";

import edit_btn from "@image/edit_btn.png";
import close_btn from "@image/close_btn.svg";
import {Dispatch, MouseEvent, SetStateAction} from "react";
import {ICategory} from "@type/categories.types";
import {DialogLeftBtn, DialogRightBtn} from "@component/common/dialog/DialogArea";
import {useCategoryDelMutation, useCategoryModMutation} from "@query/CategoryQuery";
import {useCategoryStoreActions} from "@store/categoryStore";
import {useViewStoreActions} from "@store/viewStore";
import {QueryKeys} from "@query/QueryKeys";
import {useQueryClient} from "@tanstack/react-query";
import {TStatus} from "@type/common.types";
import {ItemBox} from "@component/common/section/category/CategorySection";

interface IProps {
    item: ICategory,
    isUpdate: boolean,
    updateItem: { id: string; nm: string; content: string; isUpdate: boolean; },
    setUpdateItem: Dispatch<SetStateAction<{ id: string; nm: string; content: string; isUpdate: boolean; }>>,
}

const CateListBtnGroup = ({item, isUpdate, updateItem, setUpdateItem}: IProps) => {

    const queryClient = useQueryClient();
    const categoryStoreActions = useCategoryStoreActions();
    const viewStoreActions = useViewStoreActions();

    const {mutate: deleteReq} = useCategoryDelMutation(
        () => successHandler("del"),
        (errorCd?: string | number, msg?: string | undefined | unknown) => failHandler("del", errorCd, msg)
    );

    const {mutate: modifyReq} = useCategoryModMutation(
        () => successHandler("mod"),
        (errorCd?: string | number, msg?: string | undefined | unknown) => failHandler("mod", errorCd, msg)
    )

    const successHandler = (status: TStatus) => {
        viewStoreActions.setToastStatus({status: "success", msg: `분류가 성공적으로 ${status === "del" ? "삭제" : "수정"}되었습니다.`})
        categoryStoreActions.initRegisterForm();
        setUpdateItem({id: item.id!, nm: item.nm, content: item.content, isUpdate: false})
        queryClient.invalidateQueries({queryKey: [QueryKeys.MAP.cate()]})
    }

    const failHandler = (status: TStatus, res?: string | number, msg?: string | undefined | unknown,) => {
        viewStoreActions.setToastStatus({
            status: "failed",
            msg: `(${res ?? 405}) ${msg ? msg : `${status === "del" ? "삭제" : "수정"} 요청에 실패하였습니다.`}`
        })
    }

    const deleteItem = (e: MouseEvent<HTMLButtonElement>, cate: ICategory) => {
        e.stopPropagation();
        viewStoreActions.setDialogStatus({
            title: `분류 <span>삭제</span>`,
            msg: `'${cate.nm}'\n삭제하시겠습니까?`,
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
                        deleteReq(cate.id as string);
                    }}
                >예</DialogRightBtn>
            </>,
        });
    }

    const updateBtnClickHandler = () => {
        setUpdateItem({id: item.id!, nm: item.nm, content: item.content, isUpdate: true})
    }

    const cancelBtnClickHandler = () => {
        setUpdateItem({id: item.id!, nm: item.nm, content: item.content, isUpdate: false})
    }

    return (
        <>
            <ItemBox $width={"110px"}>
                {!isUpdate ? <ModBtn onClick={() => updateBtnClickHandler()}>수정</ModBtn> :
                    <DelBtn onClick={() => cancelBtnClickHandler()}>취소</DelBtn>}
            </ItemBox>
            <ItemBox $width={"110px"}>
                {!isUpdate ? <DelBtn onClick={(e) => deleteItem(e, item)}>삭제</DelBtn> :
                    <ModBtn onClick={() => modifyReq({
                        id: updateItem.id,
                        nm: updateItem.nm,
                        content: updateItem.content,
                    })}>확인</ModBtn>}
            </ItemBox>
        </>
    )
}

export default CateListBtnGroup


const ModBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 83px;
    height: 53px;
    border-radius: 5px;
    background-color: #F7FBFC;
    font-size: 16px;
    color: #000000;

    cursor: pointer;
    border: 3px solid #769FCD;

    &:hover {
        border-color: #93B7E4;
    }

    &:active {
        border-color: #517EBC;
    }

    &::after {
        content: "";
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url(${edit_btn}) no-repeat center/100%;;
    }
`

const DelBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 83px;
    height: 53px;
    border-radius: 5px;
    background-color: #F7FBFC;
    font-size: 16px;
    color: #000000;

    cursor: pointer;
    border: 3px solid #FBA4A0;

    &:hover {
        border-color: #F88985;
    }

    &:active {
        border-color: #F24E49;
    }

    &::after {
        content: "";
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url(${close_btn}) no-repeat center/100%;;
    }
`
