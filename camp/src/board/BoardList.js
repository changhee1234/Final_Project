import React from "react";
import './boardList.css'
import {Link} from "react-router-dom";

function BoardList(props) {

  return (
      <main className={'container my-4'}>
        <div className={'row my-4'}>
          <div className={'com-sm-8'}>
            <div className={'row my-5 mb-3'}>
              <div className={'col-sm text-center my-4'}><h1>장터 게시판</h1></div>
              {/*검색창*/}
              <div className="row">
                <div className="col-3">
                  <span className="icon"><i className="fa fa-search row"></i></span>
                  <input className={'search'} type="search" id="search" placeholder="Search..."/>
                </div>
                <div className={'col my-1'}>
                  <button type="button" className="input-group-text" id="btn-search"><i className="bi bi-search"></i>
                  </button>

                  {/*게시판 최신순 및 조회순 정렬*/}
                  <form action='/BoardList' method={"post"} id={'listCheck'} name={'listCheck'}>
                    <div className={'col-sm btn-group d-flex justify-content-end'}>
                      <div className={'form-check mx-3 form-control-inline'}>
                        <input type='radio' className={'form-check-input'} name={'newest'} value={'newest'} checked></input>
                        <label htmlFor='newest' className={'form-check-label'}>최신순</label>
                      </div>
                      <div className={'form-check mx-3 form-control-inline'}>
                        <input type='radio' className={'form-check-input'} name={'viewest'} value={'viewest'}></input>
                        <label htmlFor='viewest' className={'form-check-label'}>조회순</label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/*게시판 리스트*/}
            <div className="product_container row mx-auto my-2">
              <div className="product col-3 box1">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img"/></div>
                <a href="#" className={'text-decoration-none'}><h5 className="product_title"> 캠핑용 프로젝트 팝니다</h5></a>
                <div className="product_mon"> 가격: 25,000￦</div>
                <a href={'#'} className="product_des text-decoration-none"> 캠핑용품 정리하다가 불용품 발견되어 장터에 내놓습니다.초기에 몇번 들고 나가고
                  거의 사용하지
                  않았구요..사진에 보시듯 제조일은 2016년인데... 사용시간은 47시간입니다.외관은 거의 새것처럼 깨끗합니다. 기스도 거의 없는 상태에요..</a>
                <div className={'row my-2'}>
                  <p className={'col text-start'}>홍길동</p>
                  <p className={'col text-end'}>11회</p></div>
              </div>

              <div className="product col-3 mx-auto box2">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img"/></div>
                <h5 className="product_title"> 코베아 네스트2 구매해요!</h5>
                <div className="product_mon"> 가격: 15,000￦</div>
                <a className="product_des text-decoration-none"> 4번 정도 피칭 했고요 . 11월 13일 원남 저수지에서 마지막 사용 했습니다. 캠핑의 환상에서
                  벗어나 판매합니다.상태 전반적으로 괜찮아요..</a>
                <div className={'row my-2'}>
                  <p className={'col text-start'}>콩나물</p>
                  <p className={'col text-end'}>11회</p></div>
              </div>

              <div className="product col-3 box1">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img"/></div>
                <h5 className="product_title"> 루프 플라이 팝니다</h5>
                <div className="product_mon"> 가격: 210,000￦</div>
                <a className="product_des text-decoration-none"> 2룸 루프 플라이 파고 있습니다. 인기 많은 것 같은데 네고 안됩니다..</a>
                <div className={'row my-2'}>
                  <p className={'col text-start'}>김철수</p>
                  <p className={'col text-end'}>41회</p></div>
              </div>

              <div className="product col-3  box2">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img"/></div>
                <h5 className="product_title"> 루프 플라이 삽니다!!</h5>
                <div className="product_mon"> 가격: 190,000￦</div>
                <a className="product_des text-decoration-none"> 2룸 루프 플라이 사고 싶습니다. 많은 관심 부탁드립니다!!..</a>
                <div className={'row my-2'}>
                  <p className={'col text-start'}>김영희</p>
                  <p className={'col text-end'}>31회</p></div>
              </div>

              <div className="product col-3 py-4 box2">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img"/></div>
                <h5 className="product_title"> 루프 플라이 삽니다</h5>
                <div className="product_mon"> 가격: 170,000￦</div>
                <a className="product_des text-decoration-none"> 2룸 루프 플라이 사고 싶습니다. 많은 관심 부탁드립니..</a>
                <div className={'row my-2'}>
                  <p className={'col text-start'}>아무개</p>
                  <p className={'col text-end'}>11회</p></div>
              </div>

              <div className="product col-3 box3">
                <div className="product_img_div"><img src="/assets/default_image.png" className="product_img"/></div>
                <h5 className="product_title"> 코베아 네스트3 구매해요!</h5>
                <div className="product_mon"> 가격: 34,000￦</div>
                <a className="product_des text-decoration-none"> 4번 정도 피칭 했고요 . 11월 13일 원남 저수지에서 마지막 사용 했습니다. 캠핑의 환상에서
                  벗어나 판매합니다.상태 전반적으로 괜찮아요..</a>
                <div className={'row my-2'}>
                  <p className={'col text-start'}>콩나물</p>
                  <p className={'col text-end'}>111회</p></div>
              </div>
            </div>

            <div className="product py-4 text-end">
              <a href="/BoardWrite" className="btn btn-outline-primary mx-3">글 등록</a>
            </div>

            {/* ajax 페이징*/}
            <div className={'my-3'}>
              <ul className={'pagination justify-content-center'} id={'paginationAjax'}>
                <li className={'page-item disabled'}>
                  <a href="#" className={'page-link'}>&laquo;</a>
                </li>
                <li className={'page-item disabled'}>
                  <a href="#" className={'page-link'}>1</a>
                </li>
                <li className={'page-item disabled'}>
                  <a href="#" className={'page-link'}>&raquo;</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
  )
}

export default BoardList;