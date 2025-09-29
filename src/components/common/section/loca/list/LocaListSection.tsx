import styled from "styled-components";
import SectionSearch from "@component/common/section/common/search/SectionSearch";
import {useLocationDelMutation, useLocationQuery} from "@query/LocationQuery";
import {MouseEvent, useEffect, useRef} from "react";
import useViewStore from "@store/viewStore";
import viewStore, {useViewStoreActions} from "@store/viewStore";
import {useLocationStore, useLocationStoreActions} from "@store/locationStore";
import {ILocation} from "@type/location.types";
import {DialogLeftBtn, DialogRightBtn} from "@component/common/dialog/DialogArea";
import {useQueryClient} from "@tanstack/react-query";
import {QueryKeys} from "@query/QueryKeys";
import {makePayload} from "@utils/commons";

import close_btn from "@image/close_btn.svg";
import edit_btn from "@image/edit_btn.png";
import icon_lock from "@image/icon_lock.png";
import LocaNoData from "@component/common/section/loca/list/LocaNoData";
import LocaPreview from "@component/common/section/loca/list/LocaPreview";

const LocaListSection = () => {

    const queryClient = useQueryClient();
    const ref = useRef<(HTMLUListElement | null)[]>([]);
    const currentNav = viewStore(state => state.currentNav);
    const searchWord = useViewStore((state) => state.searchWord);
    const activeLocation = useLocationStore(state => state.activeLocation)

    const viewStoreActions = useViewStoreActions();
    const locationStoreActions = useLocationStoreActions();

    const {data: siteList} = useLocationQuery();

    const {mutate: deleteReq} = useLocationDelMutation(
        () => successHandler(),
        (errorCd?: string | number, msg?: string | undefined | unknown) => failHandler(errorCd, msg)
    )

    const successHandler = () => {
        viewStoreActions.setToastStatus({status: "success", msg: "지역이 성공적으로 삭제되었습니다."})
        locationStoreActions.setActiveLocation(null);
        locationStoreActions.resetRegisterForm();
        queryClient.invalidateQueries({queryKey: [QueryKeys.MAP.site()]})
    }

    const failHandler = (res?: string | number, msg?: string | undefined | unknown) => {
        viewStoreActions.setToastStatus({
            status: "failed",
            msg: `(${res}) ${msg ? msg : '삭제 요청에 실패하였습니다.'}`
        })
    }

    useEffect(() => {
        return (() => {
            viewStoreActions.setSearchWord("")
        })
    }, [])

    useEffect(() => {
        // 스크롤 처리 useEffect
        if (activeLocation && siteList) {
            const currentIndex = siteList.findIndex((site: ILocation) => site.id === activeLocation.id)
            ref.current[currentIndex]?.scrollIntoView({behavior: "smooth", block: "nearest"})
        }
    }, [activeLocation])

    const listItemClickHandler = async (e: MouseEvent<HTMLDivElement>, site: ILocation) => {
        e.stopPropagation();
        if (activeLocation?.isShow && activeLocation.id === site.id) {
            locationStoreActions.setActiveLocation(null);
            return;
        }
        locationStoreActions.setActiveLocation(await makePayload(site));
    }

    const modifyClickHandler = async (site: ILocation) => {
        viewStoreActions.setCurrentNav({...currentNav, status: "mod"})
        viewStoreActions.initDialogStatus()
        const newVar = await makePayload(site);
        locationStoreActions.modifyForm(newVar);
    }

    const modifyItem = (e: MouseEvent<HTMLButtonElement>, site: ILocation) => {
        e.stopPropagation();
        viewStoreActions.setDialogStatus({
            title: `지역 <span>수정</span>`,
            msg: `'${site.nm}' 지역을 수정하시겠습니까?`,
            isOpen: true,
            isJustConfirm: false,
            status: "mod",
            leftBtn: <>
                <DialogLeftBtn
                    $status={"mod"}
                    onClick={() => viewStoreActions.initDialogStatus()}
                >아니오</DialogLeftBtn>
            </>,
            rightBtn: <>
                <DialogRightBtn
                    $status={"mod"}
                    onClick={() => modifyClickHandler(site)}
                >예</DialogRightBtn>
            </>,
        });
    }

    const deleteItem = (e: MouseEvent<HTMLButtonElement>, site: ILocation) => {
        e.stopPropagation();
        viewStoreActions.setDialogStatus({
            title: `지역 <span>삭제</span>`,
            msg: `'${site.nm}' 지역을 삭제하시겠습니까?`,
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
                        deleteReq(site.id);
                    }}
                >예</DialogRightBtn>
            </>,
        });
    }

    return (
        <>
            {/*검색 영역*/}
            <SectionSearch
                totalWidth={"949px"}
                totalHeight={"90px"}
                buttonWidth={"130px"}
                buttonHeight={"40px"}
            />

            {/*리스트 아이템 영역*/}
            <LocaListWrapper>
                <ListWrapper>
                    <HeaderWrapper>
                        <HeaderUl>
                            <HeaderLi></HeaderLi>
                            <HeaderLi>No.</HeaderLi>
                            <HeaderLi>지역명</HeaderLi>
                            <HeaderLi>좌표(x)</HeaderLi>
                            <HeaderLi>좌표(y)</HeaderLi>
                            <HeaderLi>수정</HeaderLi>
                            <HeaderLi>삭제</HeaderLi>
                        </HeaderUl>
                    </HeaderWrapper>
                    {siteList && siteList?.length > 0 &&
                    siteList.filter((site) => site.nm.includes(searchWord)).length !== 0 ?
                        <ScrollArea>
                            {
                                siteList && siteList?.length > 0 &&
                                siteList
                                    .filter((site) => site.nm.includes(searchWord))
                                    .map((site, index) => {
                                        return (
                                            <ListItem
                                                key={`SITE_LIST_ITEM_${site.id}`}
                                                onClick={(e) => listItemClickHandler(e, site)}
                                            >
                                                <ItemUl $isActive={site.id === activeLocation?.id}
                                                        ref={el => {
                                                            ref.current[index] = el
                                                        }}
                                                >
                                                    <ItemLi $isLock={site.isLock}/>
                                                    <ItemLi>{index + 1}</ItemLi>
                                                    <ItemLi>{site.nm}</ItemLi>
                                                    <ItemLi>{site.lng}</ItemLi>
                                                    <ItemLi>{site.lat}</ItemLi>
                                                    <ItemLi>
                                                        <ModBtn onClick={(e) => modifyItem(e, site)}/>
                                                    </ItemLi>
                                                    <ItemLi>
                                                        <DelBtn onClick={(e) => deleteItem(e, site)}/>
                                                    </ItemLi>
                                                </ItemUl>
                                            </ListItem>
                                        )
                                    })
                            }
                        </ScrollArea>
                        :
                        <NoDataArea>
                            '{searchWord}' 로 검색된 결과가 없습니다.
                        </NoDataArea>
                    }
                </ListWrapper>
                <DetailSiteInfo>
                    <>{activeLocation ? <LocaPreview/> : <LocaNoData/>}</>
                </DetailSiteInfo>
            </LocaListWrapper>
        </>
    )
}

export default LocaListSection

const LocaListWrapper = styled.div`
    display: flex;
    flex-direction: row;

    width: 1594px;
    height: 737px;
`

const ListWrapper = styled.div`
    width: 949px;
    height: 720px;
    //background-color: red;
`

const ScrollArea = styled.div`
    max-height: 673px;
    overflow-y: scroll;
`

const ListItem = styled.div`
    width: 929px;
    height: 54px;
    background: #FFFFFF;
    border: 2px solid #769FCD;
    border-radius: 13px;
    margin-bottom: 8px;
    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }
`

const DetailSiteInfo = styled.div`
    width: 609px;
    height: 737px;
`

const HeaderWrapper = styled.div`
    width: 929px;
    height: 34px;
    background: #FFFFFF;
    border: 2px solid #769FCD;
    border-radius: 13px;
    margin-bottom: 8px;
`

const HeaderUl = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 929px;
    height: 34px;
    background: #FFFFFF;
    border-radius: 13px;
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 0;
    }
`

const HeaderLi = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(1) {
        width: 30px;
    }

    &:nth-child(2) {
        width: 50px;
    }

    &:nth-child(3) {
        width: 200px;
    }

    &:nth-child(4) {
        width: 200px;
    }

    &:nth-child(5) {
        width: 200px;
    }

    &:nth-child(6) {
        width: 100px;
    }

    &:nth-child(7) {
        width: 100px;
    }
`

const ItemUl = styled.ul<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 929px;
    height: 54px;
    border-radius: 10px;
    transition: all 150ms;

    background: ${(props) => props.$isActive ? "#769FCD" : "#FFFFFF"};
    color: ${(props) => props.$isActive ? "#FFFFFF" : "#6c757d"};

    &:hover {
        background: ${(props) => props.$isActive ? "#769FCD" : "#93B7E4"};
        color: #FFFFFF;
    }
`

const ItemLi = styled.li<{ $isLock?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(1) {
        margin-left: 14px;
        width: 16px;
        height: 16px;
        background-image: ${(props) => props?.$isLock && `url(${icon_lock})`};
    }

    &:nth-child(2) {
        width: 50px;
    }

    &:nth-child(3) {
        width: 200px;
    }

    &:nth-child(4) {
        width: 200px;
    }

    &:nth-child(5) {
        width: 200px;
    }

    &:nth-child(6) {
        width: 100px;
    }

    &:nth-child(7) {
        width: 100px;
    }
`

export const ModBtn = styled.button`
    width: 33px;
    height: 33px;
    border-radius: 5px;
    background-color: #F7FBFC;

    background-image: url(${edit_btn});
    cursor: pointer;
    border: 3px solid #769FCD;

    &:disabled {
        background-color: #C4C4C4;
        cursor: not-allowed;

        &:hover {
            border-color: #769FCD;
        }
    }

    &:hover {
        border-color: #93B7E4;
    }

    &:active {
        border-color: #517EBC;
    }
`

export const DelBtn = styled.button`
    width: 33px;
    height: 33px;
    border-radius: 5px;
    background-color: #F7FBFC;

    background-image: url(${close_btn});
    cursor: pointer;
    border: 3px solid #FBA4A0;

    &:disabled {
        background-color: #C4C4C4;
        cursor: not-allowed;

        &:hover {
            border-color: #FBA4A0;
        }
    }

    &:hover {
        border-color: #F88985;
    }

    &:active {
        border-color: #F24E49;
    }
`

const NoDataArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 929px;
    height: 669px;
    border: 2px solid #769FCD;
    border-radius: 14px;
`
