import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "@page/MainPage";
import "@css/common.css"
import "@css/datePicker.css"
import NotFoundPage from "@page/NotFoundPage";
import LoginPage from "@page/LoginPage";
import JoinPage from "@page/JoinPage";
import FindPage from "@page/FindPage";
import ResetPage from "@page/ResetPage";
import VerifyEmailPage from "@page/VerifyEmailPage";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={"/back/"}>
            <Routes>
                <Route path={"/"} element={<MainPage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/join"} element={<JoinPage/>}/>
                <Route path={"/find"} element={<FindPage/>}/>
                <Route path={"/reset"} element={<ResetPage/>}/>
                <Route path={"/verify-recovery-email"} element={<VerifyEmailPage/>}/>
                <Route path={"/*"} element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
);