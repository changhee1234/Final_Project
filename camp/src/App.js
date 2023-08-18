import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./page/main/MainPage";
import MyPage from "./page/trade/MyPage";
import CampDetailPage from "./page/camp/CampDetailPage";
import TradeListPage from "./page/trade/TradeListPage";
import TradeDetailPage from "./page/trade/TradeDetailPage";
import TradeWritePage from "./page/trade/TradeWritePage";
import CampReservationPage1 from "./page/camp/CampReservationPage1";
import CampReservationPage2 from "./page/camp/CampReservationPage2";
import CampReservationPage3 from "./page/camp/CampReservationPage3";
import AnnouncementListPage from "./page/announce/AnnouncementListPage";
import AnnouncementDetailPage from "./page/announce/AnnouncementDetailPage";
import CampListPage from "./page/camp/CampListPage";
import Header from "./page/layout/Header";
import ErrorPage from "./page/layout/ErrorPage";
import AboutPage from "./page/layout/AboutPage";
import Footer from "./page/layout/Footer";

function App(props) {
  return (
      <div className={'App'}>
      <BrowserRouter>
        <Header/>
        <Routes path={'/'}>
          {/*메인페이지*/}
          <Route path={'/'} element={<MainPage/>}/>
          {/*마이페이지*/}
          {/*<Route path={'/myPage'} element={<MyPage/>}/>*/}
          {/*예외처리(에러페이지)*/}
          <Route path={'*'} element={<ErrorPage/>}/>
          {/*캠핑장 리스트*/}
          <Route path={'/camp'} element={<CampListPage/>}/>
          {/*캠핑장 상세보기*/}
          <Route path={'/campList/*'} element={<CampDetailPage/>}/>
          {/*중고장터 리스트*/}
          <Route path={'/trade'} element={<TradeListPage/>}/>
          {/*중고장터 상세보기*/}
          <Route path={'/tradeDetail/*'} element={<TradeDetailPage/>}/>
          {/*중고장터 글 등록*/}
          <Route path={'/tradeWrite/*'} element={<TradeWritePage/>}/>
          {/*예약페이지*/}
          <Route path={'/reservation1/*'} element={<CampReservationPage1/>}/>
          <Route path={'/reservation2/*'} element={<CampReservationPage2/>}/>
          <Route path={'/reservation3/*'} element={<CampReservationPage3/>}/>
          {/*어바웃페이지*/}
          <Route path={'/about'} element={<AboutPage/>}/>
          {/*공지사항 리스트 페이지*/}
          {/*<Route path={'/announcementList'} element={<AnnouncementListPage/>}/>*/}
          {/*공지사항 상세보기 페이지*/}
          {/*<Route path={'/announcementDetail/*'} element={<AnnouncementDetailPage/>}/>*/}
        </Routes>
        <Footer/>
      </BrowserRouter>
      </div>
  );
}

export default App;
