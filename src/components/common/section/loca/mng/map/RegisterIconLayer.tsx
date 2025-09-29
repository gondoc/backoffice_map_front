import location_register_50x50 from "@image/location_register_50x50.png"

import {useLocationStore, useLocationStoreActions} from "@store/locationStore";
import {Marker, useMap} from "react-leaflet";
import React, {useEffect, useMemo, useState} from "react";
import * as L from "leaflet";
import {LatLng, LatLngExpression} from "leaflet";
import useMapStore from "@store/mapStore";
import styled from "styled-components";
import {renderToString} from "react-dom/server";
import useViewStore from "@store/viewStore";

const RegisterIconLayer = () => {

    const map = useMap();

    const currentNav = useViewStore((state) => state.currentNav)
    const mapCenter = useMapStore((state) => state.mapCenter)
    const coordinateIcon = useLocationStore((state) => state.coordinateIcon)
    const registerForm = useLocationStore((state) => state.registerForm)

    const locationStoreActions = useLocationStoreActions();

    const [isShow, setShow] = useState<boolean>(currentNav.status !== "add")
    const [position, setPosition] = useState<LatLngExpression>(
        currentNav.status === "add" ? mapCenter.center : new LatLng(Number(coordinateIcon.y), Number(coordinateIcon.x))
    )

    useEffect(() => {
        if (currentNav.status === "add") {
            setShow(coordinateIcon.isActive);
        } else {
            setShow(coordinateIcon.isActive)
            setPosition(new LatLng(Number(coordinateIcon.y), Number(coordinateIcon.x)));
        }
    }, [currentNav.status, coordinateIcon])

    const markerIcon = useMemo(() => {
        return L.divIcon({
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            html: renderToString(<RegisterIconImage/>),
        });
    }, []);

    return (
        <>
            {
                isShow &&
                <Marker
                    position={position}
                    icon={markerIcon}
                    draggable={true}
                    interactive={true}
                    eventHandlers={{
                        dragend: (e) => {
                            const latlng = e.target.getLatLng()
                            map.setView(latlng)
                            setPosition(latlng);
                            locationStoreActions.setCoordinateIcon({
                                ...coordinateIcon,
                                x: latlng.lng.toString(),
                                y: latlng.lat.toString()
                            })

                            locationStoreActions.setRegisterForm({
                                ...registerForm,
                                x: latlng.lng.toString(),
                                y: latlng.lat.toString()
                            })
                        }
                    }}
                />
            }
        </>
    )
}

export default RegisterIconLayer

export const RegisterIconImage = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${location_register_50x50});
`
