import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import styled from "styled-components";
import LoginForm from "@component/login/LoginForm";
import {useLogOutUserQuery} from "@query/MemberQuery";
import {useQueryClient} from "@tanstack/react-query";
import {QueryKeys} from "@query/QueryKeys";
import {baseToPath} from "@config/url";
import {INIT_NAV, useViewStoreActions} from "@store/viewStore";

const LoginPage = () => {

    const queryClient = useQueryClient();
    const navigator = useNavigate();
    const {refetch: logout} = useLogOutUserQuery();
    const viewStoreActions = useViewStoreActions();
    const loginId = (localStorage.getItem("loginId") ? localStorage.getItem("loginId") : "") as string;

    const [isChecked, setChecked] = useState<boolean>(loginId !== "")

    const viewerBtnClickHandler = () => {
        queryClient.removeQueries({queryKey: [QueryKeys.member.me]})
        logout().then(() => {
            viewStoreActions.setCurrentNav(INIT_NAV)
            navigator("..");
        });
    }

    return (
        <LoginWrapper>
            <LoginContainer>
                <TitleArea>
                    <StLogoArea>Career Map Back Office</StLogoArea>
                    <StTitle>관리자 로그인</StTitle>
                </TitleArea>

                <StViewerLoginButton onClick={() => viewerBtnClickHandler()}>
                    비회원으로 둘러보기
                </StViewerLoginButton>

                <StMovingWrapper>
                    {/*로그인 폼*/}
                    <LoginForm isRemember={isChecked} loginId={loginId}/>

                    <StLoginOptionContainer>
                        <StLoginOptions>
                            <div>
                                <input id={"remember"} type="checkbox" checked={isChecked}
                                       onChange={() => setChecked(!isChecked)}/>
                                <label htmlFor={"remember"}>계정 기억하기</label>
                            </div>
                            <a onClick={() => navigator("/find")}>계정 / 비밀번호 찾기</a>
                        </StLoginOptions>

                    </StLoginOptionContainer>
                </StMovingWrapper>
                <StRegisterArea>
                    아직 회원이 아니신가요?&nbsp;
                    <a onClick={() => navigator("/join")}>
                        회원가입
                    </a>
                </StRegisterArea>
            </LoginContainer>
        </LoginWrapper>
    );
};

export default LoginPage;

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f8f8f8;
    align-items: center;
    height: 1080px;
    font-family: 'Pretendard', sans-serif;
`

const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 565px;
    height: 917px;
    background-color: #ffffff;
    border-radius: 40px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 30px 30px 0 30px;
    text-align: center;
`

const TitleArea = styled.div`
    width: 551px;
    height: 174px;
    padding-top: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const StLogoArea = styled.div`
    height: 30px;
    font-weight: 600;
    font-size: 30px;
    line-height: 30px;
    letter-spacing: 3px;
    color: #769FCD;
    margin-bottom: 30px;
`

const StTitle = styled.div`
    color: #4D4D4D;
    font-weight: 600;
    font-size: 25px;
`

const LoginButton = styled.button`
    width: 422px;
    height: 48px;
    border-radius: 8px;
    border: none;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
    align-items: center;

    &:disabled {
        background-color: #C4C4C4;
        cursor: not-allowed;

        &:hover {
            background-color: #C4C4C4;
        }
    }
`

export const StViewerLoginButton = styled(LoginButton)`
    margin-bottom: 10px;
    background-color: #8B94A3;

    &:hover {
        background-color: #A5ADB8;
        cursor: pointer;
    }

    &:active {
        background-color: #6B7480;
    }
`

export const StLoginButton = styled(LoginButton)<{ $isMsgShow: boolean }>`
    margin-bottom: 10px;
    background-color: #769FCD;
    margin-top: ${({$isMsgShow}) => $isMsgShow ? "0px" : "15px"};

    &:hover {
        background-color: #93B7E4;
        cursor: pointer;
    }

    &:active {
        background-color: #517EBC;
    }
`

const StMovingWrapper = styled.div`
    height: 500px;
`

const StLoginOptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 422px;
    height: 210px;

    a {
        text-decoration: none;
        color: #111111;
    }
`

const StLoginOptions = styled.div`
    display: flex;
    width: 422px;
    height: 22px;
    align-items: center;
    justify-content: space-between;

    a {
        text-decoration: none;
        color: #111111;
        cursor: pointer;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;

        label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            margin-left: 5px;
        }
    }
`

const StRegisterArea = styled.div`
    position: relative;
    bottom: 0;
    width: 422px;
    height: 16px;

    a {
        font-weight: 500;
        font-size: 16px;
        color: #769FCD;
        cursor: pointer;
    }
`