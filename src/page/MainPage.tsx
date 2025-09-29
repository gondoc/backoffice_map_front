import UseInitPage from "@hook/useInitPage";
import TopBar from "@component/common/topbar/TopBar";
import Nav from "@component/common/nav/Nav";
import Section from "@component/common/section/Section";
import ToastArea from "@component/common/toast/ToastArea";
import DialogArea from "@component/common/dialog/DialogArea";
import CategoryRegArea from "@component/common/section/category/reg/CategoryRegArea";
import HistRegArea from "@component/common/section/hist/reg/HistRegArea";

const MainPage = () => {

    UseInitPage();

    return (
        <div className={"wrap"}>
            {/*탑바 영역*/}
            <TopBar/>
            {/*네비게이션 영역*/}
            <Nav/>
            {/*대시보드 섹션 영역*/}
            <Section/>
            {/*토스트알림 영역*/}
            <ToastArea/>
            {/*다이얼록 영역*/}
            <DialogArea/>
            {/*분류 등록 폼 영역*/}
            <CategoryRegArea/>
            {/*이력 등록 폼 영역*/}
            <HistRegArea/>
        </div>
    )
}

export default MainPage

