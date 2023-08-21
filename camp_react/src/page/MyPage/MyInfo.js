import React, {useEffect, useState} from 'react';
import ProfileImage from './job4.jpg'; // 프로필 이미지 경로에 맞게 수정
import './MyInfo.css'
import {useParams} from "react-router-dom";
import axios from "../layout/axios";

function MyInfo(props) {
    const {nickname} = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickName, setNickName] = useState("");
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('내 정보');

    // 컴포넌트가 마운트될 때 사용자 정보를 가져오도록 설정
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/user-info"); // Spring Security의 API endpoint
                setUser(response.data); // 사용자 정보 설정
                console.log(response.data); // 사용자 정보를 받아와서 출력
            } catch (error) {
                console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
            }
        };

        fetchData(); // fetchData를 실행하여 사용자 정보를 가져오도록 함
    }, []);
    return (
        <div className="my-info my-5">
            <h2 className={"text-start mt-5"}>내 정보</h2>
            <div className="profile-image">
                <img src={ProfileImage} alt="프로필 사진" />
            </div>
            <div>
                <div className="info-details">
                    <div className="info-card">
                        <div className="info-header">
                            <h4 className="ms-2 mt-2">닉네임</h4>
                        </div>
                        <p className="email ms-2">이메일</p>
                        <hr />
                        <div className="info-body my-3">
                            <p className="ms-2">실명</p>
                            <p>전화번호</p>
                            <p>회원등급</p>
                        </div>
                        <div className="info-footer">
                            <button className="btn btn-primary">회원 정보 수정</button>
                            <button className="btn btn-danger">회원 탈퇴</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyInfo;
