import React from 'react';
import { useLocation } from 'react-router-dom';

function MyPage(props) {
    const location = useLocation();
    const user = location.state.user;

    return (
        <div>
            <h2>마이페이지</h2>
            <p>사용자 닉네임: {user.nickName}</p>
            {/* 마이페이지에서 사용자 정보를 더 추가할 수 있음 */}
        </div>
    );
}

export default MyPage;