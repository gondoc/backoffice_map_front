import {
    DialogDimmed,
    DialogLeftBtn,
    DialogModalArea,
    DialogModalContentArea,
    DialogModalContentFooter,
    DialogModalContentHead,
    DialogModalContentHeadCloseBtn,
    DialogModalContentHeadTitle,
    DialogRightBtn,
    DialogRootArea
} from "@component/common/dialog/DialogArea";
import {useHistStore, useHistStoreActions} from "@store/histStore";
import {validateHistRegForm} from "@utils/commons";
import HistRegForm from "@component/common/section/hist/reg/HistRegForm";
import {useHistModMutation, useHistQuery, useHistRegMutation} from "@query/MapQuery";
import {TStatus} from "@type/common.types";
import {useViewStoreActions} from "@store/viewStore";
import {IHistory} from "@type/hist.types";
import {useQueryClient} from "@tanstack/react-query";
import {QueryKeys} from "@query/QueryKeys";
import useDialogMount from "@hook/useDialogMount";
import styled from "styled-components";
import {useRef} from "react";

const HistRegArea = () => {

    const queryClient = useQueryClient();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const registerForm = useHistStore((state) => state.registerForm)
    const histStoreActions = useHistStoreActions();
    const viewStoreActions = useViewStoreActions()

    const {refetch} = useHistQuery();

    const {mutate: register} = useHistRegMutation(
        (res: IHistory) => successHandler(res, "add"),
        (errorCd?: string | number, msg?: string | undefined | unknown) => failHandler("add", errorCd, msg)
    )

    const {mutate: modify} = useHistModMutation(
        (res: IHistory) => successHandler(res, "mod"),
        (errorCd?: string | number, msg?: string | undefined | unknown) => failHandler("mod", errorCd, msg)
    )

    const {mounted, rendered} = useDialogMount(registerForm.isShow, 450);

    const successHandler = (res: IHistory, status: TStatus) => {
        if (res) {
            viewStoreActions.setToastStatus({status: "success", msg: `이력이 성공적으로 ${status === "add" ? "등록" : "수정"}되었습니다.`})
            histStoreActions.resetRegisterForm();
            queryClient.invalidateQueries({queryKey: [QueryKeys.MAP.list()]})
            refetch();
        }
    }

    const failHandler = (status: TStatus, res?: string | number, msg?: string | undefined | unknown,) => {
        viewStoreActions.setToastStatus({
            status: "failed",
            msg: `(${res ?? 405}) ${msg ? msg : `${status === "add" ? "등록" : "수정"} 요청에 실패하였습니다.`}`
        })
    }

    const leftBtnClickHandler = () => {
        histStoreActions.setRegisterForm({...registerForm, isShow: false});
    }

    const rightBtnClickHandler = () => {
        return registerForm.status === "add" ? register(registerForm) : modify(registerForm);
    }

    if (!mounted) return null; // 완전히 닫힌 뒤에 DOM 제거

    return (
        <HistRootArea
            id="hist-modal-root"
            $mounted={mounted}
            $isOpen={rendered}
            ref={modalRef}
        >
            <DialogDimmed $isOpen={rendered} id="hist-dimmed-root"/>
            <DialogModalArea $isOpen={rendered}>
                <DialogModalContentArea
                    $status={true}
                    $width={"700px"}
                    $height={"520px"}
                >
                    <DialogModalContentHead $status={true}>
                        <DialogModalContentHeadTitle $status={true}>
                            <h3>이력 <span>{registerForm.status === "add" ? "등록" : "수정"}</span></h3>
                        </DialogModalContentHeadTitle>
                        <DialogModalContentHeadCloseBtn onClick={() => histStoreActions.resetRegisterForm()}/>
                    </DialogModalContentHead>

                    {/* 사용자 입력 폼 영역 */}
                    <HistRegForm menuPortalTarget={modalRef.current ?? undefined}/>

                    <DialogModalContentFooter>
                        <DialogLeftBtn
                            $status={"mod"}
                            onClick={() => leftBtnClickHandler()}>
                            {/*{(phase !== 4 && phase !== 0) ? "이전" : "취소"}*/}
                            취소
                        </DialogLeftBtn>
                        <DialogRightBtn
                            disabled={!(validateHistRegForm(registerForm))}
                            $status={"mod"}
                            // onClick={() => registerBtnClickHandler()}
                            onClick={() => rightBtnClickHandler()}>
                            {/*{(phase !== 4) ? "다음" : "등록"}*/}
                            {registerForm.status === "add" ? "등록" : "수정"}
                        </DialogRightBtn>
                    </DialogModalContentFooter>
                </DialogModalContentArea>
            </DialogModalArea>
        </HistRootArea>
    )
}

export default HistRegArea

const HistRootArea = styled(DialogRootArea)``