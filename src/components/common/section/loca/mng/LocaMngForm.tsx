import styled from "styled-components";
import AddInputLabelArea from "@component/common/section/loca/mng/AddInputLabelArea";
import React, {HTMLInputTypeAttribute, useEffect, useRef, useState} from "react";
import {useLocationStore, useLocationStoreActions} from "@store/locationStore";
import LocationButton from "@component/common/section/loca/mng/LocationButton";
import {useLocationModMutation, useLocationRegMutation} from "@query/LocationQuery";
import {ILocation, IRegisterForm} from "@type/location.types";
import useViewStore, {useViewStoreActions} from "@store/viewStore";

import no_image from "@image/delete_11919138.png";
import close_btn from "@image/close_btn.svg";
import Url from "@config/url";
import {makePayload, validationXSS} from "@utils/commons";

const LocaMngForm = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const currentNav = useViewStore((state) => state.currentNav)
    const registerForm = useLocationStore((state) => state.registerForm)
    const activeLocation = useLocationStore((state) => state.activeLocation)
    const coordinateIcon = useLocationStore((state) => state.coordinateIcon)

    const viewStoreActions = useViewStoreActions();
    const locationStoreActions = useLocationStoreActions();

    const [previewImg, setPreviewImg] = useState<{ imgSrc: string, fileName: string }>({
        imgSrc: currentNav.status === "add" ? no_image : (registerForm?.id && registerForm?.fileName) ? Url.IMAGE(registerForm?.id, registerForm.fileName) : no_image,
        fileName: (currentNav.status === "add" || registerForm?.fileName === undefined) ? "업로드된 이미지가 없습니다." : registerForm?.fileName,
    })

    useEffect(() => {
        setPreviewImg({
            imgSrc: registerForm?.file ? URL.createObjectURL(registerForm.file) : no_image,
            fileName: registerForm?.file ? registerForm.file.name : "업로드된 이미지가 없습니다."
        })
    }, [registerForm.file])

    const {mutate: register} = useLocationRegMutation(
        (data: ILocation) => successHandler(data),
        (errorCd: string, msg?: string) => failHandler(errorCd, msg)
    )

    const {mutate: modify} = useLocationModMutation(
        (data: ILocation) => successHandler(data),
        (errorCd?: string | number, msg?: string | undefined | unknown) => failHandler(errorCd, msg)
    )

    const successHandler = async (res: ILocation) => {
        if (res) {
            viewStoreActions.setToastStatus({status: "success", msg: `지역이 성공적으로 ${currentNav.status === "add" ? "저장" : "수정"}되었습니다.`})
            viewStoreActions.setCurrentNav({
                ...currentNav,
                status: "none"
            })
            locationStoreActions.setActiveLocation(await makePayload(res));
        }
    }

    const failHandler = (res?: string | number, msg?: string | undefined | unknown) => {
        viewStoreActions.setToastStatus({
            status: "failed",
            msg: `(${res ?? 405}) ${msg ? msg : currentNav.status === "add" ? "저장" : "수정"} 요청에 실패하였습니다.`
        })
    }

    const submitRegisterForm = () => {
        if (validationXSS(registerForm.name)) {
            viewStoreActions.setToastStatus({status: "failed", msg: `입력된 값 중 특수문자가 포함되어 있습니다.`})
            return;
        }

        if (currentNav.status === "add") {
            register(makeFormData(registerForm));
        } else {
            modify(makeFormData(registerForm));
        }
    }

    const makeFormData = (form: IRegisterForm) => {
        const formData: FormData = new FormData();
        if (currentNav.status === "mod" && activeLocation?.id) {
            formData.append("siteId", activeLocation?.id)
        }
        if (form?.file) {
            formData.append("logoFile", form.file);
        }
        formData.append("siteNm", form.name);
        formData.append("siteLat", form.y);
        formData.append("siteLng", form.x);

        return formData;
    }

    const isNum = (value: unknown): boolean => {
        return !isNaN(value as number);
    }

    const validForm = (): boolean => {
        const regiX = registerForm.x.trim();
        const regiY = registerForm.y.trim();
        const regiNm = registerForm.name.trim();

        const isRegiValidX: boolean = regiX.length > 0 && isNum(regiX);
        const isRegiValidY: boolean = regiY.length > 0 && isNum(regiY);
        const isRegiNmValid: boolean = regiNm?.length > 2;

        return !(isRegiValidX && isRegiValidY && isRegiNmValid);
    }

    return (
        <Form>
            <Content>
                <AddInputLabelArea
                    key={"ADD_INPUT_LABEL_AREA_LOCATION_NAME"}
                    label={"위치명"}
                    isRequired={true}
                    children={
                        <AddInput
                            id={"위치명"}
                            required={true}
                            minLength={3}
                            maxLength={10}
                            type={"text"}
                            value={registerForm.name}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => locationStoreActions.setRegisterForm({
                                ...registerForm,
                                name: event.currentTarget.value
                            })}
                        />
                    }
                />
                <LocationButton
                    type={"button"}
                    btnLabel={"끌어서 좌표 등록"}
                    onClick={() => locationStoreActions.setCoordinateIcon({
                        ...coordinateIcon,
                        isActive: !coordinateIcon.isActive
                    })}
                />
                <AddInputLabelArea
                    key={"ADD_INPUT_LABEL_AREA_LOCATION_X"}
                    label={"좌표(x)"}
                    isRequired={true}
                    children={
                        <AddInput
                            id={"좌표(x)"}
                            required={true}
                            minLength={9}
                            maxLength={20}
                            pattern="[0-9.]+"
                            type={"text"}
                            value={registerForm.x}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                const value = event.currentTarget.value
                                if (!isNum(value)) return
                                locationStoreActions.setRegisterForm({
                                    ...registerForm,
                                    x: value
                                })
                                locationStoreActions.setCoordinateIcon({
                                    ...coordinateIcon,
                                    x: value
                                })
                            }}
                        />
                    }
                />
                <AddInputLabelArea
                    key={"ADD_INPUT_LABEL_AREA_LOCATION_Y"}
                    label={"좌표(y)"}
                    isRequired={true}
                    children={
                        <AddInput
                            id={"좌표(y)"}
                            required={true}
                            minLength={9}
                            maxLength={20}
                            pattern="[0-9.]+"
                            type={"text"}
                            value={registerForm.y}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                const value = event.currentTarget.value
                                if (!isNum(value)) return
                                locationStoreActions.setRegisterForm({
                                    ...registerForm,
                                    y: value
                                })
                                locationStoreActions.setCoordinateIcon({
                                    ...coordinateIcon,
                                    y: value
                                })
                            }}
                        />
                    }
                />
                <AddInputLabelArea
                    key={"ADD_INPUT_LABEL_AREA_LOCATION_FILE"}
                    label={"이미지"}
                    isRequired={false}
                    children={
                        <>
                            <ImageUploadLabel
                                htmlFor={"IMAGE_UPLOAD_LABEL"}
                            >이미지 업로드
                            </ImageUploadLabel>
                            <AddInput
                                ref={fileInputRef}
                                id={"IMAGE_UPLOAD_LABEL"}
                                required={false}
                                minLength={3}
                                maxLength={50}
                                type={"file"}
                                $type={"file"}
                                accept={"image/*"}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                    const target = event.target as HTMLInputElement;
                                    const file = target.files?.[0];
                                    const fileSize = file?.size;
                                    if (fileSize && fileSize < 5 * 1024 * 1024) {
                                        locationStoreActions.setRegisterForm({
                                            ...registerForm,
                                            file: file ? file : undefined,
                                            fileName: file ? file.name : undefined,
                                        });
                                    } else {
                                        alert("파일이 허용되지 않거나 최대 용량을 초과 하였습니다.\n파일 사이즈는 5MB 이하만 가능합니다.");
                                    }
                                }}
                            />
                        </>
                    }
                />

                <AddInputLabelArea
                    key={"ADD_INPUT_LABEL_AREA_LOCATION_FILE_PREVIEW"}
                    label={"미리보기"}
                    isRequired={false}
                    children={
                        <PreviewImageInfo>
                            <PreviewFileNameDelBtnArea>
                                <PreviewFileName
                                    key={`PREVIEW_FILE_NAME_${previewImg?.imgSrc}`}
                                    $isUploadStatus={registerForm?.fileName !== undefined}>
                                    {/*{registerForm?.fileName ? registerForm?.fileName : "업로드된 이미지가 없습니다."}*/}
                                    {previewImg.fileName}
                                </PreviewFileName>
                                <PreviewDelBtn
                                    type={"button"}
                                    disabled={!registerForm?.fileName}
                                    $isDisabled={!registerForm?.fileName}
                                    onClick={() => {
                                        locationStoreActions.setRegisterForm({...registerForm, file: undefined, fileName: undefined})
                                        if (fileInputRef?.current) {
                                            fileInputRef.current.value = "";
                                        }
                                    }}
                                />
                            </PreviewFileNameDelBtnArea>
                        </PreviewImageInfo>
                    }
                />
                <PreviewImage>
                    <img key={`PREVIEW_IMAGE_${previewImg?.imgSrc}`}
                         src={previewImg.imgSrc}
                         alt={registerForm?.fileName}
                         onError={() => setPreviewImg({
                             imgSrc: no_image,
                             fileName: "업로드된 이미지가 없습니다."
                         })}
                    />
                </PreviewImage>
            </Content>
            <SubmitBtn
                disabled={validForm()}
                $isDisabled={validForm()}
                type={"button"}
                onClick={() => submitRegisterForm()}
            >{currentNav.status === "add" ? "등록" : "수정"}</SubmitBtn>
        </Form>
    )
}

export default LocaMngForm

export const Form = styled.form<{$height?: string}>`
    width: 482px;
    padding: 0 23px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: ${(props) => props?.$height ? props?.$height : "827px"};
`

export const Content = styled.div``

export const AddInput = styled.input<{ $type?: HTMLInputTypeAttribute }>`
    width: 380px;
    height: 40px;
    padding: 0 10px;
    display: ${(props) => props.$type === "file" && "none"};

    &:invalid {
        border: 2px solid #F88985;
        border-radius: 5px;
    }
`

export const ImageUploadLabel = styled.label`
    display: flex;
    width: 400px;
    height: 44px;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: larger;
    border: 0;
    //margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #769FCD;

    &:hover {
        background-color: #93B7E4;
    }

    &:active {
        background-color: #517EBC;
    }
`

export const PreviewImageInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 482px;
    height: auto;
`

export const PreviewFileNameDelBtnArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 382px;
    height: auto;
`

export const PreviewFileName = styled.div<{ $isUploadStatus: boolean }>`
    width: 340px;
    height: 40px;
    display: block;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${(props) => props.$isUploadStatus ? "#000000" : "#6c757d"}
`


export const PreviewDelBtn = styled.button<{ $isDisabled: boolean }>`
    width: 33px;
    height: 33px;
    border-radius: 5px;
    background-color: #F7FBFC;

    background-image: url(${close_btn});
    cursor: ${(props) => props.$isDisabled ? "not-allowed" : "pointer"};
    border: 3px solid ${(props) => props.$isDisabled ? "#C4C4C4" : "#769FCD"};

    &:disabled {
        border-color: ${(props) => props.$isDisabled ? "#C4C4C4" : "#769FCD"};
    }

    &:hover {
        border-color: ${(props) => props.$isDisabled ? "#C4C4C4" : "#93B7E4"};
    }

    &:active {
        border-color: ${(props) => props.$isDisabled ? "#C4C4C4" : "#517EBC"};
    }
`

export const PreviewImage = styled.div`
    display: flex;
    width: 438px;
    height: 150px;
    padding: 0 23px;
    justify-content: center;

    img {
        max-width: 100%;
        max-height: 100%;
    }
`

export const SubmitBtn = styled.button<{ $isDisabled?: boolean }>`
    display: flex;
    width: 472px;
    height: 65px;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: larger;
    border: 0;
    margin-left: 10px;
    border-radius: 5px;

    cursor: ${(props) => props.$isDisabled ? "not-allowed" : "pointer"};
    background-color: ${(props) => props.$isDisabled ? "#C4C4C4" : "#769FCD"};

    &:disabled {
        background-color: ${(props) => props.$isDisabled ? "#C4C4C4" : "#769FCD"};
    }

    &:hover {
        background-color: ${(props) => props.$isDisabled ? "#C4C4C4" : "#93B7E4"};
    }

    &:active {
        background-color: ${(props) => props.$isDisabled ? "#C4C4C4" : "#517EBC"};
    }
`
