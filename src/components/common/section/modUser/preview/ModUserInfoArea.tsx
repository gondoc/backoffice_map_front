import React, {useEffect, useState} from "react";
import {useCurrentRecoveryMailQuery, useCurrentUserQuery} from "@query/MemberQuery";
import {TModUserTab} from "@type/user.types";
import styled from "styled-components";
import {MOD_USER_STEP_LABEL} from "@config/constant";
import UserPreview from "@component/common/section/modUser/preview/UserPreview";
import SiteTab from "@component/common/section/modUser/tab/SiteTab";
import ModUserNick from "@component/common/section/modUser/nickname/ModUserNick";
import ModUserPassword from "@component/common/section/modUser/password/ModUserPassword";
import ModUserRcvryEmail from "@component/common/section/modUser/recoveryEmail/ModUserRcvryEmail";

const ModUserInfoArea = () => {

    const {data: userInfo} = useCurrentUserQuery();
    const {data: recoveryMail, refetch} = useCurrentRecoveryMailQuery();

    const [currentTab, setCurrentTab] = useState<TModUserTab>("default");

    useEffect(() => {
        if (userInfo?.isVerifyRcvryEmail) refetch()
    }, [userInfo?.isVerifyRcvryEmail])

    return (
        <StModUserInfoWrapper>

            <SiteTab
                currentStep={currentTab}
                setStep={setCurrentTab}
            />

            <StModUserInfoArea>
                <StStepTitle>{MOD_USER_STEP_LABEL.find(it => it.value === currentTab)?.label}</StStepTitle>

                {currentTab === "default" &&
                    <UserPreview setStep={setCurrentTab}/>}

                {currentTab === "nickname" &&
                    <ModUserNick userNick={userInfo?.nick ?? ""} userEmail={userInfo?.email ?? ""} setStep={setCurrentTab}/>}

                {currentTab === "recoveryEmail" &&
                    <ModUserRcvryEmail setStep={setCurrentTab} recoveryMail={recoveryMail ? recoveryMail : ""}/>}

                {currentTab === "password" &&
                    <ModUserPassword userEmail={userInfo?.email ?? ""} setStep={setCurrentTab}/>}


            </StModUserInfoArea>
        </StModUserInfoWrapper>
    )
}

export default ModUserInfoArea

const StModUserInfoWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
`

const StStepTitle = styled.h3`
    height: 23px;
    margin: 18px 0;
`

const StModUserInfoArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 1700px;
    height: 827px;
    gap: 15px;
    padding: 53px 0;
    margin-left: -166px;
`

export const StModUserRowWrapper = styled.div<{ $isMod?: boolean, $cursor?: string }>`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    width: 568px;
    gap: 15px;
    height: min-content;
    border: 2px solid #769FCD;
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
    padding: 10px 15px;
    background-color: ${({$isMod}) => $isMod ? "#C4C4C4" : "#FFFFFF"};

    ${({$cursor}) => {
        return $cursor ? `cursor: ${$cursor}` : "";
    }};
`

export const StModBtn = styled.button<{ $ml?: string, $disabled?: boolean }>`
    display: flex;
    height: 44px;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    border-radius: 5px;
    transition: all 150ms ease-out;
    cursor: pointer;
    border: none;
    font-size: 18px;
    width: 96px;
    margin-left: ${({$ml}) => $ml ? $ml : "340px"};

    background-color: #769FCD;
    color: #FFFFFF;

    &:hover {
        background-color: #93B7E4;
    }

    &:active {
        background-color: #769FCD;
    }

    &:disabled {
        background-color: #AAAAAA;
        cursor: not-allowed;
    }
`
