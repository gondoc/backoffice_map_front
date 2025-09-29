import {FieldName, FieldRow, InputWrapper} from "@component/common/section/modUser/ModUserSection";
import {StModBtn} from "@component/common/section/modUser/preview/ModUserInfoArea";
import React from "react";
import styled from "styled-components";

interface IProps {
    value: string,
    labelId: string,
    labelNm: string
    isFirst?: boolean,
    btn?: {
        btnLabel?: string,
        clickHandler?: () => void,
    };
    icon?: string;
}

const PreviewRow = ({
                        value,
                        labelId,
                        labelNm,
                        isFirst,
                        btn,
                        icon,
                    }: IProps) => {

    return (
        <FieldRow $isFirst={isFirst}>
            <FieldName htmlFor={labelId}
                       $height={"45px"}
                       $width={"125px"}
                       $padding={"0 0 0 5px"}
            >
                {labelNm}
            </FieldName>
            <InputWrapper>
                <StValue id={labelId} icon={icon}>
                    {value}
                    {/* TODO 아이콘 이미지가 안나온다 고쳐라 */}
                    {
                        icon &&
                        <i></i>
                    }
                </StValue>
                {
                    btn &&
                    <StModBtn
                        $ml={"10px"}
                        onClick={btn?.clickHandler && btn?.clickHandler}
                    >
                        {btn?.btnLabel}
                    </StModBtn>
                }
            </InputWrapper>
        </FieldRow>
    )
}

export default PreviewRow

const StValue = styled.div<{ existBtn?: boolean, icon?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    border-bottom: 2px solid #769FCD;
    margin-left: 10px;
    font-size: 17px;
    width: ${({existBtn}) => existBtn ? "320px" : "400px"};

    i {
        position: absolute;
        left: -1200px;
        width: 16px;
        height: 16px;
        background-image: url(${(props) => props.icon});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        display: ${({icon}) => icon ? "block" : "none"};
        background: red;
    }
`
