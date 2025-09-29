import {ILabelValueStatus} from "@type/common.types";
import useViewStore from "@store/viewStore";
import LocaListSection from "@component/common/section/loca/list/LocaListSection";
import LocaMngSection from "@component/common/section/loca/mng/LocaMngSection";
import {SectionContent} from "@component/common/section/Section";

const LocationSection = () => {

    const currentNav: ILabelValueStatus = useViewStore(state => state.currentNav)

    return (
        <SectionContent>
            {currentNav.status === "none" && <LocaListSection/>}
            {(currentNav.status === "add" || currentNav.status === "mod") && <LocaMngSection/>}
        </SectionContent>
    )
}

export default LocationSection