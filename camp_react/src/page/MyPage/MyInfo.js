import ProfileImage from './images.png'; // 프로필 이미지 경로에 맞게 수정
import './MyInfo.css'
import {useParams} from "react-router-dom";
import axios from "../layout/axios";
import Modal from 'react-bootstrap/Modal'; // Modal 컴포넌트 import 추가
import Button from 'react-bootstrap/Button'; // Button 컴포넌트 import 추가
import {CameraFill} from 'react-bootstrap-icons';
import {useEffect, useState} from "react";

function formatPhoneNumber(phoneNumber) {
    const digits = phoneNumber.replace(/\D/g, "");
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function MyInfo(props) {

    const {nickname} = useParams();
    const [user, setUser] = useState(null);
    const [isOpened, setIsOpend] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [nickName, setNickName] = useState("");
    const [realName, setRealName] = useState("");
    const [phone, setPhone] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [checkNum, setCheckNum] = useState("");
    const [showCheckIcon, setShowCheckIcon] = useState(false);
    const [userNum, setUserNum] = useState("");
    const [isCkeckNum, setIsCheckNum] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const emailToSend = email;
    const passwordToSend = password;
    const nickNameToSend = nickName;
    const realNameToSend = realName;
    const phoneToSend = phone;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/user-info");
                setUser(response.data);
            } catch (error) {
                console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
            }
        };

        fetchData(); // fetchData를 실행하여 사용자 정보를 가져오도록 함
    }, []);

    const handleEditProfile = () => {
        setShowModal(true); // 모달 창 열기
    };

    const handleCloseModal = () => {
        setShowModal(false); // 모달 창 닫기
    };

    const handleModifySubmit = async (e) => {
        try {
            e.preventDefault();
            setIsOpend(true);
            setEmail(user?.email);

            if (password === password2) {
                setPasswordMatch(true); // 비밀번호가 일치할 때

                const formData = {
                    email: emailToSend,
                    password: passwordToSend,
                    nickName: nickNameToSend,
                    realName: realNameToSend,
                    phone: phoneToSend,
                };

                const response = await axios.post("/modify", formData);
                // 마이페이지 새로고침
                window.location.reload();
            } else {
                setPasswordMatch(false); // 비밀번호가 일치하지 않을 때
                // ... 나머지 로직
            }
        } catch (error) {
            console.error("정보수정 오류:", error);
        }
    };
    const handleSend2 = async () => {
        // 서버로 보낼 휴대폰 번호
        try {
            // axios 통신 시 파라미터값 전달할때 주의해야할 부분
            const params = new URLSearchParams();
            params.append("phone", phoneToSend);

            // axios를 사용하여 서버에 POST 요청 보내기
            const response = await axios.post("/sms", null, {params: params});

            // 서버로부터 받은 인증번호를 checkNum 상태에 업데이트
            setCheckNum(response.data);

            // 버튼 및 입력 필드 활성/비활성화 처리
            setIsVerified(true); // 인증 성공 여부 업데이트
            setShowCheckIcon(false); // 휴대전화 인증 완료 시 아이콘 표시
        } catch (error) {
            console.error("휴대폰 번호 인증 오류:", error);
        }
    };


    const handleEnterBtn2 = () => {
        // userNum을 숫자로 변환
        const numericUserNum = parseInt(userNum);

        if (checkNum === numericUserNum) {
            // 인증번호 일치
            setIsCheckNum(true);
            setShowCheckIcon(true);
        } else {
            // 인증번호 불일치
            setShowCheckIcon(false);
        }
    };

    const handleImageUpload = async () => {
        try {
            console.log("handleImageUpload called");
            const formData = new FormData();
            formData.append('image', selectedImage);

            const response = await axios.post('/upload-profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUser({...user, profileImg: response.data});

            // 이미지 업로드 후 저장 버튼 감추기
            setShowUploadForm(false);
        } catch (error) {
            console.error('프로필 사진 업로드 실패', error);
        }
    };

    // 등급을 텍스트로 변환하는 함수
    const getGradeText = (grade) => {
        switch (grade) {
            case "user":
                return "일반 등급 입니다";
            case "partner":
                return "파트너 등급 입니다";
            case "admin":
                return "관리자 등급 입니다";
            default:
                return "";
        }
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
        setShowUploadForm(true); // 이미지 선택 시 저장 버튼 표시
    };

    const handleDeleteAccount = () => {
        const confirmDelete = window.confirm("정말 회원 탈퇴하시겠습니까?");

        if (confirmDelete) {
            axios
                .post('/delete-account', null, {
                    params: { email: user.email }
                })
                .then(response => {
                    // 회원 탈퇴 성공 시 로그아웃 또는 다른 처리 수행
                    alert(response.data);
                    window.location.href = 'http://localhost:3000';
                })
                .catch(error => {
                    console.error('회원 탈퇴 오류', error);
                });
        }
    };



    return (
        <div className="my-info my-5">
            <h3 className="text-start mt-5">내 정보</h3>
            <div className="profile-image">
                <label htmlFor="image-upload">
                    <img
                        src={user?.profileImg || ProfileImage}
                        alt="프로필 사진"
                    />
                </label>

            </div>
            <input
                type="file"
                accept="image/*"
                id="image-upload"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
                <div>
                    {showUploadForm && (
                        <button className="btn btn-primary my-3" onClick={handleImageUpload}>
                            사진 저장
                        </button>
                    )}
                </div>
            <div>
                <div className="info-details">
                    <div className="info-card">
                        <div className="info-header">
                            {user && <h4 className="ms-2 mt-2">{user.nickName}</h4>}
                        </div>
                        <p className="email ms-2">{user?.email}</p>
                        <hr/>
                        <div className="info-body my-3">
                            <p className="info-label">이름</p>
                            <p className="ms-2 info-value">{user?.realName}</p>
                            <p className="info-label">전화번호</p>
                            <p className="ms-2 info-value">{user && formatPhoneNumber(user.phone)}</p>
                            <p className="info-label">회원등급</p>
                            <p className="ms-2 info-value">{user && getGradeText(user.grade)}</p>
                        </div>
                        <div className="info-footer">
                            <button
                                type="button"
                                className="btn btn-dark"
                                id="signupBtn"
                                onClick={handleEditProfile}
                            >
                                정보 수정
                            </button>
                            <button className="btn btn-danger" onClick={handleDeleteAccount}>회원 탈퇴</button>
                        </div>
                    </div>
                    {/* 회원 정보 수정 모달 */}
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>회원 정보 수정</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* 회원 정보 수정 폼 */}
                            <form action="/modify" method="post">
                                <div className="my-3">
                                    <label htmlFor="user-realName" className="form-label">
                                        실명 :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="realName"
                                        id="user-realName"
                                        placeholder="실명을 입력해주세요"
                                        value={realName}  // Add this line
                                        onChange={(e) => setRealName(e.target.value)}
                                    />
                                </div>
                                {/*닉네임*/}
                                <div className="my-3">
                                    <label htmlFor="user-nickName" className="form-label">
                                        닉네임 :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nickName"
                                        id="user-nickName"
                                        placeholder="변경할 닉네임을 입력해주세요"
                                        value={nickName}  // Add this line
                                        onChange={(e) => setNickName(e.target.value)}
                                    />
                                </div>
                                {/*패스워드*/}
                                <div className="my-3">
                                    <label htmlFor="user-password1" className="form-label">
                                        확인용 비밀번호 :
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password1"
                                        id="user-password1"
                                        placeholder="변경할 비밀번호를 입력해주세요"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="user-password2" className="form-label">
                                        확인용 비밀번호 :
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password2"
                                        id="user-password2"
                                        placeholder="비밀번호를 한번 더 입력해주세요"
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                    />
                                    {/* 비밀번호 일치 여부에 따른 메시지 출력 */}
                                    {password === password2 ? (
                                        <p className="text-success">비밀번호가 일치합니다</p>
                                    ) : (
                                        <p className="text-danger">비밀번호가 다릅니다</p>
                                    )}
                                </div>

                                {/*전화번호*/}
                                <div id="contents">
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            휴대전화 :
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                className="form-control"
                                                placeholder="휴대전화 번호를 입력하세요"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                id="send"
                                                onClick={handleSend2}
                                                disabled={isVerified}
                                            >
                                                전송
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="userNum" className="form-label">
                                            인증번호 :
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="userNum"
                                                name="userNum"
                                                className="form-control"
                                                value={userNum}
                                                onChange={(e) => setUserNum(e.target.value)}
                                                placeholder="인증번호를 입력하세요"
                                                disabled={!isVerified}
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                id="enterBtn"
                                                onClick={handleEnterBtn2}
                                                disabled={!isVerified}
                                            >
                                                확인
                                            </button>
                                        </div>
                                        {showCheckIcon && (
                                            <span id="checkIcon" className="text-success">인증 완료</span>
                                        )}
                                    </div>
                                    {/* 나머지 회원가입 입력 필드들도 유사한 형태로 추가할 수 있습니다. */}
                                    <div className="my-3 d-grid gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            id="signupBtn"
                                            onClick={handleModifySubmit}
                                        >
                                            저장
                                        </button>
                                        <button type="button" className="btn btn-secondary" id="btn-cancel"
                                                data-bs-dismiss={'modal'}>
                                            취소
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                취소
                            </Button>
                            <Button variant="primary">
                                저장
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default MyInfo;
