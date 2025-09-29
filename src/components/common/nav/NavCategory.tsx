import styled from "styled-components";
import NavItems from "@component/common/nav/NavItems";
import {ILabelValue} from "@type/common.types";

interface Props {
    subject: string,
    items: ILabelValue[]
}

const NavCategory = (props: Props) => {

    return (
        <NavCategoryWrapper>
            <NavSubject>{props.subject}</NavSubject>
            <NavList key={`nav_list_${props.subject}`}>
                <>
                    {
                        props.items.map((item: ILabelValue) =>
                            <NavItems
                                key={`nav_items_${item.value}`}
                                label={item.label}
                                value={item.value}
                            />)
                    }
                </>
            </NavList>
        </NavCategoryWrapper>
    )
}

export default NavCategory

const NavCategoryWrapper = styled.div`
`

const NavSubject = styled.h4`
    padding-left: 15px;
    margin-bottom: 15px;
    color: #6c757d;
`

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 0;
    list-style: none;
    padding-left: 0;
`
