import {useMap} from "react-leaflet";
import React from "react";

const ResizeMap: React.FC = () => {
    const map = useMap();
    map.invalidateSize();
    return null;
}

export default ResizeMap