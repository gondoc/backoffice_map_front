import styled from "styled-components";
import NavCategory from "@component/common/nav/NavCategory";
import {INav, NAV_CONSTANT} from "@config/constant";

const Nav = () => {

    return (
        <NavWrapper>
            <>
                {NAV_CONSTANT.map((nav: INav) =>
                    <NavCategory
                        key={`nav_category_${nav.subject}`}
                        subject={nav.subject}
                        items={nav.items}
                    />)}
            </>
        </NavWrapper>
    )
}

export default Nav

const NavWrapper = styled.div`
    width: 200px;
    height: 1010px;
    left: 0;
    padding: 30px 10px;
`
