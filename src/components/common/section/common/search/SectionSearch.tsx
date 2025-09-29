import styled from "styled-components";

import icon_search from "@image/free-icon-magnifier-2866321.png";
import {useViewStoreActions} from "@store/viewStore";
import {useState} from "react";
import {useLocationStoreActions} from "@store/locationStore";

interface IProps {
    totalWidth?: string,
    totalHeight?: string,
    buttonWidth?: string,
    buttonHeight?: string,
}

const SectionSearch = ({
                           totalWidth,
                           totalHeight,
                           buttonWidth,
                           buttonHeight,
                       }: IProps) => {

    const viewStoreActions = useViewStoreActions();
    const locationStoreActions = useLocationStoreActions();
    const [typing, setTyping] = useState<string>("");

    const onKeyUpHandler = (key: string) => {
        if (key === "Escape") {
            locationStoreActions.setActiveLocation(null);
            return setTyping("");
        }

        if (key === "Enter") {
            locationStoreActions.setActiveLocation(null);
            return setSearchWord(typing);
        }
    }

    const setSearchWord = (typing: string) => {
        viewStoreActions.setSearchWord(typing.trim());
    }

    return (
        <SectionSearchWrapper
            $width={totalWidth && totalWidth}
            $height={totalHeight && totalHeight}
        >
            <SearchArea>
                <SearchInput
                    name={`SEARCH_INPUT`}
                    value={typing}
                    onKeyUp={(e) =>
                        onKeyUpHandler(e.key)}
                    onChange={(e) =>
                        setTyping(e.currentTarget.value)}
                />
            </SearchArea>
            <SearchBtn
                $width={buttonWidth && buttonWidth}
                $height={buttonHeight && buttonHeight}
                onClick={() => setSearchWord(typing)}
            >검색</SearchBtn>
        </SectionSearchWrapper>
    )
}

export default SectionSearch

const SectionSearchWrapper = styled.div<{ $width?: string, $height?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => props?.$width ? props.$width : "100%"};
    height: ${(props) => props?.$height ? props.$height : "100%"};
`

const SearchArea = styled.div`
    display: flex;
    width: fit-content;
    height: 40px;
`

const SearchInput = styled.input`
    width: 800px;
    height: 40px;
    border: 2px solid #769FCD;
    border-radius: 14px;
    padding-left: 14px;
    font-size: 16px;

    &::after {
        content: "";
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 3px;
        background: url(${icon_search}) no-repeat center / 100%;
    }
`

const SearchBtn = styled.button<{
    $width?: string,
    $height?: string,
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    border: 0;
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;

    width: ${(props) => props?.$width ? props.$width : "130px"};
    height: ${(props) => props.$height ? props.$height : "30px"};

    background-color: #769FCD;
    color: #FFFFFF;

    &:disabled {
        background-color: #C4C4C4;
    }

    &:hover {
        background-color: #93B7E4;
    }

    &:active {
        background-color: #517EBC;
    }

`