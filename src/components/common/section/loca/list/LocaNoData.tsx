import styled from "styled-components";

const LocaNoData = () => {

    return (
        <NoDataWrapper>
            왼쪽 리스트에서 지역을 선택해주세요
        </NoDataWrapper>
    )
}

export default LocaNoData

const NoDataWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 563px;
    height: 720px;
    border-radius: 10px;
    border: 2px solid #769FCD;
    margin: 0 23px;
    color: #6c757d;
`
