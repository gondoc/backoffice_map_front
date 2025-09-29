import styled from "styled-components";
import {useHistStore, useHistStoreActions} from "@store/histStore";
import {useLocationQuery} from "@query/LocationQuery";
import {useEffect, useState} from "react";
import Select from "react-select";
import {ILabelValue} from "@type/common.types";
import {ILocation} from "@type/location.types";
import "react-datepicker/dist/react-datepicker.css";
import {NameDiv, NameInput, NameLabel} from "@component/common/section/category/reg/CategoryRegArea";
import {useCategoryQuery} from "@query/CategoryQuery";
import {ICategory} from "@type/categories.types";
import HistRegDateInputArea from "@component/common/section/hist/reg/HistRegDateInputArea";

type Props = {
    menuPortalTarget?: HTMLElement | null | undefined;
};

const HistRegForm = ({ menuPortalTarget }: Props) => {

    const registerForm = useHistStore((state) => state.registerForm)
    const histStoreActions = useHistStoreActions();

    const notAllowChar: RegExp = /^[1-9]$/
    const notOneDigit1to9 = /^(?![1-9]$).+$/;
    const {data: siteList, isSuccess} = useLocationQuery();
    const {data: categoryList, isSuccess: cateIsSuccess} = useCategoryQuery();
    const [optionList, setOptionList] = useState<ILabelValue[] | null>([{label: "선택해주세요", value: ""}]);
    const [cateOptionList, setCateOptionList] = useState<ILabelValue[] | null>([{label: "선택해주세요", value: ""}]);

    useEffect(() => {
        if (isSuccess && siteList && siteList.length > 0) {
            setOptionList(() => siteList.map((site: ILocation) => {
                return {label: site.nm, value: site.id};
            }))
        } else {
            setOptionList(null)
        }
    }, [siteList])

    useEffect(() => {
        if (cateIsSuccess && categoryList && categoryList.length > 0) {
            setCateOptionList(() => categoryList.map((item: ICategory) => {
                return {label: item.nm, value: item.id!};
            }))
        } else {
            setCateOptionList(null)
        }
    }, [categoryList])

    const findNotAllowChar = (typing: string) => {
        if (notAllowChar.test(typing)) {
            return typing;
        } else {
            return typing.replace(notOneDigit1to9, "");
        }
    }

    return (
        <NameWrapper>
            <FieldRow>
                <FieldName htmlFor={`HIST_REG_NAME`}
                           $height={"45px"}
                           $width={"125px"}
                           $padding={"0 0 0 25px"}
                >
                    프로젝트 이력명
                </FieldName>

                <InputWrapper>
                    <ContentInput
                        autoComplete={"off"}
                        minLength={5}
                        maxLength={25}
                        type={"search"}
                        id={`HIST_REG_NAME`}
                        $width={"410px"}
                        value={registerForm.histNm}
                        placeholder={"프로젝트 명을 기입해주세요"}
                        onChange={(e) =>
                            histStoreActions.setRegisterForm({...registerForm, histNm: e.target.value})
                        }
                    />
                </InputWrapper>
                <TypingCntArea $isOver={registerForm.histNm.length > 20 || registerForm.histNm.length < 6}>
                    <span>{registerForm.histNm.length}</span>/25
                </TypingCntArea>
            </FieldRow>
            <FieldRow>
                <FieldName htmlFor={`HIST_STAFF_CNT`}
                           $height={"45px"}
                           $width={"125px"}
                           $padding={"0 0 0 25px"}
                >
                    개발 인원
                </FieldName>
                <InputWrapper>
                    <ContentInput
                        autoComplete={"off"}
                        min={1}
                        max={9}
                        minLength={1}
                        maxLength={1}
                        type={"search"}
                        id={`HIST_STAFF_CNT`}
                        $width={"410px"}
                        placeholder={"0"}
                        value={registerForm.staffCnt}
                        onChange={(e) =>
                            histStoreActions.setRegisterForm({...registerForm, staffCnt: findNotAllowChar(e.target.value)})
                        }
                    />
                </InputWrapper>
            </FieldRow>
            <FieldRow>
                <FieldDiv
                    $height={"45px"}
                    $width={"125px"}
                    $padding={"0 0 0 25px"}
                >
                    지역명
                </FieldDiv>
                <InputWrapper>
                    <Select
                        options={optionList}
                        styles={selectStyleConfig}
                        menuPortalTarget={menuPortalTarget ?? undefined}
                        menuPosition="absolute"    // <-- fixed 대신 absolute
                        menuShouldBlockScroll={true}
                        onChange={(e: ILabelValue) => histStoreActions.setRegisterForm({
                            ...registerForm,
                            siteId: e.value as string,
                            siteNm: e.label
                        })}
                        value={{
                            value: registerForm.siteId,
                            label: siteList?.find(item => item.id === registerForm.siteId)?.nm
                        }}
                    />
                </InputWrapper>
            </FieldRow>

            <FieldRow>
                <FieldDiv
                    $height={"45px"}
                    $width={"125px"}
                    $padding={"0 0 0 25px"}
                >
                    분류명
                </FieldDiv>
                <InputWrapper>
                    <Select
                        options={cateOptionList}
                        styles={selectStyleConfig}
                        menuPortalTarget={menuPortalTarget ?? undefined}
                        menuPosition="absolute"    // <-- fixed 대신 absolute
                        menuShouldBlockScroll={true}
                        onChange={(e: ILabelValue) => histStoreActions.setRegisterForm({
                            ...registerForm,
                            cateId: e.value as string,
                            cateNm: e.label
                        })}
                        value={{
                            value: registerForm.cateId,
                            label: categoryList?.find(item => item.id === registerForm.cateId)?.nm
                        }}
                    />
                </InputWrapper>
            </FieldRow>
            <FieldRow>
                <FieldDiv
                    $height={"45px"}
                    $width={"125px"}
                    $padding={"0 0 0 25px"}
                >
                    작업 기간
                </FieldDiv>
                <InputWrapper>
                    <HistRegDateInputArea/>
                </InputWrapper>
            </FieldRow>

        </NameWrapper>
    )
}

export default HistRegForm

const selectStyleConfig = {
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-expect-error
    // control: (baseStyles, state) => ({
    //     ...baseStyles,
    //     border: "2px solid",
    //     borderColor: state.isFocused ? 'grey' : '#769FCD',
    // }),
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-expect-error
    // container: (baseStyles) => ({
    //     ...baseStyles,
    //     marginLeft: "10px",
    //     width: "410px",
    // }),

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
    control: (base, state) => ({
        ...base,
        border: "2px solid",
        borderColor: state.isFocused ? "grey" : "#769FCD",
        boxShadow: "none",
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
    container: (base) => ({
        ...base,
        marginLeft: "10px",
        width: "410px",
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
    menuPortal: (base) => ({
        ...base,
        zIndex: 9999, // 모달 위로 보이게
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
    menu: (base) => ({
        ...base,
        zIndex: 9999,
        transition: "none", // react-select 메뉴 자체 애니메이션 제거
    }),
}

const NameWrapper = styled.form`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    height: 540px;
    padding: 20px 0;
`

const FieldRow = styled.div`
    display: flex;
    align-content: flex-start;
    height: 45px;
    margin-bottom: 15px;
`

const FieldName = styled(NameLabel)`
    color: #6c757d;
`
const FieldDiv = styled(NameDiv)`
    color: #6c757d;
`

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
`

const ContentInput = styled(NameInput)`
    height: 40px;
`

const TypingCntArea = styled.div<{ $isOver: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 90px;
    color: #6c757d;
    margin-right: 5px;

    span {
        color: ${(props) => props.$isOver ? "#FBA4A0" : "#6c757d"};
    }
`
