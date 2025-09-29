import React from "react";
import {StModUserRowWrapper} from "@component/common/section/modUser/preview/ModUserInfoArea";
import PreviewRow from "@component/common/section/modUser/preview/PreviewRow";

const PreviewUserEmail = (props: { userEmail: string }) => {

    return (
        <StModUserRowWrapper $isMod={false}>
            <PreviewRow
                isFirst={true}
                labelId={`USER_EMAIL`}
                labelNm={"내 계정"}
                value={props.userEmail}
                key={`USER_EMAIL`}
            />
        </StModUserRowWrapper>
    )
}

export default PreviewUserEmail