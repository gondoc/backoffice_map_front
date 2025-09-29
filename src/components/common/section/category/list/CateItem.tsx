import {ICategory} from "@type/categories.types";
import CateItemContent from "@component/common/section/category/list/CateItemContent";
import CateListBtnGroup from "@component/common/section/category/list/CateListBtnGroup";
import styled from "styled-components";
import {ItemBox} from "@component/common/section/category/CategorySection";
import {useState} from "react";

interface IProps {
    item: ICategory,
    index: number,
}

const CateItem = ({item, index}: IProps) => {

    const [updateItem, setUpdateItem] = useState<{
        id: string,
        nm: string,
        content: string,
        isUpdate: boolean,
    }>({
        id: item.id!,
        nm: item.nm,
        content: item.content,
        isUpdate: false,
    });

    return (
        <ListItemArea $isActive={false} key={`CATE_ITEM_AREA_${item.id}`}>
            <ItemBox $isLock={item.isLock} $width={"16px"}></ItemBox>
            <ItemBox $width={"16px"}>{index + 1}</ItemBox>
            <ContentArea $width={"742px"}>
                <CateItemContent
                    key={`CATE_ITEM_CONTENT_${item.id}`}
                    index={index}
                    item={item}
                    updateItem={updateItem}
                    setUpdateItem={setUpdateItem}
                />
            </ContentArea>
            <ContentArea>
                <DtmBox>등록일</DtmBox>
                <DtmBox>{item.createDtm}</DtmBox>
            </ContentArea>
            <ContentArea>
                <DtmBox>수정일</DtmBox>
                <DtmBox>{item?.updateDtm ? item?.updateDtm : "-"}</DtmBox>
            </ContentArea>

            {/*수정 삭제 버튼 그룹*/}
            <CateListBtnGroup
                item={item}
                isUpdate={updateItem.isUpdate}
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}
            />
        </ListItemArea>
    )
}

export default CateItem


export const ListItemArea = styled.div<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 1575px;
    height: fit-content;
    border-radius: 10px;
    background: #FFFFFF;
    border: 2px solid #769FCD;
    margin-bottom: 8px;
    transition: all 150ms ease-out;

    background: ${(props) => props.$isActive ? "#769FCD" : "#FFFFFF"};
    color: ${(props) => props.$isActive ? "#FFFFFF" : "#6c757d"};

    &:last-child {
        margin-bottom: 0;
    }
`

const DtmBox = styled.div<{ $width?: string, $height?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 30px;
`

const ContentArea = styled.div<{ $width?: string }>`
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin: 10px 0;
    width: ${(props) => props?.$width ? props.$width : "200px"};
`
