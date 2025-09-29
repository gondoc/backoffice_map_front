import AddInputLabelArea from "@component/common/section/loca/mng/AddInputLabelArea";
import React from "react";
import no_image from "@image/delete_11919138.png";
import {
    AddInput,
    Content,
    Form,
    PreviewFileName,
    PreviewFileNameDelBtnArea,
    PreviewImage,
    PreviewImageInfo
} from "@component/common/section/loca/mng/LocaMngForm";
import {useLocationStore} from "@store/locationStore";
import Url from "@config/url";

const LocaActiveForm = () => {

    const activeLocation = useLocationStore((state) => state.activeLocation);

    return (
        <Form $height={"720px"}>
            <Content>
                <AddInputLabelArea
                    key={"ADD_INPUT_LABEL_AREA_LOCATION_NAME"}
                    label={"위치명"}
                    isRequired={true}
                    children={
                        <AddInput
                            readOnly={true}
                            id={"위치명"}
                            required={true}
                            minLength={3}
                            maxLength={10}
                            type={"text"}
                            value={activeLocation?.isShow && activeLocation?.name ? activeLocation?.name : ""}
                        />
                    }
                />
                <AddInputLabelArea
                    key={"ADD_INPUT_LABEL_AREA_LOCATION_X"}
                    label={"좌표(x)"}
                    isRequired={true}
                    children={
                        <AddInput
                            readOnly={true}
                            id={"좌표(x)"}
                            required={true}
                            minLength={9}
                            maxLength={20}
                            type={"text"}
                            value={activeLocation?.isShow && activeLocation?.x ? activeLocation?.x : ""}
                        />
                    }
                />
                <AddInputLabelArea
                    key={"ADD_INPUT_LABEL_AREA_LOCATION_Y"}
                    label={"좌표(y)"}
                    isRequired={true}
                    children={
                        <AddInput
                            readOnly={true}
                            id={"좌표(y)"}
                            required={true}
                            minLength={9}
                            maxLength={20}
                            type={"text"}
                            value={activeLocation?.isShow && activeLocation?.y ? activeLocation?.y : ""}
                        />
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
                                    $isUploadStatus={activeLocation?.fileName !== undefined}
                                >{activeLocation?.fileName ? activeLocation?.fileName : "업로드된 이미지가 없습니다."}
                                </PreviewFileName>
                            </PreviewFileNameDelBtnArea>
                        </PreviewImageInfo>
                    }
                />
                <PreviewImage>
                    <img src={(activeLocation?.id && activeLocation?.fileName) ? Url.IMAGE(activeLocation?.id, activeLocation.fileName) : no_image}
                         alt={activeLocation?.fileName}/>
                </PreviewImage>
            </Content>
        </Form>
    )
}

export default LocaActiveForm