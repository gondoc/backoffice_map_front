import styled from "styled-components";
import viewStore, {useViewStoreActions} from "@store/viewStore";
import {IDialogStatus, TStatus} from "@type/common.types";

import close_btn from "@image/close_btn.svg";
import useDialogMount from "@hook/useDialogMount";

const DialogArea = () => {

    const dialogStatus: IDialogStatus = viewStore(state => state.dialogStatus);
    const viewStoreActions = useViewStoreActions();

    const {mounted, rendered} = useDialogMount(dialogStatus.isOpen, 450);

    return (
        // <DialogRootArea $isOpen={dialogStatus.isOpen}>
        <DialogRootArea $mounted={mounted} $isOpen={rendered}>
            <DialogDimmed $isOpen={rendered}/>
            <DialogModalArea $isOpen={rendered}>
                <DialogModalContentArea $status={dialogStatus.status === "mod"}>
                    <DialogModalContentHead $status={dialogStatus.status === "mod"}>
                        <DialogModalContentHeadTitle
                            $status={dialogStatus.status === "mod"}
                            dangerouslySetInnerHTML={{__html: dialogStatus.title}}
                        />
                        {
                            !(dialogStatus?.noCloseBtn) &&
                            <DialogModalContentHeadCloseBtn
                                onClick={() => viewStoreActions.setDialogStatus({...dialogStatus, isOpen: false})}
                            />
                        }
                    </DialogModalContentHead>

                    <DialogModalContentBody
                        dangerouslySetInnerHTML={{__html: dialogStatus.msg}}
                    />
                    <DialogModalContentFooter>
                        {dialogStatus.leftBtn}
                        {dialogStatus.rightBtn}
                    </DialogModalContentFooter>
                </DialogModalContentArea>

            </DialogModalArea>
        </DialogRootArea>
    )
}

export default DialogArea

export const DialogRootArea = styled.div<{ $mounted: boolean; $isOpen: boolean }>`
    position: fixed;
    inset: 0;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;

    visibility: ${({$mounted}) => ($mounted ? "visible" : "hidden")};
    opacity: ${({$isOpen}) => ($isOpen ? "1" : "0")};
    transition: opacity 450ms ease; /* transition은 상수로 유지 */
    pointer-events: ${({$isOpen}) => ($isOpen ? "auto" : "none")};
`;

export const DialogDimmed = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);

    opacity: ${({$isOpen}) => ($isOpen ? 1 : 0)};
    transition: opacity 450ms ease;
    pointer-events: ${({$isOpen}) => ($isOpen ? "auto" : "none")};
`;

export const DialogModalArea = styled.div<{ $isOpen: boolean }>`
    //display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${({$isOpen}) => $isOpen ? "translate(-50%, -50%)" : "translate(-50%, -48%)"};
    opacity: ${({$isOpen}) => ($isOpen ? 1 : 0)};
    transition: opacity 450ms ease, transform 450ms ease;
    border-radius: 12px;
    pointer-events: ${({$isOpen}) => ($isOpen ? "auto" : "none")};
`;

export const DialogModalContentArea = styled.div<{
    $status?: boolean,
    $width?: string,
    $height?: string
}>`
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #769FCD;
    border-radius: 20px;
    background: #FFFFFF;
    box-shadow: 0px 12px 20px 4px rgba(0, 0, 0, 0.6);

    border: ${({$status}) => $status ? "3px solid #769FCD" : "3px solid #FBA4A0"};
    width: ${({$width}) => $width ? $width : "408px"};
    height: ${({$height}) => $height ? $height : "fit-content"};
`
// height: ${({$height}) => $height ? $height : "fit-content"};

export const DialogModalContentHead = styled.div<{ $status?: boolean }>`
    display: flex;
    align-items: center;
    border-radius: 16px 16px 0 0;
    padding: 18px 24px 24px 24px;

    border-bottom: ${({$status}) => $status ? "3px solid #769FCD" : "3px solid #FBA4A0"};
`

export const DialogModalContentHeadTitle = styled.div<{ $status?: boolean }>`
    color: #000000;

    h3 {
        display: inline-block;
        position: relative;
        font-size: 18px;
        font-weight: 500;
    }

    span {
        font-size: 18px;
        font-weight: 500;
        color: ${({$status}) => $status ? "#769FCD" : "#F24E49"};
    }
`

export const DialogModalContentHeadCloseBtn = styled.button`
    width: 30px;
    height: 30px;
    margin-left: auto;
    border: 0;
    cursor: pointer;

    background: url(${close_btn}) no-repeat center/100%;
`

const DialogModalContentBody = styled.p<{ $height?: string }>`
    padding: 19px 24px;
    font-size: 17px;
    line-height: 1.33;
    white-space: pre-line;
    color: #000000;

    height: ${({$height}) => $height ?? "36px"};
`

export const DialogModalContentFooter = styled.div`
    display: flex;
    justify-content: end;
    gap: 0 8px;
    padding: 16px 24px 24px;
`

export const DialogLeftBtn = styled.button<{ $status?: TStatus }>`
    width: 104px;
    color: #6c757d;
    background-color: #F7FBFC;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    height: 36px;
    padding: 5px 18px;
    cursor: pointer;

    border: ${({$status}) => $status === "del" ? "1px solid #FBA4A0" : "1px solid #769FCD"};

    &:hover {
        border: ${({$status}) => $status === "del" ? "1px solid #F88985" : "1px solid #93B7E4"};
    }

    &:active {
        border: ${({$status}) => $status === "del" ? "1px solid #F24E49" : "1px solid #517EBC"};
    }
`

export const DialogRightBtn = styled.button<{ $status?: TStatus }>`
    width: 104px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    height: 36px;
    padding: 5px 18px;
    cursor: pointer;
    border: 0;

    background-color: ${({$status}) => $status === "del" ? "#CD7676" : "#769FCD"};
    color: #FFFFFF;

    &:disabled {
        background-color: #C4C4C4;
        cursor: not-allowed;

        &:hover {
            background-color: #C4C4C4;
        }
    }

    &:hover {
        background-color: ${({$status}) => $status === "del" ? "#E49393" : "#93B7E4"};
    }

    &:active {
        background-color: ${({$status}) => $status === "del" ? "#BC5151" : "#517EBC"};
    }

`
