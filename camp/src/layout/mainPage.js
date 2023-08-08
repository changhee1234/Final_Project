import React from "react";
import './mainPage.css';

function mainPage(props) {

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
              <img src="/assets/캠핑1.jpg" alt="" className="d-block w-100"></img>
              <div className="carousel-caption d-none d-md-block">
                <h2 className={'highlight1'}>수하리 캠핑 파크</h2>
                <h4 className={'highlight2'}>강원 홍천군 서석면 행치령로 708</h4>
                <button type={'button'} className={'btn w-btn w-btn-indigo my-2'}>바로가기</button>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <img src="/assets/캠핑2.jpg" alt="" className="d-block w-100"></img>
              <div className="carousel-caption d-none d-md-block">
                <h2 className={'highlight1 '}>태양 힐링숲 글램핑&오토캠핑장</h2>
                <h4 className={'highlight2'}>경기 파주시 적성면 설마천로 376</h4>
                <button type={'button'} className={'btn w-btn w-btn-indigo my-2'}>바로가기</button>
              </div>
            </div>
          </div>
        </div>

        {/*캐러셀 이미지 이동*/}
        <button className="carousel-control-prev" type="button" data-bs-target="#mycarousel" data-bs-slide="prev">
          <img src="/assets/캠핑1.jpg" alt="" className="d-block w-100"></img></button>
        <button className="carousel-control-next" type="button" data-bs-target="#mycarousel" data-bs-slide="next">
          <img src="/assets/캠핑2.jpg" alt="" className="d-block w-100"></img></button>

        {/*공지 및 광고배너*/}
        <div className={'container my-4'}>
          <div className={'row'}>
            <div className={'col-4'}>
              <ul className={'list-unstyled'}>
                <li><i className="bi bi-megaphone megaphone"></i><span className={'text1'}> 공지사항</span></li>
              </ul>
              <ul>
                <a href="#" className={'text-decoration-none text-black'}>
                  <li><i className="bi bi-caret-right"></i><span className={'text2'}> 첫번째 공지사항입니다.</span></li>
                </a>
                <a href="#" className={'text-decoration-none text-black'}>
                  <li><i className="bi bi-caret-right"></i><span className={'text2'}> 두번째 공지사항입니다.</span></li>
                </a>
              </ul>
            </div>
            <div className={'col-8'}>
              <img src="/assets/ad1.jpg" className={'ad'} alt=""/>
            </div>
          </div>

          {/*캠핑장 리스트*/}
          <div className={'row my-2 box4'}>
            <ul className={'col list-unstyled text-start mb-0'}>
              <a href="#" className={'text-decoration-none fw-bold text-dark'}>
                <li><i className="bi bi-rocket-takeoff rocket-takeoff"></i><span className={'text1'}> 캠핑장</span></li></a>
            </ul>
            <ul className={'col list-unstyled text-end mb-0 px-4 more'}>
              <a href="#" className={'text-decoration-none fw-bold text-dark'}>
                <li><i className="bi bi-plus"></i><span className={'text2'}>더보기</span></li></a>
            </ul>
          </div>


          {/*장터 리스트*/}
          <div className={'row my-4'}>
            <ul className={'col list-unstyled text-start mb-0'}>
              <a href="#" className={'text-decoration-none fw-bold text-dark'}>
                <li><i className="bi bi-cart4"></i><span className={'text1'}> 장터</span></li></a>
            </ul>
            <ul className={'col list-unstyled text-end mb-0 px-4 more'}>
              <a href="#" className={'text-decoration-none fw-bold text-dark'}>
                <li><i className="bi bi-plus"></i><span className={'text2'}>더보기</span></li></a>
            </ul>
            <div className="row mx-3 mt-0">
              <div className="product col-3 box1">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img"/></div>
                <a href="#" className={'text-decoration-none'}><h5 className="product_title1"> 캠핑용 프로젝트 팝니다</h5></a>
                <div className="product_mon"> 가격: 25,000￦</div>
                <a href={'#'} className="product_des text-decoration-none"> 캠핑용품 정리하다가 불용품 발견되어 장터에 내놓습니다.초기에 몇번 들고 나가고
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
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img"/></div>
                <h5 className="product_title2"> 코베아 네스트2 구매해요!</h5>
                <div className="product_mon"> 가격: 15,000￦</div>
                <a className="product_des text-decoration-none"> 4번 정도 피칭 했고요 . 11월 13일 원남 저수지에서 마지막 사용 했습니다. 캠핑의 환상에서
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
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img"/></div>
                <h5 className="product_title1"> 루프 플라이 팝니다</h5>
                <div className="product_mon"> 가격: 210,000￦</div>
                <a className="product_des text-decoration-none"> 2룸 루프 플라이 팔고 있습니다. 인기 많은 것 같은데 네고 안됩니다..</a>
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
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img"/></div>
                <h5 className="product_title2"> 루프 플라이 삽니다!!</h5>
                <div className="product_mon"> 가격: 190,000￦</div>
                <a className="product_des text-decoration-none"> 2룸 루프 플라이 사고 싶습니다. 많은 관심 부탁드립니다!!..</a>
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

              <div className="product col-3 py-4 box2">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img"/></div>
                <h5 className="product_title2"> 루프 플라이 삽니다</h5>
                <div className="product_mon"> 가격: 170,000￦</div>
                <a className="product_des text-decoration-none"> 2룸 루프 플라이 사고 싶습니다. 많은 관심 부탁드립니..</a>
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

              <div className="product col-3 box3">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img"/></div>
                <h5 className="product_title2"> 코베아 네스트3 구매해요!</h5>
                <div className="product_mon"> 가격: 34,000￦</div>
                <a className="product_des text-decoration-none"> 4번 정도 피칭 했고요 . 11월 13일 원남 저수지에서 마지막 사용 했습니다. 캠핑의 환상에서
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
            </div>
          </div>
        </div>
      </main>
  )
}

export default mainPage;