import styled from "styled-components";

import img_preparing from "@image/img_preparing.png";

const PreparingSection = (props: { isScroll?: boolean }) => {

    return (
        <PreparingSectionWrapper $isScroll={props.isScroll}>
            <i/>준비중입니다.
        </PreparingSectionWrapper>
    )
}

export default PreparingSection

const PreparingSectionWrapper = styled.div<{ $isScroll?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: ${(props) => props.$isScroll ? `calc(100% - 4px)` : "100%"};
    height: 100%;
    border-radius: 13px;
    border: 2px solid #769FCD;
    font-size: 35px;
    //color: #6c757d;

    i {
        width: 256px;
        height: 256px;
        margin-bottom: 15px;
        background: url(${img_preparing}) no-repeat center/100%;
    }
`
