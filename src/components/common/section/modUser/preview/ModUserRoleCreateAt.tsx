import {ContentInput, FieldName, FieldRow, InputWrapper} from "@component/common/section/modUser/ModUserSection";
import dayjs from "dayjs";
import React from "react";
import {StModUserRowWrapper} from "@component/common/section/modUser/preview/ModUserInfoArea";
import PreviewRow from "@component/common/section/modUser/preview/PreviewRow";

const ModUserRoleCreateAt = (props: { role: string, createAt: string, updateAt?: string }) => {

    return (
        <StModUserRowWrapper>
            <PreviewRow
                isFirst={true}
                key={`USER_ROLE`}
                labelId={`USER_ROLE`}
                labelNm={"내 계정 권한 "}
                value={props.role}
            />


            {/*<FieldRow>*/}
            {/*    <FieldName htmlFor={`USER_CREATE_AT`}*/}
            {/*               $height={"45px"}*/}
            {/*               $width={"125px"}*/}
            {/*               $padding={"0 0 0 5px"}*/}
            {/*    >*/}
            {/*        가입일*/}
            {/*    </FieldName>*/}
            {/*    <InputWrapper>*/}
            {/*        <ContentInput*/}
            {/*            disabled={true}*/}
            {/*            autoComplete={"off"}*/}
            {/*            minLength={5}*/}
            {/*            maxLength={25}*/}
            {/*            type={"search"}*/}
            {/*            id={`USER_CREATE_AT`}*/}
            {/*            $width={"410px"}*/}
            {/*            $backgroundColor={"#C4C4C4"}*/}
            {/*            value={props?.createAt ? dayjs(props.createAt, "YYYY-MM-DD HH:mm:ss").format("YYYY년 MM월 DD일") : "회원 정보를 찾을 수 없습니다."}*/}
            {/*            readOnly={true}*/}
            {/*        />*/}
            {/*    </InputWrapper>*/}
            {/*</FieldRow>*/}

            <PreviewRow
                isFirst={true}
                key={`USER_CREATE_AT`}
                labelId={`USER_CREATE_AT`}
                labelNm={"가입일"}
                value={props.createAt}
            />
            {/*<FieldRow>*/}
            {/*    <FieldName htmlFor={`USER_UPDATE_AT`}*/}
            {/*               $height={"45px"}*/}
            {/*               $width={"125px"}*/}
            {/*               $padding={"0 0 0 5px"}*/}
            {/*    >*/}
            {/*        최근 수정일*/}
            {/*    </FieldName>*/}
            {/*    <InputWrapper>*/}
            {/*        <ContentInput*/}
            {/*            disabled={true}*/}
            {/*            autoComplete={"off"}*/}
            {/*            minLength={5}*/}
            {/*            maxLength={25}*/}
            {/*            type={"search"}*/}
            {/*            id={`USER_UPDATE_AT`}*/}
            {/*            $width={"410px"}*/}
            {/*            $backgroundColor={"#C4C4C4"}*/}
            {/*            value={props?.updateAt ? dayjs(props.updateAt, "YYYY-MM-DD HH:mm:ss").format("YYYY년 MM월 DD일 HH시 mm분 ss초") : "최근 수정된 이력이 없습니다."}*/}
            {/*            readOnly={true}*/}
            {/*        />*/}
            {/*    </InputWrapper>*/}
            {/*</FieldRow>*/}

            <PreviewRow
                isFirst={true}
                key={`USER_UPDATE_AT`}
                labelId={`USER_UPDATE_AT`}
                labelNm={"최근 수정일"}
                value={props?.updateAt ? dayjs(props.updateAt, "YYYY-MM-DD HH:mm:ss").format("YYYY년 MM월 DD일 HH시 mm분 ss초") : "최근 수정된 이력이 없습니다."}
            />
        </StModUserRowWrapper>
    )
}

export default ModUserRoleCreateAt