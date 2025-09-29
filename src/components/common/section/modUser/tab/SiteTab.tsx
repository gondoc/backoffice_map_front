import styled from "styled-components";
import {IModLabelValue, MOD_USER_STEP_LABEL} from "@config/constant";
import {TModUserTab} from "@type/user.types";

interface IProps {
    currentStep: TModUserTab
    setStep: (step: TModUserTab) => void;
}

const SiteTab = ({currentStep, setStep}: IProps) => {

    return (
        <StSiteTabWrapper>
            <StSiteTabUl>
                {
                    MOD_USER_STEP_LABEL.map((item: IModLabelValue) => (
                        <StSiteTabLi
                            key={`ST_SITE_TAB_LI_${item.label}`}
                            $isActive={item.value === currentStep}
                            onClick={() => setStep(item.value)}
                        >
                            {item.label}
                        </StSiteTabLi>
                    ))
                }
            </StSiteTabUl>
        </StSiteTabWrapper>
    )
}

export default SiteTab

const StSiteTabWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 166px;
    height: 842px;
    margin-top: 333px;
    z-index: 5;
`

const StSiteTabUl = styled.ul`
    display: flex;
    flex-direction: column;
    width: 166px;
    height: 933px;
`

const StSiteTabLi = styled.li<{ $isActive: boolean }>`
    width: 166px;
    height: 20px;
    margin-bottom: 10px;
    border: 2px solid #769FCD;
    border-radius: 5px;
    padding: 10px 0 10px 10px;

    transition: all 250ms ease-out;;
    
    background-color: ${({$isActive}) => $isActive && '#769FCD'};
    color: ${({$isActive}) => $isActive && '#FFFFFF'};

    &:hover {
        color: ${(props) => props.$isActive ? "#FFFFFF" : "#769FCD"};
        cursor: pointer;
    }
`
