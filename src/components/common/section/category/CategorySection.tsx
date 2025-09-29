import CateItem from "@component/common/section/category/list/CateItem";
import SectionSearch from "@component/common/section/common/search/SectionSearch";
import {ICategory} from "@type/categories.types";
import styled from "styled-components";
import useViewStore from "@store/viewStore";
import {useCategoryQuery} from "@query/CategoryQuery";
import {useEffect, useState} from "react";

import icon_lock from "@image/icon_lock.png";
import {SectionContent} from "@component/common/section/Section";

const CategorySection = () => {

    const searchWord = useViewStore((state) => state.searchWord);

    const {data: cateList, isSuccess, isError} = useCategoryQuery();

    const [itemList, setItemList] = useState<ICategory[] | null>(null)

    useEffect(() => {
        if (searchWord && searchWord?.length > 0) {
            const filteredList: ICategory[] | undefined = cateList?.filter((item) => item.content.includes(searchWord) ||
                item.nm.includes(searchWord))
            if (filteredList) setItemList(filteredList)
        } else {
            initItemList();
        }
    }, [searchWord])

    useEffect(() => {
        if (!cateList || isError) {
            return setItemList(null);
        }
        initItemList();
    }, [cateList, isSuccess, isError])

    const initItemList = () => {
        if (isSuccess && cateList && cateList?.length > 0) {
            return setItemList(cateList)
        }
    }

    return (
        <SectionContent>
            {/*검색 영역*/}
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
                    <ScrollArea>
                        {
                            itemList?.map((item: ICategory, index: number) =>
                                <CateItem
                                    key={`CATE_ITEM_AREA_${item.id}`}
                                    item={item}
                                    index={index}
                                />)
                        }
                    </ScrollArea>
                }
            </SectionListWrapper>
        </SectionContent>
    )
}

export default CategorySection


export const SectionListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 1594px;
    height: 737px;
`

export const ScrollArea = styled.div`
    max-height: 737px;
    width: 1594px;
    overflow-y: scroll;
`

export const ItemBox = styled.div<{ $width?: string, $height?: string, $isLock?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => props?.$width ? props.$width : "50px"};
    height: ${(props) => props?.$height ? props.$height : "50px"};
    
    &::before {
        content: "";
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: ${(props) => props?.$isLock && `url(${icon_lock})`};
    }
`

export const MsgArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1590px;
    height: 733px;
    border: 2px solid #769FCD;
    border-radius: 14px;

    span {
        font-size: 18px;
        color: #FFFFFF;
        background-color: #5D84F0;
    }
`
