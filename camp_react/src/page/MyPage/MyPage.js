import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MyInfo from './MyInfo'; // MyInfo 컴포넌트 경로에 맞게 수정
import FavoriteCampingList from './FavoriteCampingList'; // 찜한 캠핑장 컴포넌트 경로에 맞게 수정
import ReservationConfirmation from './ReservationConfirmation'; // 예약 확인 컴포넌트 경로에 맞게 수정
import MyTradePosts from './MyTradePosts'; // 내가 쓴 장터글 컴포넌트 경로에 맞게 수정
import PartnerApplication from './PartnerApplication'; // 파트너 회원 신청 컴포넌트 경로에 맞게 수정
import axios from "../layout/axios";
import PartnerApplicationComponent from "./PartnerApplicationComponent ";
import ManagerCampRegister from "./ManagerCampRegister";


function MyPage() {
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('내 정보');
  const [isUserApplicationVisible, setIsUserApplicationVisible] = useState('')
  const [isPartnerApplicationVisible, setIsPartnerApplicationVisible] = useState('');
  const [isAdminApplicationVisible, setIsAdminApplicationVisible] = useState('');
  // 컴포넌트가 마운트될 때 사용자 정보를 가져오도록 설정
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 사용자 정보 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/user-info");
      const userGrade = response.data.grade; // 사용자의 권한 등급
      console.log("사용자 등급:", userGrade); // 등급 콘솔 출력
      setUser(response.data);

      setIsUserApplicationVisible(userGrade === "user");
      setIsPartnerApplicationVisible(userGrade === "partner");
      setIsAdminApplicationVisible(userGrade === "admin");
    } catch (error) {
      console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
    }
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  let contentComponent;

  if (selectedMenu === '내 정보') {
    contentComponent = <MyInfo/>;
  } else if (selectedMenu === '찜한 캠핑장') {
    contentComponent = <FavoriteCampingList user={user}/>;
  } else if (selectedMenu === '예약 확인') {
    contentComponent = <ReservationConfirmation userInfo={user}/>;
  } else if (selectedMenu === '내가 쓴 장터글') {
    contentComponent = <MyTradePosts user={user}/>;
  } else if (selectedMenu === '파트너 회원 신청' && isUserApplicationVisible) {
    contentComponent = <PartnerApplication user={user}/>;
  } else if (selectedMenu === '캠핑장 등록' && isPartnerApplicationVisible) {
    contentComponent = <ManagerCampRegister user={user}/>;
  } else if (selectedMenu === '파트너 신청 목록' && isAdminApplicationVisible) {
    contentComponent = <PartnerApplicationComponent user={user}/>;
  } else {
    contentComponent = (
        <div className="container">
          <h1>에러</h1>
        </div>
    );
  }

  return (
      <main className="container-fluid mx-5 px-4">
        <div className="row mx-5 px-5">
          <div className="col-md-2 mx-5 p-0">
            <div className={'px-5'}>
              {/* 왼쪽 영역 */}
              <div className="my-5">
                <h4 className={"text-center"}>마이 페이지</h4>
                <ul className="list-group">
                  <li
                      className={`list-group-item ${selectedMenu === '내 정보' ? 'active' : ''}`}
                      onClick={() => handleMenuClick('내 정보')}
                  >
                    내 정보
                  </li>
                  <li
                      className={`list-group-item ${selectedMenu === '찜한 캠핑장' ? 'active' : ''}`}
                      onClick={() => handleMenuClick('찜한 캠핑장')}
                  >
                    찜한 캠핑장
                  </li>
                  <li
                      className={`list-group-item ${selectedMenu === '예약 확인' ? 'active' : ''}`}
                      onClick={() => handleMenuClick('예약 확인')}
                  >
                    예약 확인
                  </li>
                  <li
                      className={`list-group-item ${selectedMenu === '내가 쓴 장터글' ? 'active' : ''}`}
                      onClick={() => handleMenuClick('내가 쓴 장터글')}
                  >
                    내가 쓴 장터글
                  </li>
                  {isUserApplicationVisible && (
                      <li
                          className={`list-group-item ${selectedMenu === '파트너 회원 신청' ? 'active' : ''}`}
                          onClick={() => handleMenuClick('파트너 회원 신청')}
                      >
                        파트너 회원 신청
                      </li>
                  )}
                  {isPartnerApplicationVisible && (
                      <li
                          className={`list-group-item ${selectedMenu === '캠핑장 등록' ? 'active' : ''}`}
                          onClick={() => handleMenuClick('캠핑장 등록')}
                      >
                        캠핑장 등록
                      </li>
                  )}
                  {isAdminApplicationVisible && (
                      <li
                          className={`list-group-item ${selectedMenu === '파트너 신청 목록' ? 'active' : ''}`}
                          onClick={() => handleMenuClick('파트너 신청 목록')}
                      >
                        파트너 신청 목록
                      </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            {/* 오른쪽 영역 */}
            {selectedMenu === '내 정보' && <MyInfo/>}
            {selectedMenu === '찜한 캠핑장' && <FavoriteCampingList user={user}/>}
            {selectedMenu === '예약 확인' && <ReservationConfirmation userInfo={user}/>}
            {selectedMenu === '내가 쓴 장터글' && <MyTradePosts user={user}/>}
            {selectedMenu === '파트너 회원 신청' && isUserApplicationVisible && <PartnerApplication user={user}/>}
            {selectedMenu === '캠핑장 등록' && isPartnerApplicationVisible && <ManagerCampRegister user={user}/>}
            {selectedMenu === '파트너 신청 목록' && isAdminApplicationVisible && <PartnerApplicationComponent user={user}/>}
          </div>
        </div>
      </main>
  );
}

export default MyPage;



