import CardArea from "@component/common/section/home/card/CardArea";
import PreparingSection from "@component/common/section/common/PreparingSection";
import styled from "styled-components";
import {SectionContent} from "@component/common/section/Section";

const HomeSection = () => {

    return (
        <SectionContent>
            <StHomeScoll>
                {/* 상단 3개의 카드 리스트 */}
                <CardArea/>


                {/*<Chart/>*/}
                <PreparingSection isScroll={true}/>
                {/*<PreparingSection/>*/}
                {/*<PreparingSection/>*/}
                {/*<PreparingSection/>*/}
                {/*<PreparingSection/>*/}

            </StHomeScoll>
        </SectionContent>
    )
}

export default HomeSection

const StHomeScoll = styled.div`
    width: 1590px;
    height: 790px;
    overflow-y: scroll;
`
