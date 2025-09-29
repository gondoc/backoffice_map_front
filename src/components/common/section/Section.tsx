import styled from "styled-components";
import useViewStore from "@store/viewStore";
import {NAV_VALUE} from "@config/constant";
import {ILabelValueStatus} from "@type/common.types";
import HistListSection from "@component/common/section/hist/HistListSection";
import LocationSection from "@component/common/section/loca/LocationSection";
import SectionSubTitleArea from "@component/common/section/common/SectionSubTitleArea";
import CategorySection from "@component/common/section/category/CategorySection";
import SystemLogSection from "@component/common/section/systemLog/SystemLogSection";
import AccountMngSection from "@component/common/section/accountMng/AccountMngSection";
import HomeSection from "@component/common/section/home/HomeSection";
import ModUserSection from "@component/common/section/modUser/ModUserSection";

const Section = () => {

    const currentNav: ILabelValueStatus = useViewStore(state => state.currentNav)

    return (
        <SectionWrapper>
            <SectionSubTitleArea/>
            <SectionContentWrapper>
                {/* 요약 */}
                {currentNav.value === NAV_VALUE.HOME && <HomeSection/>}

                {/* 이력 관리 */}
                {currentNav.value === NAV_VALUE.HIST_LIST && <HistListSection/>}

                {/* 분류 관리 */}
                {currentNav.value === NAV_VALUE.CATE_LIST && <CategorySection/>}

                {/* 지역 관리 */}
                {currentNav.value === NAV_VALUE.LOCA_LIST && <LocationSection/>}

                {/* 내 정보 관리 */}
                {currentNav.value === NAV_VALUE.MOD_ACCOUNT && <ModUserSection/>}

                {/* 계정 관리 */}
                {currentNav.value === NAV_VALUE.ACCOUNT_MNG && <AccountMngSection/>}

                {/* 시스템 로그 */}
                {currentNav.value === NAV_VALUE.SYS_LOG && <SystemLogSection/>}
            </SectionContentWrapper>
        </SectionWrapper>
    )
}

export default Section

const SectionWrapper = styled.div`
    width: 1700px;
    height: 1010px;
    background-color: #f5f6f8;
`

const SectionContentWrapper = styled.div`
    width: 1700px;
    height: 827px;
`

export const SectionContent = styled.div<{ $padding?: string }>`
    padding: 53px;
`
