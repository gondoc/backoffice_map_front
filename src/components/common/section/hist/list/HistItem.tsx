import {IHistory} from "@type/hist.types";
import styled from "styled-components";
import React from "react";
import {DelBtn, ModBtn} from "@component/common/section/loca/list/LocaListSection";

import icon_lock from "@image/icon_lock.png";
import Url from "@config/url";

import no_image from "@image/delete_11919138.png";
import {useHistStoreActions} from "@store/histStore";
import {DialogLeftBtn, DialogRightBtn} from "@component/common/dialog/DialogArea";
import {useViewStoreActions} from "@store/viewStore";
import {useCategoryQuery} from "@query/CategoryQuery";
import {useHistDelMutation} from "@query/MapQuery";
import {QueryKeys} from "@query/QueryKeys";
import {useQueryClient} from "@tanstack/react-query";

interface IProps {
    item: IHistory,
    index: number,
}

const HistItem = ({item, index}: IProps) => {

    const queryClient = useQueryClient();
    const {data: categoryList} = useCategoryQuery();
    const histStoreActions = useHistStoreActions();
    const viewStoreActions = useViewStoreActions();
    const {mutate: deleteReq} = useHistDelMutation(
        () => successHandler(),
        (errorCd?: string | number, msg?: string | undefined | unknown) => failHandler(errorCd, msg)
    );

    const successHandler = () => {
        viewStoreActions.setToastStatus({status: "success", msg: "이력이 성공적으로 삭제되었습니다."})
        histStoreActions.resetRegisterForm();
        queryClient.invalidateQueries({queryKey: [QueryKeys.MAP.list()]})
    }

    const failHandler = (res?: string | number, msg?: string | undefined | unknown) => {
        viewStoreActions.setToastStatus({
            status: "failed",
            msg: `(${res}) ${msg ? msg : '삭제 요청에 실패하였습니다.'}`
        })
    }

    const modBtnClickHandler = () => {
        const cateId: string | undefined = categoryList?.find(cate => cate.nm === item.categoryNm)?.id
        histStoreActions.modRegisterForm({item: item, cateId: cateId ?? ""});
    }

    const delBtnClickHandler = () => {
        viewStoreActions.setDialogStatus({
            title: `이력 <span>삭제</span>`,
            msg: `'${item.histNm}' 이력을 삭제하시겠습니까?`,
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
                        deleteReq(item.id);
                    }}
                >예</DialogRightBtn>
            </>,
        });
    }

    return (
        <ItemUl key={`HIST_LIST_ITEM_${item.id}`}>
            <ItemLi $isLock={item.isLock}>
                {item.isLock && <LockImg src={icon_lock}/>}
                {index + 1}
            </ItemLi>
            <ItemLi>{item.histNm}</ItemLi>
            <ItemLi>
                <LocaNm>{item.siteNm}</LocaNm>
                <LocaLogo
                    src={(item?.siteId && item?.logoImgPath) ? Url.IMAGE(item?.siteId, item.logoImgPath) : no_image}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = no_image;
                    }}
                    alt={item.logoImgPath}
                />
            </ItemLi>
            <ItemLi>{item.categoryNm}</ItemLi>
            <ItemLi>{item.startDtm} ~ {item.endDtm}</ItemLi>
            <ItemLi>{item.staffCnt} 명</ItemLi>
            <ItemLi>{item.lastUpdateDtm}</ItemLi>
            <ItemLi><ModBtn onClick={() => modBtnClickHandler()}/></ItemLi>
            <ItemLi><DelBtn onClick={() => delBtnClickHandler()}/></ItemLi>
        </ItemUl>
    )
}

export default HistItem


const ItemUl = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 1575px;
    height: 54px;
    border-radius: 10px;
    transition: all 150ms ease-out;
    border: 2px solid #769FCD;
    background: #FFFFFF;
    color: #6c757d;
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 0;
    }
`

const ItemLi = styled.li<{ $isLock?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(1) { // no
        display: flex;
        align-items: center;
        width: 69px;
        padding-right: 11px;

        justify-content: ${(props) => props.$isLock ? "space-between" : "right"};
    }

    &:nth-child(2) { // histNm
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-break: auto-phrase;
        width: 200px;
    }

    &:nth-child(3) { // siteNm && siteLogo
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &:nth-child(4) { // categoryNm
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-break: auto-phrase;
        width: 200px;
    }

    &:nth-child(5) { // startDtm ~ endDtm
        width: 200px;
    }

    &:nth-child(6) { // staffCnt
        width: 100px;
    }

    &:nth-child(7) { // lastUpdateDtm
        width: 160px;
    }

    &:nth-child(8) { // modBtn
        width: 33px;
    }

    &:nth-child(9) { // delBtn
        width: 33px;
    }
`

const LockImg = styled.img`
    display: inline-block;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    content: "";

    border: none !important;
    box-shadow: none;
`

const LocaNm = styled.div`
    display: flex;
    align-items: end;
    justify-content: center;
`

const LocaLogo = styled.img`
    display: flex;
    height: 30px;
`
