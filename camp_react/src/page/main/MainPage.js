import React, {useState} from 'react';
import './mainPage.css';
// import {selectBox} from "../layout/SelectBox";
import {hangjungdong} from "../layout/Hangjungdong";

function MainPage(props) {

  // useEffect(() => {
  //   selectBox();
  //
  // }, []);

  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [setVal3] = useState("");
  const {sido, sigugun, dong} = hangjungdong;

  return (
      <main>
        <div id="mycarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="1"></button>
            {/*<button type="button" data-bs-target="#mycarousel" data-bs-slide-to="2"></button>*/}
            {/*<button type="button" data-bs-target="#mycarousel" data-bs-slide-to="3"></button>*/}
            {/*<button type="button" data-bs-target="#mycarousel" data-bs-slide-to="4"></button>*/}
            {/*<button type="button" data-bs-target="#mycarousel" data-bs-slide-to="5"></button>*/}
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="4000">
              <img src="/assets/camp1.jpg" alt="img" className="d-block w-100"></img>
              <div className="carousel-caption d-none d-md-block">
                <h2 className={'highlight1'}>수하리 캠핑 파크</h2>
                <h4 className={'highlight2'}>강원 홍천군 서석면 행치령로 708</h4>
                <button type={'button'} className={'btn w-btn w-btn-indigo my-4'}>바로가기</button>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <img src="/assets/camp2.jpg" alt="img" className="d-block w-100"></img>
              <div className="carousel-caption d-none d-md-block">
                <h2 className={'highlight1 '}>태양 힐링숲 글램핑&오토캠핑장</h2>
                <h4 className={'highlight2'}>경기 파주시 적성면 설마천로 376</h4>
                <button type={'button'} className={'btn w-btn w-btn-indigo my-4'}>바로가기</button>
              </div>
            </div>
          </div>
        </div>

        {/*캐러셀 이미지 이동*/}
        <button className="carousel-control-prev" type="button" data-bs-target="#!mycarousel" data-bs-slide="prev">
          <img src="/assets/camp1.jpg" alt="img" className="d-block w-100"></img></button>
        <button className="carousel-control-next" type="button" data-bs-target="#!mycarousel" data-bs-slide="next">
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
                <li className={'mx-3'}><i className="col bi bi-rocket-takeoff rocket-takeoff"></i><span className={'text1'}> 캠핑장</span>
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

            {/*검색된 캠핑장 Card 리스트*/}
            <div className={'row my-2 mx-4 mt-0'}>
              <div className="col-3 card my-2 mx-2">
                <img className="card-img" src="/assets/camp1.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">태양 힐링숲 글램핑&오토캠핑장</h5>
                  <p className="card-text">경기 파주시 적성면 설마천로 376</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>
                </div>
              </div>
              <div className="col-3 card my-2 mx-2">
                <img className="card-img" src="/assets/camp2.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">수하리 캠핑 파크</h5>
                  <p className="card-text">강원 홍천군 서석면 행치령로 708</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>

                </div>
              </div>
              <div className="col-3 card my-2 mx-2">
                <img className="card-img" src="/assets/camp1.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">태양 힐링숲 글램핑&오토캠핑장</h5>
                  <p className="card-text">경기 파주시 적성면 설마천로 376</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>

                </div>
              </div>
              <div className="col-3 card my-2 mx-2">
                <img className="card-img" src="/assets/camp2.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">수하리 캠핑 파크</h5>
                  <p className="card-text">강원 홍천군 서석면 행치령로 708</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>
                </div>
              </div>
              <div className="col-3 card my-2 mx-2">
                <img className="card-img" src="/assets/camp1.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">태양 힐링숲 글램핑&오토캠핑장</h5>
                  <p className="card-text">경기 파주시 적성면 설마천로 376</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>

                </div>
              </div>
              <div className="col-3 card my-2 mx-2">
                <img className="card-img" src="/assets/camp2.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">수하리 캠핑 파크</h5>
                  <p className="card-text">강원 홍천군 서석면 행치령로 708</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>

                </div>
              </div>
              <div className="col-3 card my-2 mx-2">
                <img className="card-img" src="/assets/camp1.jpg" alt="img"></img>
                <div className="card-body">
                  <h5 className="card-title fw-bold">태양 힐링숲 글램핑&오토캠핑장</h5>
                  <p className="card-text">경기 파주시 적성면 설마천로 376</p>
                </div>
                <div className="card-body text-end">
                  <a href="#!" className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</a>

                </div>
              </div>
              <div className="col-3 card my-2 mx-2">
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


          {/*장터 리스트*/}
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
            <div className="row mx-0 mt-0">
              <div className="product col-3 box1">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img" alt="img"/></div>
                <a href="tradeDetail" className={'text-decoration-none'}><h5 className="product_title1"> 캠핑용 프로젝트 팝니다</h5></a>
                <div className="product_mon"> 가격: 25,000￦</div>
                <a href={'tradeDetail'} className="product_des text-decoration-none"> 캠핑용품 정리하다가 불용품 발견되어 장터에 내놓습니다.초기에 몇번 들고 나가고
                  거의 사용하지
                  않았구요..사진에 보시듯 제조일은 2016년인데... 사용시간은 47시간입니다.외관은 거의 새것처럼 깨끗합니다. 기스도 거의 없는 상태에요..</a>
                <div className={'row my-2'}>
                  <div className={'row col-6 text-start'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-person"></i><span>홍길동</span></li>
                    </ul>
                  </div>
                  <div className={'row col-5 p-0 text-end'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-alarm"></i><span> 14:23</span></li>
                    </ul>
                  </div>
                  <div className={'row col-3 p-0 text-end'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-eye"></i><span>11회</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="product col-3 mx-auto box2">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img" alt="img"/></div>
                <h5 className="product_title2"> 코베아 네스트2 구매해요!</h5>
                <div className="product_mon"> 가격: 15,000￦</div>
                <a href={'#!'} className="product_des text-decoration-none"> 4번 정도 피칭 했고요 . 11월 13일 원남 저수지에서 마지막 사용 했습니다. 캠핑의 환상에서
                  벗어나 판매합니다.상태 전반적으로 괜찮아요..</a>
                <div className={'row my-2'}>
                  <div className={'row col-6 text-start'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-person"></i><span>홍길동</span></li>
                    </ul>
                  </div>
                  <div className={'row col-5 p-0 text-end'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-alarm"></i><span> 14:23</span></li>
                    </ul>
                  </div>
                  <div className={'row col-3 p-0 text-end'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-eye"></i><span>11회</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="product col-3 box1">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img" alt="img"/></div>
                <h5 className="product_title1"> 루프 플라이 팝니다</h5>
                <div className="product_mon"> 가격: 210,000￦</div>
                <a href={'#!'} className="product_des text-decoration-none"> 2룸 루프 플라이 팔고 있습니다. 인기 많은 것 같은데 네고 안됩니다..</a>
                <div className={'row my-2'}>
                  <div className={'row col-6 text-start'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-person"></i><span>홍길동</span></li>
                    </ul>
                  </div>
                  <div className={'row col-5 p-0 text-end'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-alarm"></i><span> 14:23</span></li>
                    </ul>
                  </div>
                  <div className={'row col-3 p-0 text-end'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-eye"></i><span>11회</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="product col-3  box2">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img" alt="img"/></div>
                <h5 className="product_title2"> 루프 플라이 삽니다!!</h5>
                <div className="product_mon"> 가격: 190,000￦</div>
                <a href={'#!'} className="product_des text-decoration-none"> 2룸 루프 플라이 사고 싶습니다. 많은 관심 부탁드립니다!!..</a>
                <div className={'row my-2'}>
                  <div className={'row col-6 text-start'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-person"></i><span>홍길동</span></li>
                    </ul>
                  </div>
                  <div className={'row col-5 p-0 text-end'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-alarm"></i><span> 14:23</span></li>
                    </ul>
                  </div>
                  <div className={'row col-3 p-0 text-end'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-eye"></i><span>11회</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="product col-3 py-2 my-3 box2">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img" alt="img"/></div>
                <h5 className="product_title2"> 루프 플라이 삽니다</h5>
                <div className="product_mon"> 가격: 170,000￦</div>
                <a href={'#!'} className="product_des text-decoration-none"> 2룸 루프 플라이 사고 싶습니다. 많은 관심 부탁드립니..</a>
                <div className={'row my-2'}>
                  <div className={'row col-6 text-start'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-person"></i><span>홍길동</span></li>
                    </ul>
                  </div>
                  <div className={'row col-5 p-0 text-end'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-alarm"></i><span> 14:23</span></li>
                    </ul>
                  </div>
                  <div className={'row col-3 p-0 text-end'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-eye"></i><span>11회</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="product col-3  py-2 my-3 box3">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img" alt="img"/></div>
                <h5 className="product_title2"> 루프 플라이 삽니다</h5>
                <div className="product_mon"> 가격: 180,000￦</div>
                <a href={'#!'} className="product_des text-decoration-none"> 2룸 루프 플라이 사고 싶습니다. 많은 관심 부탁드립니..</a>
                <div className={'row my-2'}>
                  <div className={'row col-6 text-start'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-person"></i><span>홍길동</span></li>
                    </ul>
                  </div>
                  <div className={'row col-5 p-0 text-end'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-alarm"></i><span> 14:23</span></li>
                    </ul>
                  </div>
                  <div className={'row col-3 p-0 text-end'}>
                    <ul className={'list-unstyled product_des'}>
                      <li><i className="bi bi-eye"></i><span>11회</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}

export default MainPage;