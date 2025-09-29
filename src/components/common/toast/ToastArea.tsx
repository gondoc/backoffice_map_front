import useViewStore from "@store/viewStore";
import {useEffect} from "react";
import styled from "styled-components";

const ToastArea = () => {

    const toastStatus = useViewStore((state) => state.toastStatus);
    const viewStoreActions = useViewStore((state) => state.actions);

    useEffect(() => {
        if (toastStatus.status !== "none") {
            // const findContent: string = findShowContent(toastStatus);
            // setContent(findContent);
            setTimeout(() => viewStoreActions.setToastStatus({status: "none", msg: ""}), 3000)
        }
    }, [toastStatus])


    // const findShowContent = (toastStatus: ToastStatusType, searchWord?: string) => {
    //     if (toastStatus !== "noResult") {
    //         return TOAST_CONTENT[toastStatus].content;
    //     } else {
    //         return TOAST_CONTENT[toastStatus].content.replace("{search}", `<span>${searchWord}</span>`);
    //     }
    // }

    return (
        <StToastAreaWrapper $isShow={toastStatus.status !== "none"}>
            <StToastArea>
                <StToastContentArea dangerouslySetInnerHTML={{__html: toastStatus.msg}}/>
            </StToastArea>
        </StToastAreaWrapper>
    )
}

export default ToastArea

const StToastAreaWrapper = styled.div<{ $isShow: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1920px;
    height: 1080px;
    z-index: 10;

    opacity: ${({$isShow}) => $isShow ? '1' : '0'};
    visibility: ${({$isShow}) => $isShow ? 'visible' : 'hidden'};
    transition: ${({$isShow}) => $isShow ? 'opacity 450ms' : 'visibility 1ms 450ms, opacity 450ms'};
`

const StToastContentArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: auto;
    min-width: 450px;
    margin: 0 15px;
    height: 54px;
    color: black;
    font-size: large;
    white-space: pre-wrap;

    span {
        background-color: #D6E6F2;
    }
`

const StToastArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 73px;
    border-radius: 8px;
    border: 3px solid #769FCD;
    background-color: #F7FBFC;
`
