import React from "react";
import {Link} from "react-router-dom";

function Header(props) {

    const logo = {
        height: "90px",
        width:"150px"
    }

    const headerBackgroundColor = {
        backgroundColor: "#ffdca4"
    }


    return (
        <header className={"container-fluid my-3 border-bottom"}>
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
                    <Link className={'navbar-brand'} to={'/'}>
                        <img src={'campImg/camp_logo.png'} className={'img-fluid'}/>
                    </Link>
                </div>
                <div className={"collapse navbar-collapse"} id={"navbarNav"}>

                    <ul className={"navbar-nav"}>
                        <li className={"nav-item"}>
                            <Link className={"nav-link fs-4 me-4 ms-3"} to={'/'}>전체</Link>
                        </li>
                        <li className={"nav-item"}>
                            <Link className={"nav-link fs-4 me-4"} to={'/camp'}>캠핑장</Link>
                        </li>
                        <li className={"nav-item"}>
                            <Link className={"nav-link fs-4 me-4"} to={'/trade'}>장터</Link>
                        </li>
                        <li className={"nav-item"}>
                            <a className={"nav-link fs-4"} href={"#"}>날씨</a>
                        </li>
                    </ul>

                </div>
                <form className={"d-flex justify-content-end me-3"} role={"search"}>
                    <input className={"form-control me-2"} type={"search"} placeholder={"검색어를 입력해주세요."}
                           aria-label={"Search"}/>
                    <button className={"btn btn-light btn-outline-dark"} type={"submit"}>Search</button>
                </form>
            </nav>

            {/*    회원가입 모달창*/}
            <div className={'modal fade'} id={'joinModal'} data-bs-backdrop={'static'} data-bs-keyboard={'false'}
                 tabindex={'-1'} aria-labelledby={'joinModal'} aria-hidden={'true'}>
                <div className={'modal-dialog'}>
                    <div className={'modal-content'}>
                        <div className={'modal-header'}>
                            <h1 className={'modal-title fs-5'}>회원가입</h1>
                            <button type={'button'} className={'btn-close'} data-bs-dismiss={'modal'}
                                    aria-label={'Close'}></button>
                        </div>
                        <div className={'modal-body'}>
                            {/*로그인 정보 인풋*/}
                            <div className={'input-group my-2'}>
                                <span className={'input-group-text'} id={'email'}>이메일</span>
                                <input type={'text'} className={'form-control'} aria-label={'email'}/>
                                <span className={'input-group-text'}>@</span>
                                <select className={'form-select'} id={'emailSelect'}>
                                    <option selected>이메일을 입력해주세요</option>
                                    <option value={'naver.com'}>naver.com</option>
                                    <option value={'daum.net'}>daum.net</option>
                                    <option value={'nate.com'}>nate.com</option>
                                    <option value={'google.com'}>google.com</option>
                                </select>
                            </div>
                            {/*인적사항 인풋*/}
                            <div className={'input-group my-2 mb-4'}>
                                <span className={'input-group-text'} id={'password'}>비밀번호</span>
                                <input type={'password'} className={'form-control'} aria-label={'password'}/>
                            </div>
                            <div className={'border'}></div>
                            <div className={'mt-4'}>
                                <div className={'input-group my-2'}>
                                    <span className={'input-group-text'} id={'name'}>이름</span>
                                    <input type={'text'} className={'form-control'} aria-label={'name'}/>
                                </div>
                                <div className={'input-group my-2'}>
                                    <span className={'input-group-text'} id={'nick'}>별명</span>
                                    <input type={'text'} className={'form-control'} aria-label={'nick'}/>
                                </div>
                                <div className={'input-group my-2'}>
                                    <span className={'input-group-text'} id={'phone'}>전화번호</span>
                                    <input type={'text'} className={'form-control'} aria-label={'phone'}/>
                                    <span className={'input-group-text'}>-</span>
                                    <input type={'text'} className={'form-control'} aria-label={'phone'}/>
                                    <span className={'input-group-text'}>-</span>
                                    <input type={'text'} className={'form-control'} aria-label={'phone'}/>
                                </div>
                            </div>
                            <div className={'mt-4 mb-2 d-grid'}>
                                <button type={'button'} className={'btn btn-primary mb-2'}>회원가입</button>
                                <button type={'button'} className={'btn btn-light btn-outline-danger text-dark'}>구글연동
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*    로그인 모달*/}
            <div className={'modal fade'} id={'loginModal'} data-bs-backdrop={'static'} data-bs-keyboard={'false'}
                 tabIndex={'-1'} aria-labelledby={'loginModal'} aria-hidden={'true'}>
                <div className={'modal-dialog'}>
                    <div className={'modal-content'}>
                        <div className={'modal-header'}>
                            <h1 className={'modal-title fs-5'}>로그인</h1>
                            <button type={'button'} className={'btn-close'} data-bs-dismiss={'modal'}
                                    aria-label={'Close'}></button>
                        </div>
                        <div className={'modal-body'}>
                            <div className={'input-group my-2'}>
                                <span className={'input-group-text'} id={'email'}>이메일</span>
                                <input type={'text'} className={'form-control'} aria-label={'email'}/>
                            </div>
                            <div className={'input-group my-2 mb-4'}>
                                <span className={'input-group-text'} id={'password'}>비밀번호</span>
                                <input type={'password'} className={'form-control'} aria-label={'password'}/>
                            </div>
                            <div className={'mt-4 mb-2 d-grid'}>
                                <button type={'button'} className={'btn btn-primary mb-2'}>로그인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;