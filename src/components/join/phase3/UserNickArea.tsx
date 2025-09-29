import JoinRowInput from "@component/join/common/JoinRowInput";
import useUserStore from "@store/userStore";
import {useEffect, useMemo} from "react";
import {useUserNickDupCheck, useUserNickQuery} from "@query/MemberQuery";
import styled from "styled-components";
import icon_refresh from "@image/icon_refresh.svg";

const UserNickArea = () => {
    const {joinPayload, setJoinPayload, joinValid, setJoinValid} =
        useUserStore();

    const {data: checkDupNick, isPending} = useUserNickDupCheck(joinPayload.userNick);
    const {data: randomNick, refetch: reqUserRandomNick, isSuccess, isRefetching} = useUserNickQuery();

    useEffect(() => {
        if (
            joinPayload.userNick &&
            joinPayload.userNick.length > 0 &&
            !validUserNick
        ) {
            return setJoinValid({
                ...joinValid,
                nick: {
                    isValid: false,
                    errorMsg: "2글자 이상 13글자 이내 여야 합니다.",
                },
            });
        }

        if (joinPayload.userNick.length === 0) {
            return setJoinValid({
                ...joinValid,
                nick: {isValid: false},
            });
        }

        if (isPending) {
            return setJoinValid({
                ...joinValid,
                nick: {isValid: false},
            });
        }

        setJoinValid({
            ...joinValid,
            nick: checkDupNick
                ? {isValid: true}
                : {
                    isValid: false,
                    errorMsg: "사용할 수 없는 닉네임입니다.",
                },
        });
    }, [joinPayload.userNick, checkDupNick]);

    const validUserNick: boolean = useMemo(() => {
        const lengthPattern = /^.{2,13}$/;
        return lengthPattern.test(joinPayload.userNick);
    }, [joinPayload.userNick]);

    const refetchBtnClickHandler = () => {
        reqUserRandomNick().then(({data}) => {
            if (data) {
                setJoinPayload({...joinPayload, userNick: data});
            }
        });
    }

    return (
        <>
            <StRefetchBtn type={"button"}
                          onClick={() => refetchBtnClickHandler()}
            >
                <i></i>
            </StRefetchBtn>
            <JoinRowInput
                label={"닉네임"}
                type={"text"}
                placeholder={"별명은 2글자~10글자로 설정해주세요"}
                required={true}
                errorMsg={
                    joinValid.nick.errorMsg !== "" && joinValid.nick?.errorMsg
                        ? joinValid.nick.errorMsg
                        : ""
                }
                initValue={joinPayload.userNick}
                setPayload={(payloadValue) =>
                    setJoinPayload({...joinPayload, userNick: payloadValue})
                }
            />
        </>

    );
};
export default UserNickArea;

const StRefetchBtn = styled.button`
    i {
        display: flex;
        height: 35px;
        width: 35px;
        background: url(${icon_refresh}) no-repeat center/100%;;
    }
`
