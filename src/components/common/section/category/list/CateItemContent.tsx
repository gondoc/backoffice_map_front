import styled from "styled-components";
import React, {Dispatch, SetStateAction, useRef} from "react";
import useViewStore from "@store/viewStore";
import {ICategory} from "@type/categories.types";

interface IProps {
    index: number,
    item: ICategory
    updateItem: { id: string; nm: string; content: string; isUpdate: boolean; },
    setUpdateItem: Dispatch<SetStateAction<{ id: string; nm: string; content: string; isUpdate: boolean; }>>,
}

const CateItemContent = ({index, item, updateItem, setUpdateItem}: IProps) => {

    const searchWord = useViewStore((state) => state.searchWord);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    // const [updateItem, setUpdateItem] = useState<{
    //     id: string,
    //     nm: string,
    //     content: string
    // }>({
    //     id: item.id!,
    //     nm: item.nm,
    //     content: item.content
    // });

    const contentOnChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdateItem({...updateItem, content: e.currentTarget.value});
        // textarea 높이 조절
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    };

    const findSearchWordInContent = (content: string, searchWord: string): string => {
        if (!content.includes(searchWord) || !searchWord) return content;
        return content.replaceAll(searchWord, `<span>${searchWord}</span>`);
    }

    return (
        <>
            <ItemNameArea>
                <ItemNameLabel htmlFor={`category_item_name_${index}`}>분류명
                    {/*{*/}
                    {/*    updateItem.isUpdate ?*/}
                    <ItemNameInput
                        disabled={!updateItem.isUpdate}
                        id={`category_item_name_${index}`}
                        value={updateItem.nm}
                        onChange={(e) => {
                            setUpdateItem({...updateItem, nm: e.target.value})
                        }}
                    />
                    {/*:*/}
                    {/*        <ItemNamePre*/}
                    {/*            id={`category_item_name_${index}`}*/}
                    {/*            dangerouslySetInnerHTML={{__html: findSearchWordInContent(item.nm, searchWord)}}*/}
                    {/*        ></ItemNamePre>*/}
                    {/*}*/}
                </ItemNameLabel>
            </ItemNameArea>
            {
                updateItem.isUpdate ?
                    <CateContentTextArea
                        id={`category_item_content_${index}`}
                        ref={textareaRef}
                        rows={updateItem.content.split("\n").length}
                        $width={"718px"} $height={"fit-content"}
                        value={updateItem.content}
                        onChange={(e) => contentOnChangeHandler(e)}
                    /> :
                    <CateContentDiv
                        $width={"718px"} $height={"fit-content"}
                        dangerouslySetInnerHTML={{__html: findSearchWordInContent(item.content, searchWord)}}
                    />
            }
        </>
    )
}

export default CateItemContent

const ItemNameArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    width: 742px;
    height: 50px;
`

const ItemNameLabel = styled.label<{ $height?: string }>`
    display: flex;
    align-items: center;
    width: 742px;
    height: ${(props) => props?.$height ? props.$height : "50px"};
`

const ItemNamePre = styled.pre`
    display: flex;
    align-items: center;
    width: 676px;
    margin-left: 10px;
    padding-left: 10px;
    height: 25px;
    border: 2px solid #769FCD;
    border-radius: 3px;
    color: #000000;
    font-size: 16px;

    &:read-only {
        color: #6c757d;

        &:focus-visible {
            outline: 0;
        }
    }

    span {
        color: #FFFFFF;
        background-color: #5D84F0;
    }
`

const ItemNameInput = styled.input`
    display: inline-block;
    width: 676px;
    margin-left: 10px;
    padding-left: 10px;
    height: 25px;
    border: 2px solid #769FCD;
    border-radius: 3px;
    color: #000000;
    font-size: 16px;

    &:read-only {
        color: #6c757d;

        &:focus-visible {
            outline: 0;
        }
    }

    span {
        color: #FFFFFF;
        background-color: #5D84F0;
    }

    &:disabled {
        background-color: #FFFFFF;
    }
`

const CateContentTextArea = styled.textarea<{ $width?: string, $height?: string }>`
    font-size: 16px;
    margin: 10px 0;
    padding: 10px;
    border: 2px solid #517EBC;
    border-radius: 3px;
    resize: none;
    overflow: hidden;

    width: ${(props) => props?.$width ? props.$width : "100px"};
    height: ${(props) => props?.$height ? props.$height : "100px"};

    &:read-only {
        color: #6c757d;

        &:focus-visible {
            outline: 0;
        }
    }
`

const CateContentDiv = styled.pre<{ $width?: string, $height?: string }>`
    font-size: 16px;
    margin: 10px 0;
    padding: 10px;
    border: 2px solid #769FCD;
    border-radius: 3px;
    resize: none;
    overflow: hidden;

    width: ${(props) => props?.$width ? props.$width : "100px"};
    height: ${(props) => props?.$height ? props.$height : "100px"};

    &:read-only {
        color: #6c757d;

        &:focus-visible {
            outline: 0;
        }
    }

    span {
        color: #FFFFFF;
        background-color: #5D84F0;
    }
`
