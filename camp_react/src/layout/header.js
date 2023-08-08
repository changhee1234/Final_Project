import React from "react";

function Header(props) {

    const logo = {
        height: "60px",
        width: "100px",
        backgroundColor: "#000000"
    }

    const headerBackgroundColor = {
        backgroundColor: "#ffdca4"
    }

    return (
        <header className={"container-fluid mb-3 border-bottom"} style={headerBackgroundColor}>
            <div className={'d-flex justify-content-end me-5'}>
                <a className={'me-3 text-decoration-none text-dark'}>Home</a>
                <a className={'me-3 text-decoration-none text-dark'}>공지사항</a>
                <a className={'me-3 text-decoration-none text-dark'}>회원가입</a>
                <a className={'me-3 text-decoration-none text-dark'}>로그인</a>
                <a className={'text-decoration-none text-dark'}>고객센터</a>
            </div>
            <nav className={"navbar navbar-expand-lg"}>
                <div className={"navbar-brand ms-3"} style={logo}><a></a></div>
                <div className={"collapse navbar-collapse"} id={"navbarNav"}>

                    <ul className={"navbar-nav"}>
                        <li className={"nav-item"}>
                            <a className={"nav-link fs-4 me-4 ms-3"} href={"#"}>전체</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fs-4 me-4" href="#">캠핑장</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fs-4 me-4" href="#">장터</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fs-4" href="#">날씨</a>
                        </li>
                    </ul>

                </div>
                <form className="d-flex justify-content-end me-3" role="search">
                    <input className="form-control me-2" type="search" placeholder="검색어를 입력해주세요." aria-label="Search"/>
                    <button className="btn btn-light btn-outline-dark" type="submit">Search</button>
                </form>
            </nav>

        </header>
    );
}

export default Header;