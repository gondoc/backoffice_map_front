import React, {useState} from "react";
import styled from "styled-components";
import {StLoginButton} from "@page/LoginPage";

import eye_on from "@image/eye_on.svg";
import eye_off from "@image/eye_off.svg";
import {useCurrentUserQuery, useUserInfoMutation} from "@query/MemberQuery";
import {useNavigate} from "react-router-dom";
import {INIT_NAV, useViewStoreActions} from "@store/viewStore";

const LoginForm = (props: { isRemember: boolean, loginId: string }) => {

    const navigator = useNavigate();
    const viewStoreActions = useViewStoreActions();
    const [isShow, setShow] = useState<boolean>(false)

    const [memberLoginItem, setMemeberLoginItem] = useState<{
        id: string;
        pw: string;
    }>({id: props.loginId, pw: ""});
    const [helpMsg, setHelpMsg] = useState<string>("")

    const {refetch} = useCurrentUserQuery();

    const {mutate} = useUserInfoMutation(
        (msg: string) => {
            setHelpMsg(msg)
        },
        (res: boolean) => {
            // navigator("/back")
            if (res) {
                console.log(" success !! login!! ")
                setHelpMsg("");
                refetch().then(({data}) => {
                    if (data) {
                        localStorage.setItem("loginId", props.isRemember ? memberLoginItem.id : "");
                        viewStoreActions.setCurrentNav(INIT_NAV)
                        navigator("..", {state: {userInfo: data}})
                    }
                }).catch((error) => {
                    console.error(error)
                }).finally(() => {
                    console.log("login fin !!")
                })
            }
        },
        () => {
            alert("로그인이 실패하였습니다")
        },
    );

    const clickHandler = () => {
        mutate(memberLoginItem);
    };

    return (
        <StLoginFormArea $isHelpMsg={helpMsg !== ""}>
            <StInputArea>
                <label htmlFor={"email"}>이메일</label>
                <input // 여기의 자동완성이 다른 곳에서 뜸
                    id={"email"}
                    autoComplete={"off"}
                    type="text"
                    className={"id"}
                    placeholder="이메일을 입력해주세요."
                    required
                    value={memberLoginItem.id}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMemeberLoginItem({...memberLoginItem, id: e.target.value})
                    }
                />
            </StInputArea>

            <StInputArea>
                <label htmlFor={"password"}>비밀번호</label>
                <StPasswordWrapper $isShow={isShow}>
                    <input
                        id={"password"}
                        autoComplete={"off"}
                        type={isShow ? "text" : "password"}
                        className="password"
                        placeholder="영문, 숫자 조합 8~16자"
                        required
                        value={memberLoginItem.pw}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setMemeberLoginItem({...memberLoginItem, pw: e.target.value})
                        }
                    />
                    <div>
                        <i onClick={() => setShow(!isShow)}></i>
                    </div>
                </StPasswordWrapper>
            </StInputArea>

            {
                helpMsg !== "" &&
                <StHelpMsgArea>{helpMsg}</StHelpMsgArea>
            }

            <StLoginButton
                $isMsgShow={helpMsg !== ""}
                type="button"
                onSubmit={() => clickHandler()}
                onClick={() => clickHandler()}
                disabled={!(memberLoginItem.id.length > 0 && memberLoginItem.pw.length > 0)}
            >
                로그인
            </StLoginButton>
        </StLoginFormArea>
    )
}

export default LoginForm

const StLoginFormArea = styled.form<{ $isHelpMsg: boolean }>`
    width: 422px;
    margin-bottom: 5px;
    height: ${({$isHelpMsg}) => $isHelpMsg ? "260px" : "250px"};
`

const StInputArea = styled.div`
    width: 422px;
    height: 80px;
    margin-top: 15px;

    label {
        display: block;
        text-align: left;
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: 600;
        line-height: 16px;
        color: #111111;
    }

    input {
        width: 406px;
        height: 56px;
        /*padding: 16px;*/
        border-radius: 8px;
        border: 1px solid #DCD9D9;
        padding-left: 16px;
        font-size: 17px;

        &::placeholder {
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            text-align: left;
            color: #4D4D4D;
        }
    }
`

const StPasswordWrapper = styled.div<{ $isShow?: boolean }>`
    position: relative;

    div {
        position: absolute;
        display: flex;
        top: 50%;
        bottom: 0;
        right: 15px;
        width: 24px;
        height: 24px;
        transform: translateY(-50%);

        i {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url(${({$isShow}) => $isShow ? eye_on : eye_off}) no-repeat;
            background-size: 100%;

            &:hover {
                cursor: pointer;
            }
        }
    }
`

const StHelpMsgArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    width: 422px;
    height: 30px;
    color: #ff0101;
`


