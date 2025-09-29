import {Marker, useMap} from "react-leaflet";
import {useLocationStore} from "@store/locationStore";
import React, {useEffect, useMemo} from "react";
import * as L from "leaflet";
import {LatLng} from "leaflet";
import {renderToString} from "react-dom/server";
import {RegisterIconImage} from "@component/common/section/loca/mng/map/RegisterIconLayer";

const LocaPreviewMap = () => {

    const map = useMap();

    const activeLocation = useLocationStore((state) => state.activeLocation);

    useEffect(() => {
        // setCenter(activeLocation ? new LatLng(Number(activeLocation.y), Number(activeLocation.x)) : null)
        if (activeLocation) {
            map.setView(
                new LatLng(Number(activeLocation.y), Number(activeLocation.x)),
                map.getZoom(),
                {
                    animate: true,
                    duration: 0.3,
                    easeLinearity: 300
                }
            )
        }
    }, [activeLocation])

    const markerIcon = useMemo(() => {
        return L.divIcon({
            iconSize: [50, 50],
            iconAnchor: [25, 60],
            html: renderToString(<RegisterIconImage/>),
        });
    }, []);

    return (
        activeLocation &&
        <Marker
            position={new LatLng(Number(activeLocation.y), Number(activeLocation.x))}
            icon={markerIcon}
            draggable={true}
            interactive={true}
        />
    )
}

export default LocaPreviewMap