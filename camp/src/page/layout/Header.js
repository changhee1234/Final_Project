import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "./axios";

function Header(props) {
    const [isVerified, setIsVerified] = useState(false);
    const [isOpened, setIsOpend] = useState(false);
    const [phone, setPhone] = useState("");
    const [userNum, setUserNum] = useState("");
    const [checkNum, setCheckNum] = useState("");
    const [showCheckIcon, setShowCheckIcon] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickName, setNickName] = useState("");
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [isEmailAvailable, setIsEmailAvailable] = useState(true);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [isCkeckNum, setIsCheckNum] = useState(false);
    const emailToSend = email;
    const passwordToSend = password;
    const nickNameToSend = nickName;
    const userNameToSend = userName;
    const phoneToSend = phone;


    const instance = axios.create({
        baseURL: 'http://localhost:8080', // 스프링 서버 URL
        withCredentials: true, // CORS 관련 설정
    });


    const logo = {
        height: "90px",
        width: "150px"
    }

    const headerBackgroundColor = {
        backgroundColor: "#ffdca4"
    }

    const handleSend = async () => {
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

    const handleEnterBtn = () => {
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

    // 회원가입 폼 제출 핸들러
    const handleSignUpSubmit = async (e) => {
        try {
            if (isCkeckNum && isEmailAvailable) { // 휴대전화 인증이 완료되었고 이메일 중복 검사가 완료된 경우에만 회원가입 가능
                e.preventDefault();
                setIsOpend(true);
                const formData = {
                    email: emailToSend,
                    password: passwordToSend,
                    nickName: nickNameToSend,
                    userName: userNameToSend,
                    phone: phoneToSend,
                };
                const params = new URLSearchParams();
                params.append("member", formData);

                // 회원가입 폼 데이터를 서버로 전송하는 로직
                const response = await axios.post("/member", null, {params: formData});

                // 회원가입 성공 시 로그인 모달창으로 전환
                setShowLoginModal(true); // 로그인 모달창 열기
                setShowJoinModal(false); // 회원가입 모달창 닫기
            }
        } catch (error) {
            console.error("회원가입 오류:", error);
        }
    };

    // 이메일 중복 체크
    const handleCheckEmail = async () => {
        try {
            setIsCheckingEmail(true); // 중복 검사 중임을 표시
            const response = await axios.get("http://localhost:8080/check-email", { params: { email } });
            const isAvailable = response.data.available;
            setIsEmailAvailable(isAvailable);
        } catch (error) {
            console.error("이메일 중복 검사 오류:", error);
        } finally {
            setIsCheckingEmail(false); // 중복 검사 완료 후 상태 업데이트
        }
    };

    const handleEmailChange = (e) => {
        // 이메일 입력 값이 변경될 때마다 이메일 중복 상태 초기화
        setEmail(e.target.value);
        setIsEmailAvailable(true);
    };

    // 컴포넌트가 마운트될 때 사용자 정보를 가져오도록 설정
    useEffect(() => {
        fetchUserInfo();
    }, []);

    // 사용자 정보 가져오는 함수
    const fetchUserInfo = async () => {
        try {
            const response = await axios.get("/user-info"); // Spring Security의 API endpoint
            setUser(response.data); // 사용자 정보 설정
        } catch (error) {
            console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
        }
    };

    // 로그아웃
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/logout'); // Spring Security의 로그아웃 엔드포인트 호출
            setUser(null); // 사용자 정보 초기화
            window.location.reload(); // 화면 새로고침
        } catch (error) {
            console.error('로그아웃 오류:', error);
        }
    };

    return (
        <header>
            <div className={'fixed-top shadow-sm container-fluid mb-3 border-bottom bg-light'}>
                <div className={'d-flex justify-content-end me-5'}>
                    <Link className={'me-3 text-decoration-none text-dark'} to={'/'}>
                        Home
                    </Link>
                    <Link className={'me-3 text-decoration-none text-dark'} to={'/announcementList'}>
                        공지사항
                    </Link>
                    {user ? (
                        <>
                            <span className={'me-3'}>{user.nickName}님</span>
                            <button className={'btn btn-link text-decoration-none text-dark'} onClick={handleLogout}>
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            <a className={'me-3 text-decoration-none text-dark'} data-bs-toggle={'modal'} data-bs-target={'#joinModal'}>
                                회원가입
                            </a>
                            <a className={'me-3 text-decoration-none text-dark'} data-bs-toggle={'modal'} data-bs-target={'#loginModal'}>
                                로그인
                            </a>
                        </>
                    )}
                    <Link className={'text-decoration-none text-dark'} to={'/about'}>
                        고객센터
                    </Link>
                </div>
                <nav className={"navbar navbar-expand-lg"}>
                    <div className={"navbar-brand ms-3"} style={logo}>
                        <Link to={'/'}>
                            <img src={'assets/camp_logo.png'} className={'img-fluid'}/>
                        </Link>
                    </div>
                    <div className={"collapse navbar-collapse"} id={"navbarNav"}>

                        <ul className={"navbar-nav"}>
                            <li className={"nav-item"}>
                                <Link className={"nav-link fs-4 me-4 ms-3"} to={'/'}>홈</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-4 me-4" to={'/camp'}>캠핑장</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-4 me-4" to={'/trade'}>장터</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-4" to={'/'}>날씨</Link>
                            </li>
                        </ul>

                    </div>
                    <form className="d-flex justify-content-end me-3" role="search">
                        <input className="form-control me-2" type="search" placeholder="검색어를 입력해주세요."
                               aria-label="Search"/>
                        <button className="btn btn-light btn-outline-dark" type="submit">Search</button>
                    </form>
                </nav>
            </div>
            {/*    회원가입 모달창*/}
                <div className={'modal fade'} id={'joinModal'} tabIndex={'-1'} aria-labelledby={'joinModalLabel'}
                     aria-hidden={'true'}>
                    <div className={'modal-dialog'}>
                        <div className={'modal-content'}>
                            <div className={'modal-header'}>
                                <h1 className={'modal-title fs-5'} id={'joinModalLabel'}>회원가입</h1>
                                <button type={'button'} className={'btn-close'} data-bs-dismiss={'modal'}
                                        aria-label={'Close'}></button>
                            </div>
                            <div className={'modal-body'}>
                                {/*로그인정보 입력*/}
                                <form action="/member" method="post">
                                    {/* 이메일 중복 체크 버튼 및 결과 출력 */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            이메일:
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="이메일을 입력하세요"
                                                value={email}
                                                onChange={handleEmailChange} // 입력 값이 변경될 때마다 호출
                                            />
                                            {/* 중복 검사 버튼 */}
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                id="send"
                                                onClick={handleCheckEmail}
                                                // disabled={isVerified || isCheckingEmail}
                                            >
                                                전송
                                            </button>
                                        </div>
                                        {/* 사용 가능 여부 문구 */}
                                        {isCheckingEmail ? (
                                            <span id="checkingEmail" className="text-muted">중복 검사 중...</span>
                                        ) : isEmailAvailable ? (
                                            <span id="availableEmail" className="text-success">사용 가능한 이메일입니다.</span>
                                        ) : (
                                            <span id="unavailableEmail" className="text-danger">이미 사용 중인 이메일입니다.</span>
                                        )}

                                    </div>
                                    {/*패스워드*/}
                                    <div className="my-3">
                                        <label htmlFor="user-password" className="form-label">
                                            Password :
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            id="user-password"
                                            placeholder="비밀번호를 입력해주세요"
                                            value={password}  // Add this line
                                            onChange={(e) => setPassword(e.target.value)}
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
                                            placeholder="닉네임을 입력해주세요"
                                            value={nickName}  // Add this line
                                            onChange={(e) => setNickName(e.target.value)}
                                        />
                                    </div>
                                    {/*실명*/}
                                    <div className="my-3">
                                        <label htmlFor="user-userName" className="form-label">
                                            실명 :
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="userName"
                                            id="user-userName"
                                            placeholder="실명을 입력해주세요"
                                            value={userName}  // Add this line
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
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
                                                    onClick={handleSend}
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
                                                    onClick={handleEnterBtn}
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
                                                type="submit"
                                                className="btn btn-dark"
                                                id="signupBtn"
                                                disabled={!isCkeckNum || !isEmailAvailable}
                                                onClick={handleSignUpSubmit}
                                                data-bs-toggle={'modal'}
                                                data-bs-target={'#loginModal'}
                                            >
                                                회원가입
                                            </button>
                                            <button type="button" className="btn btn-secondary" id="btn-cancel" data-bs-dismiss={'modal'}>
                                                가입취소
                                            </button>
                                            {/*<input type="hidden" name="_csrf" value="CSRF 토큰 값"/>*/}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            {/*    로그인 모달*/}
                <div className={'modal fade'} id={'loginModal'} tabIndex={'-1'} aria-labelledby={'loginModalLabel'}
                     aria-hidden={'true'}>
                    <div className={'modal-dialog'}>
                        <div className={'modal-content'}>
                            <div className={'modal-header'}>
                                <h1 className={'modal-title fs-5'} id={'loginModalLabel'}>회원가입</h1>
                                <button type={'button'} className={'btn-close'} data-bs-dismiss={'modal'}
                                        aria-label={'Close'}></button>
                            </div>
                            <div className={'modal-body'}>
                                {/*로그인정보 입력*/}
                                <form action="/login" method="post">
                                <div className={'border-bottom'}>
                                    <div className={'input-group my-2'}>
                                        <span className={'input-group-text'}>Email</span>
                                        <input
                                            type={'text'}
                                            id="username"
                                            name="username"
                                            className={'form-control'}
                                            placeholder={'Email을 입력해주세요'}
                                        />
                                    </div>
                                    <div className={'input-group mb-4'}>
                                        <span className={'input-group-text'}>비밀번호</span>
                                        <input
                                            type={'password'}
                                            id="password"
                                            name="password"
                                            className={'form-control'}
                                            placeholder={'비밀번호를 입력하세요'}
                                        />
                                    </div>
                                </div>

                                {/*로그인 버튼*/}
                                <div className={'d-grid my-3'}>
                                    <button type={'submit'} className={'btn btn-primary'}>로그인</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </header>
    );
}

export default Header;