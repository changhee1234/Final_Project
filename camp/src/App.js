import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layout/Layout";
import BoardList from "./board/BoardList";
import BoardWrite from "./board/BoardWrite";
import ErrorPage from "./layout/errorPage";
import Header from "./layout/header";
import Footer from "./layout/footer";
import BoardDetail from "./board/BoardDetail";
import MainPage from "./layout/MainPage";
import MyPage from "./board/myPage";
import CampDetailPage from "./page/campDetailPage";
import TradeListPage from "./page/tradeListPage";
import TradeDetailPage from "./page/tradeDetailPage";
import CampReservationPage1 from "./page/campReservationPage1";
import CampReservationPage2 from "./page/campReservationPage2";
import CampReservationPage3 from "./page/campReservationPage3";
import AboutPage from "./page/aboutPage";
import AnnouncementListPage from "./page/announcementListPage";
import AnnouncementDetailPage from "./page/announcementDetailPage";

function SelectBoardDetail() {
  return null;
}

function CampListPage() {
  return null;
}

function App(props) {
  return (
      <div className={'App'}>
      <BrowserRouter>
        <Header/>
        <Routes path={'/'}>
          {/*메인페이지*/}
          <Route path={'/'} element={<MainPage/>}/>
          {/*마이페이지*/}
          <Route path={'/myPage'} element={<MyPage/>}/>
          {/*예외처리(에러페이지)*/}
          <Route path={'*'} element={<ErrorPage/>}/>
          {/*캠핑장 리스트*/}
          <Route path={'/camp'} element={<CampListPage/>}/>
          {/*캠핑장 상세보기*/}
          <Route path={'/campList/*'} element={<CampDetailPage/>}/>
          {/*중고장터 리스트*/}
          <Route path={'/trade'} element={<BoardList/>}/>
          {/*중고장터 상세보기*/}
          <Route path={'/tradeDetail/*'} element={<BoardDetail/>}/>
          {/*중고장터 글 등록*/}
          <Route path={'/tradeWrite/*'} element={<BoardWrite/>}/>
          {/*예약페이지*/}
          <Route path={'/reservation1/*'} element={<CampReservationPage1/>}/>
          <Route path={'/reservation2/*'} element={<CampReservationPage2/>}/>
          <Route path={'/reservation3/*'} element={<CampReservationPage3/>}/>
          {/*어바웃페이지*/}
          <Route path={'/about'} element={<AboutPage/>}/>
          {/*공지사항 리스트 페이지*/}
          <Route path={'/announcementList'} element={<AnnouncementListPage/>}/>
          {/*공지사항 상세보기 페이지*/}
          <Route path={'/announcementDetail/*'} element={<AnnouncementDetailPage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      </div>
      //     <BrowserRouter>
  //       <Routes>
  //         {/*<Route path={"/"} element={<BoardList/>}>*/}
  //         {/*<Route path={"/"} element={<BoardWrite/>}>*/}
  //         {/*<Route path={"/"} element={<BoardDetail/>}>*/}
  //         <Route path={"/"} element={<MainPage/>}>
  //           {/*<Route index element={<BoardWrite/>}/>*/}
  //           {/*<Route path={"board/:boardIdx"} element={<SelectBoardDetail/>}/>*/}
  //           {/*<Route path={"write"} element={<BoardWrite/>}/>*/}
  //           {/*<Route path={"*"} element={<ErrorPage/>}/>*/}
  //         </Route>
  //       </Routes>
  //     </BrowserRouter>
  );
}

export default App;
