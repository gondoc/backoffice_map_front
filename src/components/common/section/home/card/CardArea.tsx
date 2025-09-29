import {useHistQuery} from "@query/MapQuery";
import {useCategoryStatQuery} from "@query/CategoryQuery";
import {useLocationQuery} from "@query/LocationQuery";
import {ILabelValueStatus} from "@type/common.types";
import useViewStore, {useViewStoreActions} from "@store/viewStore";
import Card from "@component/common/section/home/card/Card";
import styled from "styled-components";
import {useEffect} from "react";
import {NAV_VALUE} from "@config/constant";

const CardArea = () => {

    const {data: histData} = useHistQuery();
    const {data: categoryData} = useCategoryStatQuery();
    const {data: siteData} = useLocationQuery();

    const currentNav: ILabelValueStatus = useViewStore(state => state.currentNav)
    const viewStoreActions = useViewStoreActions();

    return (
        <>
            <CardRowsWrapper>
                <Card
                    title={"표출 중인 Career Map 수"}
                    content={histData && histData?.length > 0 ? histData.length.toString() : "0"}
                    menuTitle={"전체보기"}
                    menuOnClick={() => viewStoreActions.setCurrentNav({
                        ...currentNav, value: NAV_VALUE.HIST_LIST, label: "이력 관리"
                    })}
                />
                <Card
                    title={"등록된 분류 수"}
                    content={(categoryData?.activeCnt) ? `${categoryData.activeCnt}/${categoryData.inActiveCnt + categoryData.activeCnt}` : '0/0'}
                    menuTitle={"전체보기"}
                    menuOnClick={() => viewStoreActions.setCurrentNav({
                        ...currentNav, value: NAV_VALUE.CATE_LIST, label: "분류 관리"
                    })}
                />
                <Card
                    title={"등록된 지역 수"}
                    content={siteData && siteData?.length > 0 ? siteData.length.toString() : "0"}
                    menuTitle={"전체보기"}
                    menuOnClick={() => viewStoreActions.setCurrentNav({
                        ...currentNav, value: NAV_VALUE.LOCA_LIST, label: "지역 관리"
                    })}
                />
            </CardRowsWrapper>
        </>
    )
}

export default CardArea

const CardRowsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    //margin-bottom: 20px;
    margin-bottom: 53px;

`

