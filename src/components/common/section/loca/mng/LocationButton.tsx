import styled from "styled-components";
import React from "react";

interface IProps {
    btnLabel: string;
    type: "submit" | "reset" | "button" | undefined;
    onClick?: () => void;
    disabled?: boolean;
}

const LocationButton = ({btnLabel, type, onClick, disabled}: IProps) => {

    return (
        <RegisterBtnWrapper>
            <RegisterIconBtn
                disabled={disabled}
                type={type}
                onClick={onClick && onClick}
            >{btnLabel}</RegisterIconBtn>
        </RegisterBtnWrapper>
    )
}

export default LocationButton

const RegisterBtnWrapper = styled.div`
    display: flex;
    width: 482px;
    height: 50px;
    justify-content: flex-end;
`

const RegisterIconBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 130px;
    height: 30px;
    z-index: 1;
    background-color: #769FCD;
    color: #FFFFFF;
    border: 0;
    margin-left: 10px;
    border-radius: 5px;

    &:disabled {
        background-color: #C4C4C4;
    }

    &:hover {
        background-color: #93B7E4;
    }

    &:active {
        background-color: #517EBC;
    }
`
