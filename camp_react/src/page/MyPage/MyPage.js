import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MyInfo from './MyInfo'; // MyInfo 컴포넌트 경로에 맞게 수정
import FavoriteCampingList from './FavoriteCampingList'; // 찜한 캠핑장 컴포넌트 경로에 맞게 수정
import ReservationConfirmation from './ReservationConfirmation'; // 예약 확인 컴포넌트 경로에 맞게 수정
import MyTradePosts from './MyTradePosts'; // 내가 쓴 장터글 컴포넌트 경로에 맞게 수정
import PartnerApplication from './PartnerApplication'; // 파트너 회원 신청 컴포넌트 경로에 맞게 수정
import axios from "../layout/axios";
import PartnerApplicationComponent from "./PartnerApplicationComponent ";


function MyPage() {
    const [user, setUser] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('내 정보');
    const [isPartnerApplicationVisible, setIsPartnerApplicationVisible] = useState(false);
    // 컴포넌트가 마운트될 때 사용자 정보를 가져오도록 설정
    useEffect(() => {
        fetchUserInfo();
    }, []);

    // 사용자 정보 가져오는 함수
    const fetchUserInfo = async () => {
        try {
            const response = await axios.get("/user-info"); // Spring Security의 API endpoint
            setUser(response.data); // 사용자 정보 설정
            setIsPartnerApplicationVisible(response.data.grade === "admin"); // 파트너 신청 가능 여부 설정
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
    } else if (selectedMenu === '파트너 회원 신청') {
        contentComponent = <PartnerApplication user={user}/>;
    } else {
        contentComponent = (
            <div className="container">

            </div>
        );
    }


    return (
        <main className="container">
            <div className="row">
                <div className="col-md-2">
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
                                {isPartnerApplicationVisible && (
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

                <div className="col-md-10">
                    {/* 오른쪽 영역 */}
                    {contentComponent }
                    {selectedMenu === '파트너 신청 목록' && isPartnerApplicationVisible && <PartnerApplicationComponent user={user} />}
                </div>
            </div>
        </main>
    );
}

export default MyPage;



