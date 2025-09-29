import {useHistQuery} from "@query/MapQuery";
import {useEffect, useState} from "react";
import SectionSearch from "@component/common/section/common/search/SectionSearch";
import {IHistory} from "@type/hist.types";
import {MsgArea, ScrollArea, SectionListWrapper} from "@component/common/section/category/CategorySection";
import useViewStore from "@store/viewStore";
import HistItem from "@component/common/section/hist/list/HistItem";
import styled from "styled-components";
import {SectionContent} from "@component/common/section/Section";

const HistListSection = () => {

    const searchWord = useViewStore((state) => state.searchWord);

    const {data: histItems, isError, isSuccess } = useHistQuery();

    const [itemList, setItemList] = useState<IHistory[] | null>(null)

    useEffect(() => {
        if (searchWord && searchWord?.length > 0) {
            const filteredList: IHistory[] | undefined = histItems?.filter((item) =>
                item.histNm.includes(searchWord) ||
                item.siteNm.includes(searchWord) ||
                item.categoryNm.includes(searchWord))
            if (filteredList) setItemList(filteredList)
        } else {
            initItemList();
        }
    }, [searchWord])

    useEffect(() => {
        if (!histItems || isError) {
            return setItemList(null);
        }
        initItemList();
    }, [histItems, isSuccess, isError])

    const initItemList = () => {
        if (isSuccess && histItems && histItems?.length > 0) {
            return setItemList(histItems)
        }
    }

    return (
        <SectionContent>
            <SectionSearch
                totalWidth={"100%"}
                totalHeight={"90px"}
                buttonWidth={"130px"}
                buttonHeight={"40px"}
            />
            <SectionListWrapper>
                {
                    itemList?.length === 0 &&
                    <MsgArea>
                        '<span>{searchWord}</span>' 로 검색된 결과가 없습니다.
                    </MsgArea>
                }
                {
                    itemList === null &&
                    <MsgArea>
                        <p>현재 서버 점검으로 인해 데이터를 불러올 수 없습니다.<br/>
                            잠시 후 다시 시도 바랍니다.</p>
                    </MsgArea>
                }
                {
                    itemList !== null &&
                    itemList?.length !== 0 &&
                    <>
                        <HeaderWrapper>
                            <HeaderUl>
                                <HeaderLi>No.</HeaderLi>
                                <HeaderLi>프로젝트 이력 명</HeaderLi>
                                <HeaderLi>지역명</HeaderLi>
                                <HeaderLi>분류명</HeaderLi>
                                <HeaderLi>작업 시작 ~ 작업 종료</HeaderLi>
                                <HeaderLi>개발인원</HeaderLi>
                                <HeaderLi>최근 수정일</HeaderLi>
                                <HeaderLi>수정</HeaderLi>
                                <HeaderLi>삭제</HeaderLi>
                            </HeaderUl>
                        </HeaderWrapper>
                        <ScrollArea>
                            {
                                itemList?.map((item: IHistory, index: number) =>
                                    <HistItem
                                        key={`HIST_ITEM_AREA_${item.id}`}
                                        item={item}
                                        index={index}
                                    />
                                )
                            }
                        </ScrollArea>
                    </>
                }
            </SectionListWrapper>
        </SectionContent>
    )
}

export default HistListSection

const HeaderWrapper = styled.div`
    width: 1575px;
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
    width: 1575px;
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
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: right;
    }

    &:nth-child(2) {
        width: 200px;
    }

    &:nth-child(3) {
        width: 120px;
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
        width: 160px;
    }

    &:nth-child(8) {
        width: 33px;
    }

    &:nth-child(9) {
        width: 33px;
    }
`
