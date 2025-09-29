import styled from "styled-components";
import TopArea from "@component/common/topbar/TopArea";
import {ILabelValueStatus} from "@type/common.types";
import useViewStore, {useViewStoreActions} from "@store/viewStore";
import {useNavigate} from "react-router-dom";

const TopBar = () => {

    const navigate = useNavigate();
    const currentNav: ILabelValueStatus = useViewStore(state => state.currentNav)
    const viewStoreActions = useViewStoreActions();

    return (
        <TopBarWrapper>
            <Home onClick={() => {
                viewStoreActions.setCurrentNav({
                    ...currentNav, value: 0, label: "요약"
                })
                navigate("/");
            }}>backOffice</Home>
            <TopArea/>
        </TopBarWrapper>
    )
}

export default TopBar

const TopBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    top: 0;
    width: 100%;
    font-weight: 500;
    font-size: large;
    z-index: 1;
    color: #6c757d;
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
`

const Home = styled.h2`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 70px;
    cursor: pointer;
`

