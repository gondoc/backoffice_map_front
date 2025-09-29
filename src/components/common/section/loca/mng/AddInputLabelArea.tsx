import styled from "styled-components";
import React from "react";

interface IProps {
    label: string;
    isRequired: boolean;
    children?: React.ReactNode;
}

const AddInputLabelArea = ({
                               label,
                               isRequired,
                               children,
                           }: IProps) => {

    const RequiredMark = ({isRequired}: { isRequired: boolean }) => {
        return (
            <span style={{color: "#F24E49", marginRight: "3px", width: "7px"}}>{isRequired && "*"}</span>
        );
    };

    return (
        <AddInputArea>
            <div>
                <AddInputLabel
                    $isRequired={isRequired}
                >
                    <RequiredMark isRequired={isRequired}></RequiredMark>
                    {label}
                </AddInputLabel>
            </div>
            {children}
        </AddInputArea>
    )
}

export default AddInputLabelArea

const AddInputArea = styled.div`
    width: 482px;
    height: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const AddInputLabel = styled.div<{ $isRequired?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px 0 5px;
    width: 85px;
    height: 80px;
    color: #6c757d;

`
// width: ${(props) => props.$isRequired ? "77px" :
//         // "52px"
//         "78px"
// };

