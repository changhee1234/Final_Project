import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MyInfo from './MyInfo'; // MyInfo 컴포넌트 경로에 맞게 수정
import FavoriteCampingList from './FavoriteCampingList'; // 찜한 캠핑장 컴포넌트 경로에 맞게 수정
import ReservationConfirmation from './ReservationConfirmation'; // 예약 확인 컴포넌트 경로에 맞게 수정
import MyTradePosts from './MyTradePosts'; // 내가 쓴 장터글 컴포넌트 경로에 맞게 수정
import PartnerApplication from './PartnerApplication'; // 파트너 회원 신청 컴포넌트 경로에 맞게 수정
import axios from "../layout/axios";


function MyPage() {
    const [user, setUser] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('내 정보');

    // 컴포넌트가 마운트될 때 사용자 정보를 가져오도록 설정
    useEffect(() => {
        fetchUserInfo();
    }, []);

    // 사용자 정보 가져오는 함수
    const fetchUserInfo = async () => {
        try {
            const response = await axios.get("/user-info"); // Spring Security의 API endpoint
            setUser(response.data); // 사용자 정보 설정
            console.log(user)
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
        contentComponent = <FavoriteCampingList/>;
    } else if (selectedMenu === '예약 확인') {
        contentComponent = <ReservationConfirmation/>;
    } else if (selectedMenu === '내가 쓴 장터글') {
        contentComponent = <MyTradePosts/>;
    } else if (selectedMenu === '파트너 회원 신청') {
        contentComponent = <PartnerApplication/>;
    } else {
        contentComponent = (
            <div className="container">
                {/* ... */}
            </div>
        );
    }


    return (
        <main className="container my-5">
            <div className="row my-5">
                <div className="col-md-3 my-5">
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
                                <li
                                    className={`list-group-item ${selectedMenu === '파트너 회원 신청' ? 'active' : ''}`}
                                    onClick={() => handleMenuClick('파트너 회원 신청')}
                                >
                                    파트너 회원 신청
                                </li>
                            </ul>
                        </div>
                </div>
                <div className="col-md-1">

                </div>
                <div className="col-md-8">
                    {/* 오른쪽 영역 */}
                    {contentComponent}
                </div>
            </div>
        </main>
    );
}

export default MyPage;



