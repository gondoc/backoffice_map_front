import styled from "styled-components";
import {useLocationStore} from "@store/locationStore";
import {EPSG5181} from "@component/common/section/loca/mng/map/MapArea";
import * as L from "leaflet";
import {LatLng, LatLngExpression} from "leaflet";
import {MapContainer, TileLayer} from "react-leaflet";
import React, {useEffect, useState} from "react";
import LocaPreviewMap from "@component/common/section/loca/list/map/LocaPreviewMap";
import Url from "@config/url";
import no_image from "@image/delete_11919138.png";
import icon_narrow_down from "@image/icon_narrow_down.svg";
import icon_narrow_up from "@image/icon_narrow_up.svg";
import {PreviewImage} from "@component/common/section/loca/mng/LocaMngForm";

const LocaPreview = () => {

    const activeLocation = useLocationStore((state) => state.activeLocation);
    const [center, setCenter] = useState<LatLngExpression | null>(null);
    const [isShow, setShow] = useState<boolean>(!!activeLocation);


    useEffect(() => {
        setCenter(activeLocation ? new LatLng(Number(activeLocation.y), Number(activeLocation.x)) : null)
    }, [activeLocation])

    return (
        <PreviewWrapper>
            <>
                {
                    center &&
                    <MapContainer
                        id="map"
                        style={{width: '100%', height: '100%', borderRadius: '8px'}}
                        center={new LatLng(Number(activeLocation?.y), Number(activeLocation?.x))}
                        zoom={4}
                        crs={EPSG5181}
                        attributionControl={false}
                        preferCanvas={true}
                        renderer={L.canvas()}
                        zoomControl={false}
                    >
                        <TileLayer
                            url='http://map{s}.daumcdn.net/map_2d/2209kdm/L{z}/{y}/{x}.png'
                            minZoom={0}
                            subdomains='0123'
                            zoomReverse={true}
                            zoomOffset={1}
                            maxZoom={13}
                            tms={true}
                        />

                        <LocaPreviewMap/>

                    </MapContainer>
                }
            </>

            <ImageAreaWrapper>
                <ImageArea>
                    <LocationShowBtn
                        $isShow={isShow}
                        onClick={() => setShow(!isShow)}
                    >지역 이미지 {isShow ? "닫기" : "보기"}</LocationShowBtn>
                    <LocationImageArea $height={"164px"} $isShow={isShow}>
                        <img
                            src={(activeLocation?.id && activeLocation?.fileName) ? Url.IMAGE(activeLocation?.id, activeLocation.fileName) : no_image}
                            alt={activeLocation?.fileName}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = no_image;
                            }}
                        />
                    </LocationImageArea>
                </ImageArea>
            </ImageAreaWrapper>

            {/*<AddInputLabelArea*/}
            {/*    key={"ADD_INPUT_LABEL_AREA_LOCATION_FILE_PREVIEW"}*/}
            {/*    label={"미리보기"}*/}
            {/*    isRequired={false}*/}
            {/*    children={*/}
            {/*        <PreviewImageInfo>*/}
            {/*            <PreviewFileNameDelBtnArea>*/}
            {/*                <PreviewFileName*/}
            {/*                    $isUploadStatus={activeLocation?.fileName !== undefined}*/}
            {/*                >{activeLocation?.fileName ? activeLocation?.fileName : "업로드된 이미지가 없습니다."}*/}
            {/*                </PreviewFileName>*/}
            {/*            </PreviewFileNameDelBtnArea>*/}
            {/*        </PreviewImageInfo>*/}
            {/*    }*/}
            {/*/>*/}
        </PreviewWrapper>
    )
}

export default LocaPreview

const PreviewWrapper = styled.div`
    display: flex;
    //flex-direction: column;
    width: 563px;
    height: 720px;
    margin: 0 23px;
    color: #6c757d;
    border-radius: 10px;
    border: 3px solid #769FCD;
`

const LocationShowBtn = styled.button<{ $isShow: boolean }>`
    width: 145px;
    height: 30px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 25px;
    border-radius: 15px 15px 0 0;
    background-color: #F7FBFC;
    background-size: 30px;
    background-repeat: no-repeat;
    background-image: url(${({$isShow}) => $isShow ? icon_narrow_down : icon_narrow_up}) ;
`

const ImageArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
`

const ImageAreaWrapper = styled.div`
    position: absolute;

    bottom: 66px;
    width: 563px;
`

const LocationImageArea = styled(PreviewImage)<{ $isShow?: boolean, $height?: string }>`
    bottom: 66px;
    width: 563px;
    border-radius: 15px 0 9px 9px;
    height: ${(props) => props.$isShow ? props?.$height ? props?.$height : "198px" : 0};
    transition: all 450ms;
    padding: ${(props) => props.$isShow ? "23px 0 " : 0};
    background-color: #F7FBFC;
    background-repeat: no-repeat;

    img {
        transition: all 450ms;
        visibility: ${({$isShow}) => $isShow ? 'visible' : 'hidden'};
        opacity: ${(props) => props.$isShow ? 1 : 0};
        max-height: ${(props) => props?.$height ? props?.$height : "164px"};
        background-repeat: no-repeat;
    }
`
//min-height: ${(props) => props?.$height ? props?.$height : "164px"};

// max-height: ${(props) => props.$isShow ? props?.$height ? props?.$height : "164px" : 0};

