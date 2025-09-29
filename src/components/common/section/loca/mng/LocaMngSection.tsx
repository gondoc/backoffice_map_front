import styled from "styled-components";
import MapArea from "@component/common/section/loca/mng/map/MapArea";
import LocaMngForm from "@component/common/section/loca/mng/LocaMngForm";

const LocaMngSection = () => {

    return (
        <LocaMngSectionArea>
            <MapWrapper>
                <MapArea/>
            </MapWrapper>
            <LocaMngForm/>
        </LocaMngSectionArea>
    )
}

export default LocaMngSection

const LocaMngSectionArea = styled.div`
    display: flex;
    flex-direction: row;
`

const MapWrapper = styled.div`
    width: 1066px;
    height: 827px;
`
