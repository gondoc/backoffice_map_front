import styled from "styled-components";
import {NameInput} from "@component/common/section/category/reg/CategoryRegArea";
import {useHistStore, useHistStoreActions} from "@store/histStore";

const HistRegDateInputArea = () => {

    const registerForm = useHistStore((state) => state.registerForm)
    const histStoreActions = useHistStoreActions();

    const findNotAllowChar = (typingCarNum: string) => {
        const notAllowChar: RegExp = /[~!@#$%";'^,&*()_₩/+|<>=`?.:{}\\]|[/[\]]|[a-z|A-Z]|[ㄱ-ㅎ|가-힣]|[ㅏ-ㅣ]|\s/g;
        return typingCarNum.replace(notAllowChar, "");
    }

    return (
        <Wrapper>
            <DateInput
                autoComplete={"off"}
                name={"HIST_START_DTM"}
                $width={"170px"}
                type={"text"}
                minLength={7}
                maxLength={7}
                placeholder={"YYYY-MM"}
                value={registerForm?.startDtm ?? ""}
                onChange={(e) =>
                    histStoreActions.setRegisterForm({
                        ...registerForm,
                        startDtm: findNotAllowChar(e.target.value)
                    })}
            />
            ~
            <DateInput
                autoComplete={"off"}
                name={"HIST_END_DTM"}
                $width={"170px"}
                type={"text"}
                minLength={7}
                maxLength={7}
                placeholder={"YYYY-MM"}
                value={registerForm?.endDtm ?? ""}
                onChange={(e) =>
                    histStoreActions.setRegisterForm({
                        ...registerForm,
                        endDtm: findNotAllowChar(e.target.value)
                    })}
            />
        </Wrapper>
    )

}

export default HistRegDateInputArea

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 410px;
    margin-left: 10px;
`


const DateInput = styled(NameInput)`
    height: 40px;
    margin-left: 0;
`

