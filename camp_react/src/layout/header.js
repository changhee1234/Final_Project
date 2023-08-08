import React from "react";
import {Link} from "react-router-dom";

function Header(props) {

    const logo = {
        height: "90px",
        width: "150px"
    }

    const headerBackgroundColor = {
        backgroundColor: "#ffdca4"
    }

    return (
        <header className={"container-fluid mb-3 border-bottom bg-light"}>
            <div className={'d-flex justify-content-end me-5'}>
                <Link className={'me-3 text-decoration-none text-dark'} to={'/'}>Home</Link>
                <Link className={'me-3 text-decoration-none text-dark'} to={'/announcementList'}>공지사항</Link>
                <a className={'me-3 text-decoration-none text-dark'} data-bs-toggle={'modal'}
                   data-bs-target={'#joinModal'}>회원가입</a>
                <a className={'me-3 text-decoration-none text-dark'} data-bs-toggle={'modal'}
                   data-bs-target={'#loginModal'}>로그인</a>
                <Link className={'text-decoration-none text-dark'} to={'/about'}>고객센터</Link>
            </div>
            <nav className={"navbar navbar-expand-lg"}>
                <div className={"navbar-brand ms-3"} style={logo}>
                    <Link to={'/'}>
                        <img src={'campImg/camp_logo.png'} className={'img-fluid'}/>
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
                    <input className="form-control me-2" type="search" placeholder="검색어를 입력해주세요." aria-label="Search"/>
                    <button className="btn btn-light btn-outline-dark" type="submit">Search</button>
                </form>
            </nav>

            {/*    회원가입 모달창*/}
            <div className={'modal fade'} id={'joinModal'} tabindex={'-1'} aria-labelledby={'joinModalLabel'}
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
                            <div className={'border-bottom'}>
                                <div className={'input-group my-2'}>
                                    <span className={'input-group-text'}>Email</span>
                                    <input type={'text'} className={'form-control'}/>
                                    <span className={'input-group-text'}>@</span>
                                    <select className={'form-select'}>
                                        <option selected disabled={'true'}>Email을 선택해주세요</option>
                                        <option value={'naver.com'}>naver.com</option>
                                        <option value={'nate.com'}>nate.com</option>
                                        <option value={'daum.net'}>daum.net</option>
                                        <option value={'google.com'}>google.com</option>
                                    </select>
                                </div>
                                <div className={'input-group mb-4'}>
                                    <span className={'input-group-text'}>비밀번호</span>
                                    <input type={'password'} className={'form-control'} placeholder={'비밀번호를 입력하세요'}/>
                                </div>
                            </div>
                            {/*인적사항 입력*/}
                            <div className={'mt-4'}>
                                <div className={'input-group my-2'}>
                                    <span className={'input-group-text'}>이름</span>
                                    <input type={'text'} className={'form-control'} placeholder={'이름을 입력하세요'}/>
                                </div>
                                <div className={'input-group my-2'}>
                                    <span className={'input-group-text'}>전화번호</span>
                                    <input type={'text'} className={'form-control'} placeholder={'010'}/>
                                    <span className={'input-group-text'}>-</span>
                                    <input type={'text'} className={'form-control'}/>
                                    <span className={'input-group-text'}>-</span>
                                    <input type={'text'} className={'form-control'}/>
                                </div>
                                <div className={'input-group my-2'}>
                                    <span className={'input-group-text'}>닉네임</span>
                                    <input type={'text'} className={'form-control'} placeholder={'닉네임을 입력하세요'}/>
                                </div>
                            </div>
                            {/*회원가입, 구글연동 버튼*/}
                            <div className={'d-grid my-3'}>
                                <button type={'submit'} className={'btn btn-success my-2'}>회원가입</button>
                                <button type={'button'} className={'btn btn-outline-danger'}>구글연동</button>
                            </div>
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
                            <div className={'border-bottom'}>
                                <div className={'input-group my-2'}>
                                    <span className={'input-group-text'}>Email</span>
                                    <input type={'text'} className={'form-control'} placeholder={'Email을 입력해주세요'}/>
                                </div>
                                <div className={'input-group mb-4'}>
                                    <span className={'input-group-text'}>비밀번호</span>
                                    <input type={'password'} className={'form-control'} placeholder={'비밀번호를 입력하세요'}/>
                                </div>
                            </div>
                            
                            {/*로그인 버튼*/}
                            <div className={'d-grid my-3'}>
                                <button type={'submit'} className={'btn btn-primary'}>로그인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;