import {useCategoryStore, useCategoryStoreActions} from "@store/categoryStore";
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
    DialogRootArea,
} from "@component/common/dialog/DialogArea";
import styled from "styled-components";
import {useCategoryQuery, useCategoryRegMutation} from "@query/CategoryQuery";
import {ICategory} from "@type/categories.types";
import {useViewStoreActions} from "@store/viewStore";
import {validateCategoryRegForm, validationXSS} from "@utils/commons";
import useDialogMount from "@hook/useDialogMount";

const CategoryRegArea = () => {

    const registerForm = useCategoryStore((state) => state.registerForm)
    const categoryStoreActions = useCategoryStoreActions();
    const viewStoreActions = useViewStoreActions();
    const {refetch} = useCategoryQuery();

    const {mounted, rendered} = useDialogMount(registerForm.isShow, 450);

    const {mutate: register} = useCategoryRegMutation(
        (data: ICategory) => successHandler(data),
        (errorCd: string, msg?: string) => failHandler(errorCd, msg)
    );

    const registerBtnClickHandler = () => {
        if (validationXSS(registerForm.nm) || validationXSS(registerForm.content)) {
            viewStoreActions.setToastStatus({status: "failed", msg: `입력된 값 중 특수문자가 포함되어 있습니다.`})
            return;
        }
        register(registerForm);
    }

    const successHandler = (res: ICategory) => {
        if (res) {
            viewStoreActions.setToastStatus({status: "success", msg: `입력하신 분류가 성공적으로 등록되었습니다.`})
            categoryStoreActions.initRegisterForm();
            refetch();
        }
    }

    const failHandler = (res?: string | number, msg?: string | undefined | unknown) => {
        viewStoreActions.setToastStatus({
            status: "failed",
            msg: `(${res}) ${msg ? msg : '등록 요청에 실패하였습니다.'}`
        })
    }

    return (
        <DialogRootArea $mounted={mounted} $isOpen={registerForm.isShow}>
            <DialogDimmed $isOpen={rendered}/>
            <DialogModalArea $isOpen={rendered}>
                <DialogModalContentArea
                    $status={true}
                    $width={"820px"}
                >
                    <DialogModalContentHead
                        $status={true}
                    >
                        <DialogModalContentHeadTitle $status={true}>
                            <h3>분류 <span>등록</span></h3>
                        </DialogModalContentHeadTitle>
                        <DialogModalContentHeadCloseBtn
                            onClick={() => categoryStoreActions.setRegisterForm({...registerForm, isShow: false})}
                        />
                    </DialogModalContentHead>

                    <NameArea>
                        <NameLabel htmlFor={`CATEGORY_REG_NAME`}>분류명
                            <NameInput
                                id={`CATEGORY_REG_NAME`}
                                value={registerForm.nm}
                                onChange={(e) =>
                                    categoryStoreActions.setRegisterForm({...registerForm, nm: e.target.value})
                                }
                            />
                        </NameLabel>
                    </NameArea>

                    <CategoryContentTextarea
                        name={"CATEGORY_CONTENT"}
                        value={registerForm.content}
                        onChange={(e) =>
                            categoryStoreActions.setRegisterForm({...registerForm, content: e.target.value})
                        }
                    />

                    <DialogModalContentFooter>
                        <DialogLeftBtn
                            $status={"mod"}
                            onClick={() => categoryStoreActions.setRegisterForm({...registerForm, isShow: false})}
                        >취소</DialogLeftBtn>
                        <DialogRightBtn
                            disabled={!validateCategoryRegForm(registerForm)}
                            $status={"mod"}
                            onClick={() => registerBtnClickHandler()}
                        >등록</DialogRightBtn>
                    </DialogModalContentFooter>

                </DialogModalContentArea>
            </DialogModalArea>
        </DialogRootArea>
    )
}

export default CategoryRegArea


export const NameArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    flex-direction: column;
    width: 820px;
    height: 50px;
`

export const NameLabel = styled.label<{ $height?: string, $width?: string, $padding?: string }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #6c757d;

    height: ${(props) => props?.$height ? props.$height : "50px"};
    width: ${(props) => props?.$width ? props.$width : "fit-content"};
    padding: ${(props) => props?.$padding ?? props.$padding};
`

export const NameDiv = styled.div<{ $height?: string, $width?: string, $padding?: string }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #6c757d;

    height: ${(props) => props?.$height ? props.$height : "50px"};
    width: ${(props) => props?.$width ? props.$width : "fit-content"};
    padding: ${(props) => props?.$padding ?? props.$padding};
`

export const NameInput = styled.input<{ $width?: string }>`
    display: inline-block;
    margin-left: 10px;
    padding-left: 10px;
    border: 2px solid #769FCD;
    border-radius: 3px;
    font-size: 16px;
    height: 35px;

    width: ${(props) => props?.$width ? props?.$width : "375px"};
`

const CategoryContentTextarea = styled.textarea`
    resize: none;
    margin: 10px 24px;
    border: 2px solid #769FCD;
    height: 163px;
    border-radius: 3px;
    font-size: 16px;
    padding: 10px;
`
