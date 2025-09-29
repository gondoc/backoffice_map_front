import styled from "styled-components";
import useViewStore from "@store/viewStore";
import {ILabelValue, ILabelValueStatus} from "@type/common.types";
import React, {useEffect} from "react";
import {NAV_VALUE} from "@config/constant";

const NavItems = (props: ILabelValue) => {

    const currentNav: ILabelValue = useViewStore(state => state.currentNav)
    const viewStoreActions = useViewStore((state) => state.actions);

    const navItemClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
        viewStoreActions.setSearchWord("");
        let payload: ILabelValueStatus = {
            label: props.label,
            value: props.value,
            status: "none",
        }

        if (e.currentTarget.value === NAV_VALUE.MOD_ACCOUNT) {
            // payload.prevNav = props.value;
            payload = {
                ...payload, prevNav: {
                    label: currentNav.label,
                    value: currentNav.value
                }
            }
        }

        viewStoreActions.setCurrentNav(payload)
    }

    return (
        <NavItem
            key={`nav_item_${props.value}`}
            $isActive={props.value === currentNav.value}
            value={props.value}
            onClick={(e) => navItemClickHandler(e)}
        >
            <ItemTitle>{props.label}</ItemTitle>
        </NavItem>
    )
}

export default NavItems

const NavItem = styled.li<{ $isActive: boolean }>`
    width: 176px;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    border-radius: 5px;
    margin-bottom: 5px;
    transition: all 150ms ease-out;
    cursor: pointer;

    background: ${(props) => props.$isActive ? "#769FCD" : "#FFFFFF"};
    color: ${(props) => props.$isActive ? "#FFFFFF" : "#6c757d"};

    &:hover {
        color: ${(props) => props.$isActive ? "#FFFFFF" : "#769FCD"};
    }

    &:last-child {
        margin-bottom: 0;
    }
`

const ItemTitle = styled.div`
    padding-left: 10px;
`
