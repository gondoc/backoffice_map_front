import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import {useCurrentUserQuery, useLogOutUserQuery} from "@query/MemberQuery";
import {QueryKeys} from "@query/QueryKeys";
import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";

const TopArea = () => {

    const queryClient = useQueryClient();
    const location = useLocation();
    const {data: userInfo, isPending} = useCurrentUserQuery();
    const {refetch: logout} = useLogOutUserQuery();

    const navigate = useNavigate();
    const [userNick, setUserNick] = useState<string>("")

    const onClickHandler = () => {
        const port: number = import.meta.env.VITE_MAP_FRONT_PORT;
        // window.location.href = `https://${window.location.hostname}:${port}/main`
        window.location.href = `${process.env.NODE_ENV === "development" ? "http" : "https"}://${window.location.hostname}:${port}/main/`
    }

    const logInOutBtnClickHandler = () => {
        if (location?.state?.userInfo?.nick) {
            logout().then(() => {
                queryClient.removeQueries({queryKey: [QueryKeys.member.me]})
                navigate("/login")
                return;
            });
        }
        navigate("/login")
    }

    return (
        <TopAreaWrapper>
            <UserArea>
                <UserItem>
                    {userInfo?.nick ?? "비회원"} 님
                </UserItem>
            </UserArea>
            <LogInOut onClick={() => logInOutBtnClickHandler()}>
                {userInfo?.nick ? "로그아웃" : "로그인"}
            </LogInOut>
            <AdminArea>
                <NavigateBtn onClick={() => onClickHandler()}>Career Map Page</NavigateBtn>
            </AdminArea>
        </TopAreaWrapper>
    )
}

export default TopArea


const TopAreaWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    width: 1700px;
    height: 70px;
`

const UserArea = styled.div`
    width: 200px;
    height: 50px;
    margin-left: auto;
    margin-right: 13px;
`

const UserItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    height: 50px;
`

const LogInOut = styled.button`
    display: flex;
    width: 96px;
    height: 45px;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    border-radius: 5px;
    transition: all 150ms ease-out;
    cursor: pointer;
    border: none;
    margin-right: 10px;
    font-size: 18px;

    background-color: #769FCD;
    color: #FFFFFF;

    &:hover {
        background-color: #93B7E4;
    }

    &:active {
        background-color: #769FCD;
    }
`

const AdminArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 190px;
    height: 70px;
    z-index: 10;
`

const NavigateBtn = styled.button<{
    $width?: string,
    $height?: string,
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 190px;
    height: 45px;
    margin-right: 25px;
    border-radius: 5px;
    background-color: #F7FBFC;
    font-size: 16px;
    color: #000000;

    cursor: pointer;
    border: 3px solid #769FCD;

    &:hover {
        border-color: #93B7E4;
    }

    &:active {
        border-color: #517EBC;
    }

`