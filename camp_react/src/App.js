import {BrowserRouter, Route, Routes} from "react-router-dom";
import CampDetailPage from "./page/campDetailPage.js";
import AboutPage from "./page/aboutPage.js";
import AnnouncementListPage from "./page/announcementListPage.js";
import AnnouncementDetailPage from "./page/announcementDetailPage.js";
import CampRegisterCombined from "./componunt/jeongGyuHo/campRegisterCombined.js";
import DetailPartnerCamp from "./componunt/jeongGyuHo/DetailPartnerCamp.js";
import CampReservationPage1 from "./page/camp/CampReservationPage1";
import CampReservationPage2 from "./page/camp/CampReservationPage2";
import CampReservationPage3 from "./page/camp/CampReservationPage3";
import CampReservationPage4 from "./page/camp/CampReservationPage4";
import {useState} from "react";
import MainPage from "./page/main/MainPage";
import MyPage from "./page/MyPage/MyPage";
import ErrorPage from "./page/layout/ErrorPage";
import TradeListPage from "./page/trade/TradeListPage";
import TradeDetailPage from "./page/trade/TradeDetailPage";
import Header from "./page/layout/Header";
import Footer from "./page/layout/Footer";
import UpdatePage from "./page/trade/UpdatePage";
import TradeWritePage from "./page/trade/TradeWritePage";
import CampListPage from "./page/campListPage";
import CampList from "./componunt/jeongGyuHo/campList";
import Editor from "./Editor";
import SelectPartnerCamp from "./componunt/jeongGyuHo/SelectPartnerCamp";
import PartnerCampDetail from "./componunt/jeongGyuHo/DetailPartnerCamp.js";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const handleUserInfo = (data) => {
    setUserInfo(data);
  };

  return (
      <div className="App">
        {/*<Editor path={'/editor'}/>*/}
        <BrowserRouter>
          <Header getUserInfo ={handleUserInfo}/>
          <Routes path={'/'}>
            {/*메인페이지*/}
            <Route path={'/'} element={<MainPage/>}/>
            {/*마이페이지*/}

            <Route path={'/myPage/:userInfo'} element={<MyPage/>}/>
            {/*예외처리(에러페이지)*/}
            <Route path={'*'} element={<ErrorPage/>}/>
            {/*캠핑장 리스트*/}
            <Route path={'/camp'} element={<CampListPage/>}/>

            {/*캠핑장 상세보기*/}
            <Route path={'/campList/*'} element={<CampDetailPage/>}/>
            {/*중고장터 리스트*/}
            <Route path={'/trade'} element={<TradeListPage/>}/>
            {/*중고장터 상세보기*/}
            <Route path={'/trade/:tradeBoardIdx'} element={<TradeDetailPage/>}/>
            {/*중고장터 글 등록*/}
            <Route path={'/tradeWrite/*'} element={<TradeWritePage/>}/>
            <Route path={'/board/edit/:tradeBoardIdx'} element={<UpdatePage/>}/>
            {/*예약페이지*/}
            <Route path={'/reservation1/*'} element={<CampReservationPage1 userInfo={userInfo}/>}/>
            <Route path={'/reservation2/reserveStep/:siteIdx'} element={<CampReservationPage2 userInfo={userInfo}/>}/>
            <Route path={'/reservation3/*'} element={<CampReservationPage3 userInfo={userInfo}/>}/>
            <Route path={'/reservation4/*'} element={<CampReservationPage4 userInfo={userInfo}/>}/>
            {/*어바웃페이지*/}
            <Route path={'/about'} element={<AboutPage/>}/>
            {/*공지사항 리스트 페이지*/}
            <Route path={'/announcementList'} element={<AnnouncementListPage/>}/>
            {/*공지사항 상세보기 페이지*/}
            <Route path={'/announcementDetail/*'} element={<AnnouncementDetailPage/>}/>

            <Route path={'/selectPartnerCamp'} element={<SelectPartnerCamp/>}/>
            <Route path={'/detailPartnerCamp/:campIdx'} element={<PartnerCampDetail/>}/>
            <Route path={'campRegister'} element={<CampRegisterCombined/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
  );
}

export default App;