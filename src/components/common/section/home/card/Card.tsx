import styled from "styled-components";

import img_three_dot from "@image/img_three_dot_horizontal.png"
import React from "react";

interface IProps {
    width?: string;
    height?: string;
    padding?: string;
    menuTitle?: string;
    title: string,
    content: string,
    // menuOnClick?: React.MouseEvent<HTMLButtonElement>
    menuOnClick?: () => void;
}

const Card = ({width, height, padding, title, content, menuTitle, menuOnClick}: IProps) => {

    return (
        <CardWrapper
            $width={width}
            $height={height}
            $padding={padding}
        >
            <Wrapper>
                <TitleContent>
                    <CardTitle>{title}</CardTitle>
                    <CardContent>{content}</CardContent>
                </TitleContent>
                <DivLine $isShow={menuTitle !== undefined}/>
                {
                    menuTitle &&
                    <RowMenuArea>
                        {menuTitle}
                        <ThreeDotBtn onClick={menuOnClick}/>
                    </RowMenuArea>
                }
            </Wrapper>

        </CardWrapper>
    )
}

export default Card

const CardWrapper = styled.div<{
    $width?: string,
    $height?: string,
    $padding?: string,
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border: 2px solid #769FCD;
    border-radius: 14px;
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
    color: #6C757D;

    width: ${(props) => props?.$width ? props.$width : "480px"};
    height: ${(props) => props?.$height ? props.$height : "140px"};
    padding: ${(props) => props?.$padding ? props.$padding : "0 10px"};
`

const TitleContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const DivLine = styled.div<{ $isShow: boolean }>`
    display: ${({$isShow}) => $isShow ? "flex" : "none"};
    width: 480px;
    border-bottom: 1px solid #6C757D;
    border-bottom: 2px solid #769FCD;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const CardTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    font-weight: 700;
    font-size: 24px;
`

const CardContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
    font-size: 44px;
    color: #000000;
`

const RowMenuArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    width: 460px;
`

const ThreeDotBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    cursor: pointer;

    background: url(${img_three_dot}) no-repeat center/100%;
`
