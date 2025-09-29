import {MapContainer, Pane, TileLayer} from 'react-leaflet';
import * as L from 'leaflet';
import {LatLng} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "proj4leaflet";
import "proj4"
import RegisterIconLayer from "@component/common/section/loca/mng/map/RegisterIconLayer";

// EPSG:5181 정의
export const EPSG5181 = new L.Proj.CRS(
    'EPSG:5181',
    '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
    {
        resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
        origin: [-30000, -60000],
        bounds: L.bounds([-30000 - Math.pow(2, 19) * 4, -60000], [-30000 + Math.pow(2, 19) * 5, -60000 + Math.pow(2, 19) * 5])
    }
) as L.CRS

const MapArea = () => {

    return (
        <MapContainer
            id="map"
            style={{width: '100%', height: '100%'}}
            center={new LatLng(36.408039, 127.5014007)}
            zoom={2}
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

            <Pane name={"register-icon-layer"}>
                {/*끌어서 좌표 등록 아이콘 레이어*/}
                <RegisterIconLayer/>
            </Pane>

        </MapContainer>
    )
}

export default MapArea
