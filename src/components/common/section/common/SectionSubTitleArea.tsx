import {findNavLabel, validateChangedForm, validateIsWriting} from "@utils/commons";
import styled from "styled-components";
import {DialogLeftBtn, DialogRightBtn} from "@component/common/dialog/DialogArea";
import useMapStore from "@store/mapStore";
import {ILabelValueStatus} from "@type/common.types";
import useViewStore, {useViewStoreActions} from "@store/viewStore";
import {useLocationStore, useLocationStoreActions} from "@store/locationStore";
import {NAV_VALUE} from "@config/constant";
import {useCategoryStore, useCategoryStoreActions} from "@store/categoryStore";
import {useHistStore, useHistStoreActions} from "@store/histStore";

const SectionSubTitleArea = () => {
    const mapCenter = useMapStore((state) => state.mapCenter)
    const currentNav: ILabelValueStatus = useViewStore(state => state.currentNav)
    const registerForm = useLocationStore((state) => state.registerForm)
    const histRegisterForm = useHistStore((state) => state.registerForm)
    const activeLocation = useLocationStore((state) => state.activeLocation)
    const cateGoryRegisterForm = useCategoryStore((state) => state.registerForm)
    const viewStoreActions = useViewStoreActions();
    const locationStoreActions = useLocationStoreActions();
    const categoryStoreActions = useCategoryStoreActions();
    const histStoreActions = useHistStoreActions();

    const onClickHandler = () => {
        // 신규등록
        if (currentNav.status === "none") {
            // 이력등록
            if (currentNav.value === NAV_VALUE.HIST_LIST) {
                console.log(" hist add !! ");
                histStoreActions.setRegisterForm({...histRegisterForm, isShow: true})
            }

            // 분류등록
            if (currentNav.value === NAV_VALUE.CATE_LIST) {
                categoryStoreActions.setRegisterForm({...cateGoryRegisterForm, isShow: true})
                return;
            }

            // 지역등록
            if (currentNav.value === NAV_VALUE.LOCA_LIST) {
                locationStoreActions.setCoordinateIcon({
                    isActive: true,
                    x: mapCenter.center.lng.toString(),
                    y: mapCenter.center.lat.toString()
                })
                locationStoreActions.resetRegisterForm()
                return viewStoreActions.setCurrentNav({...currentNav, status: "add"})
            }
        }

        // 수정
        if (currentNav.status === "mod") {
            const isChanged: boolean = validateChangedForm(activeLocation, registerForm)
            if (isChanged) {
                viewStoreActions.setDialogStatus({
                    title: `알림`,
                    msg: `수정중인 항목이 있습니다. 돌아가시겠습니까?`,
                    isOpen: true,
                    isJustConfirm: false,
                    status: "mod",
                    leftBtn: <>
                        <DialogLeftBtn
                            $status={"mod"}
                            onClick={() => viewStoreActions.initDialogStatus()}
                        >아니오</DialogLeftBtn>
                    </>,
                    rightBtn: <>
                        <DialogRightBtn
                            $status={"mod"}
                            onClick={() => {
                                viewStoreActions.setCurrentNav({...currentNav, status: "none"})
                                viewStoreActions.initDialogStatus()
                                locationStoreActions.resetRegisterForm()
                            }}
                        >예</DialogRightBtn>
                    </>,
                });
                return;
            } else {
                return viewStoreActions.setCurrentNav({...currentNav, status: "none"})
            }
        }

        // 등록
        if (currentNav.status === "add") {
            const isWriting: boolean = validateIsWriting(registerForm)
            if (isWriting) {
                viewStoreActions.setDialogStatus({
                    title: `알림`,
                    msg: `작성중인 항목이 있습니다. 돌아가시겠습니까?\n예를 누르실 경우 작성중인 화면은 초기화 됩니다.`,
                    isOpen: true,
                    isJustConfirm: false,
                    status: "mod",
                    leftBtn: <>
                        <DialogLeftBtn
                            $status={"mod"}
                            onClick={() => viewStoreActions.initDialogStatus()}
                        >아니오</DialogLeftBtn>
                    </>,
                    rightBtn: <>
                        <DialogRightBtn
                            $status={"mod"}
                            onClick={() => {
                                viewStoreActions.setCurrentNav({...currentNav, status: "none"})
                                viewStoreActions.initDialogStatus()
                                locationStoreActions.resetRegisterForm()
                            }}
                        >예</DialogRightBtn>
                    </>,
                });
                return;
            } else {
                return viewStoreActions.setCurrentNav({...currentNav, status: "none"})
            }
        }
    }

    return (
        <SubTitleArea>
            <SectionName>{currentNav.status === "none" ? currentNav.label : findNavLabel(currentNav.label, currentNav.status)}</SectionName>
            {
                (currentNav.value !== NAV_VALUE.HOME &&
                    currentNav.value !== NAV_VALUE.MOD_ACCOUNT &&
                    currentNav.value !== NAV_VALUE.ACCOUNT_MNG &&
                    currentNav.value !== NAV_VALUE.SYS_LOG) &&
                <RegisterBtn
                    onClick={() => onClickHandler()}
                    disabled={
                        // currentNav.value === NAV_VALUE.HIST_LIST ||
                        currentNav.value === NAV_VALUE.MOD_ACCOUNT ||
                        currentNav.value === NAV_VALUE.ACCOUNT_MNG ||
                        currentNav.value === NAV_VALUE.SYS_LOG
                    }
                >{currentNav.status === "none" ? "신규 등록" : "돌아가기"}</RegisterBtn>
            }
        </SubTitleArea>
    )
}

export default SectionSubTitleArea

const SubTitleArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px #769FCD;
`

const SectionName = styled.h2`
    margin: 24px;
`

const RegisterBtn = styled.button<{
    $width?: string,
    $height?: string,
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    background-color: #769FCD;
    color: #FFFFFF;
    border: 0;
    margin-left: 10px;
    border-radius: 5px;
    margin-right: 24px;
    font-size: 18px;
    cursor: pointer;

    width: ${(props) => props?.$width ? props.$width : "130px"};
    height: ${(props) => props.$height ? props.$height : "40px"};

    &:disabled {
        background-color: #C4C4C4;
        cursor: not-allowed;

        &:hover {
            background-color: #C4C4C4;
        }
    }

    &:hover {
        background-color: #93B7E4;
    }

    &:active {
        background-color: #517EBC;
    }

`