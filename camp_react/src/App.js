import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./layout/header.js";
import MainPage from "./page/mainPage.js";
import MyPage from "./page/myPage.js";
import ErrorPage from "./page/errorPage.js";
import CampListPage from "./page/campListPage.js";
import CampDetailPage from "./page/campDetailPage.js";
import TradeListPage from "./page/tradeListPage.js";
import TradeDetailPage from "./page/tradeDetailPage.js";
import CampReservationPage1 from "./page/campReservationPage1.js";
import CampReservationPage2 from "./page/campReservationPage2.js";
import CampReservationPage3 from "./page/campReservationPage3.js";
import AboutPage from "./page/aboutPage.js";
import AnnouncementListPage from "./page/announcementListPage.js";
import AnnouncementDetailPage from "./page/announcementDetailPage.js";
import CampRegisterCombined from "./componunt/jeongGyuHo/campRegisterCombined.js";
import Footer from "./layout/footer.js";
import DetailPartnerCamp from "./componunt/jeongGyuHo/DetailPartnerCamp.js";

function App() {
  return (
    <div className="App">
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
          <Route path={'/trade'} element={<TradeListPage/>}/>
          {/*중고장터 상세보기*/}
          <Route path={'/tradeDetail/*'} element={<TradeDetailPage/>}/>
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
          <Route path={'/detailPartnerCamp/:campIdx'} element={<DetailPartnerCamp/>}/>
          <Route path={'campRegister'} element={<CampRegisterCombined/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
