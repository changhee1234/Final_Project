// 메인페이지 js파일(MainPage)
// 1)캐러셀 이미지 및 링크 2)공지사항 3)광고배너 4)캠핑장 리스트 5)장터 리스트
import React, {useState} from 'react';
import './mainPage.css';
import {hangjungdong} from "../layout/Hangjungdong";
import TradeListMain from "../trade/TradeListMain";
// import {selectBox} from "../layout/SelectBox"; // 전국 지역 select 박스(구/군까지 출력)

function MainPage(props) {

  // useEffect(() => {
  //   selectBox();
  //
  // }, []);

  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [setVal3] = useState("");
  const {sido, sigugun, dong} = hangjungdong;

  const Carousel = {
    height: "615px",
  }

  return (
      <main>
        <div id="myCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"
                    aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1"
                    aria-current="true" aria-label="Slide 2"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="4000">
              <img src="/assets/camp1.jpg" alt="img" className="d-block w-100" style={Carousel}></img>
              <div className="carousel-caption d-none d-md-block my-5">
                <h2 className={'highlight1'}>수하리 캠핑 파크</h2>
                <h4 className={'highlight2'}>강원 홍천군 서석면 행치령로 708</h4>
                <button type={'button'} className={'btn w-btn w-btn-indigo my-4'}>바로가기</button>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <img src="/assets/camp2.jpg" alt="img" className="d-block w-100" style={Carousel}></img>
              <div className="carousel-caption d-none d-md-block my-5">
                <h2 className={'highlight1'}>태양 힐링숲 글램핑&오토캠핑장</h2>
                <h4 className={'highlight2'}>경기 파주시 적성면 설마천로 376</h4>
                <button type={'button'} className={'btn w-btn w-btn-indigo my-4'}>바로가기</button>
              </div>
            </div>
          </div>
        </div>

        {/*캐러셀 이미지 이동*/}
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <img src="/assets/camp1.jpg" alt="img" className="d-block w-100" ></img></button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <img src="/assets/camp2.jpg" alt="img" className="d-block w-100"></img></button>

        {/*공지 및 광고배너*/}
        <div className={'container my-4 text-start'}>
          <div className={'row'}>
            <div className={'col-4'}>
              <ul className={'list-unstyled mx-4'}>
                <li><i className="bi bi-megaphone megaphone"></i><span className={'text1'}> 공지사항</span></li>
              </ul>
              <ul>
                <a href="#!" className={'text-decoration-none text-black'}>
                  <li><i className="bi bi-caret-right"></i><span className={'text2'}> 첫번째 공지사항입니다.</span></li>
                </a>
                <a href="#!" className={'text-decoration-none text-black'}>
                  <li><i className="bi bi-caret-right"></i><span className={'text2'}> 두번째 공지사항입니다.</span></li>
                </a>
              </ul>
            </div>
            <div className={'col-8 text-center'}>
              <img src="/assets/ad1.jpg" className={'ad'} alt="img"/>
            </div>
          </div>

          {/*캠핑장 리스트*/}
          <div className={'row my-4'}>
            <ul className={'row-col-2 list-unstyled text-start mb-0'}>
                <a href="#!" className={'text-decoration-none fw-bold text-dark'}>
                <li className={'mx-3'}><i className="col bi bi-rocket-takeoff rocket-takeoff"></i><span
                    className={'text1'}> 캠핑장</span>
                </li>
              </a>

              {/* 지역 설렉트 선택 버튼*/}
              <div className={'row my-3 mx-4 mt-1 mb-0'}>
                {/*  <select className={'col-2 mx-2'} name="sido1" id="sido1"></select>*/}
                {/*  <select className={'col-2 mx-2'} name="gugun1" id="gugun1"></select>*/}
                {/*  <select className={'col-2 mx-2'} name="dong1" id="dong1"></select>*/}
                <div>
                  {/*<h1>{`${val1}-${val2}-${val3}`}</h1>*/}
                  <select className={'sel'} onChange={(e) => setVal1(e.target.value)}>
                    <option value="">시/도</option>
                    {sido.map((el) => (
                        <option key={el.sido} value={el.sido}>
                          {el.codeNm}
                        </option>
                    ))}
                  </select>
                  <select className={'sel'} onChange={(e) => setVal2(e.target.value)}>
                    <option value="">구/군</option>
                    {sigugun
                        .filter((el) => el.sido === val1)
                        .map((el) => (
                            <option key={el.sigugun} value={el.sigugun}>
                              {el.codeNm}
                            </option>
                        ))}
                  </select>
                  <select className={'sel'} onChange={(e) => setVal3(e.target.value)}>
                    <option value="">동/면/읍</option>
                    {dong
                        .filter((el) => el.sido === val1 && el.sigugun === val2)
                        .map((el) => (
                            <option key={el.dong} value={el.dong}>
                              {el.codeNm}
                            </option>
                        ))}
                  </select>
                </div>
                <ul className={'col list-unstyled text-end mb-0 more'}>
                  <a href="#!!" className={'text-decoration-none fw-bold text-dark'}>
                    <li><i className="bi bi-pencil-square"></i><span className={'text2'}> 캠핑장 등록 및 광고문의</span></li>
                  </a>
                </ul>
              </div>
            </ul>

            {/*검색된 캠핑장 Card 리스트(map 구현 필요)*/}
            <div className={'row my-2 mx-4 mt-0'}>
              <div className="col-3 cardUi card my-2 mx-2">
                <img className="card-img" src="/assets/camp1.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">태양 힐링숲 글램핑&오토캠핑장</h5>
                  <p className="card-text">경기 파주시 적성면 설마천로 376</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>
                </div>
              </div>
              <div className="col-3 cardUi card my-2 mx-2">
                <img className="card-img" src="/assets/camp2.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">수하리 캠핑 파크</h5>
                  <p className="card-text">강원 홍천군 서석면 행치령로 708</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>

                </div>
              </div>
              <div className="col-3 cardUi card my-2 mx-2">
                <img className="card-img" src="/assets/camp1.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">태양 힐링숲 글램핑&오토캠핑장</h5>
                  <p className="card-text">경기 파주시 적성면 설마천로 376</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>

                </div>
              </div>
              <div className="col-3 cardUi card my-2 mx-2">
                <img className="card-img" src="/assets/camp2.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">수하리 캠핑 파크</h5>
                  <p className="card-text">강원 홍천군 서석면 행치령로 708</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>
                </div>
              </div>
              <div className="col-3 cardUi card my-2 mx-2">
                <img className="card-img" src="/assets/camp1.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">태양 힐링숲 글램핑&오토캠핑장</h5>
                  <p className="card-text">경기 파주시 적성면 설마천로 376</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>

                </div>
              </div>
              <div className="col-3 cardUi card my-2 mx-2">
                <img className="card-img" src="/assets/camp2.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">수하리 캠핑 파크</h5>
                  <p className="card-text">강원 홍천군 서석면 행치령로 708</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>

                </div>
              </div>
              <div className="col-3 cardUi card my-2 mx-2">
                <img className="card-img" src="/assets/camp1.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">태양 힐링숲 글램핑&오토캠핑장</h5>
                  <p className="card-text">경기 파주시 적성면 설마천로 376</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>

                </div>
              </div>
              <div className="col-3 cardUi card my-2 mx-2">
                <img className="card-img" src="/assets/camp2.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">수하리 캠핑 파크</h5>
                  <p className="card-text">강원 홍천군 서석면 행치령로 708</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>
                </div>
              </div>
            </div>
          </div>

          {/* ajax 페이징*/}
          <div className={'my-3'}>
            <ul className={'pagination justify-content-center'} id={'paginationAjax'}>
              <li className={'page-item disabled'}>
                <a href="#!" className={'page-link'}>&laquo;</a>
              </li>
              <li className={'page-item disabled'}>
                <a href="#!" className={'page-link'}>1</a>
              </li>
              <li className={'page-item disabled'}>
                <a href="#!" className={'page-link'}>&raquo;</a>
              </li>
            </ul>
          </div>

          {/*장터 리스트(이미지 업로드 외 구현 완료)*/}
          <div className={'row my-4'}>
            <ul className={'col list-unstyled text-start mb-2'}>
              <a href="#!" className={'text-decoration-none fw-bold text-dark'}>
                <li><i className="bi bi-cart4"></i><span className={'text1'}> 장터</span></li>
              </a>
            </ul>
            <ul className={'col list-unstyled text-end mb-0 more'}>
              <a href="trade" className={'text-decoration-none fw-bold text-dark'}>
                <li><i className="bi bi-plus"></i><span className={'text2'}>더보기</span></li>
              </a>
            </ul>
            {/*장터 목록페이지 컴포넌트(상단 제외)*/}
            <TradeListMain/>
          </div>
        </div>
      </main>
  )
}

export default MainPage;