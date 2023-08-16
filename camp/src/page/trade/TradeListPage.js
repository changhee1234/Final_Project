import React, {useEffect, useState} from "react";
import './tradeListpage.css'
import axios from 'axios';
import * as tradeListPage from "react-bootstrap/ElementChildren";


function TradeListPage(props) {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    const response = await axios.get('/api/boards');
    setBoards(response.data);
  };

  const createBoard = async () => {
    const newBoard = { title, content };
    const response = await axios.post('/api/boards', newBoard);
    setBoards([...boards, response.data]);
    setTitle('');
    setContent('');
  };

  const deleteBoard = async (id) => {
    await axios.delete(`/api/boards/${id}`);
    setBoards(boards.filter(board => board.id !== id));
  };

  return (
      <main className={'container my-5'}>
        <div className={'row my-5'}>
          <div className={'com-sm-8 my-5'}>
            <div className={'row my-5 mb-0'}>
              <ul className={'col-sm text-center my-4'}>
                <li><i className="bi bi-cart4"></i><span className={'text3'}> 장터 게시판</span></li></ul>
              {/*검색창*/}
              <div className="row my-0">
                <div className="col-3 my-4">
                  <span className="icon"><i className="fa fa-search row"></i></span>
                  <input className={'search'} type="search" id="search" placeholder="원하는 물품을 검색해보세요"/>
                </div>
                <div className={'col my-4 p-0'}>
                  <button type="button" className="input-group-text" id="btn-search"><i className="bi bi-search"></i>
                  </button>

                  {/*게시판 최신순 및 조회순 정렬*/}
                  <form action='/TradeListPage.js' method={"post"} id={'listCheck'} name={'listCheck'}>
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
                <div>
                  {tradeListPage.map((trade) => (
                      <div key={trade.index} className="product_container row mx-auto my-2 mb-0">
                        <div className="product col-3 box1">
                          <div className="product_img_div">
                            <img src="/assets/default_image.png" alt={"img"} className="product_img" />
                          </div>
                          <div>
                            <a href={`/trade/${trade.idx}`} className="text-decoration-none">{trade.title}</a>
                          </div>
                          <a href={`/trade/${trade.idx}`} className="text-decoration-none">
                            <h5 className="product_title1">{trade.title}</h5>
                          </a>
                          <div className="product_mon">가격: {trade.tradePrice}￦</div>
                          <a href={'#!'} className="product_des text-decoration-none">{trade.description}</a>
                          <div className="row my-2">
                            <div className="row col-6 text-start">
                              <ul className="list-unstyled">
                                <li><i className="bi bi-person"></i><span>{trade.userName}</span></li>
                              </ul>
                            </div>
                            <div className="row col-5 p-0 text-end">
                              <ul className="list-unstyled">
                                <li><i className="bi bi-alarm"></i><span>{trade.createDt}</span></li>
                              </ul>
                            </div>
                            <div className="row col-3 p-0 text-end">
                              <ul className="list-unstyled">
                                <li><i className="bi bi-eye"></i><span>{trade.hitCnt}회</span></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>

              {/*<div className="product col-3 mx-auto box2">*/}
              {/*  <div className="product_img_div"><img src="/assets/default_image.png" alt={'img'} className="product_img"/></div>*/}
              {/*  <h5 className="product_title2"> 코베아 네스트2 구매해요!</h5>*/}
              {/*  <div className="product_mon"> 가격: 15,000￦</div>*/}
              {/*  <a href={'#!'} className="product_des text-decoration-none"> 4번 정도 피칭 했고요 . 11월 13일 원남 저수지에서 마지막 사용 했습니다. 캠핑의 환상에서*/}
              {/*    벗어나 판매합니다.상태 전반적으로 괜찮아요..</a>*/}
              {/*  <div className={'row my-2'}>*/}
              {/*    <div className={'row col-6 text-start'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-person"></i><span>홍길동</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*    <div className={'row col-5 p-0 text-end'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-alarm"></i><span> 14:23</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*    <div className={'row col-3 p-0 text-end'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-eye"></i><span>11회</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="product col-3 box1">*/}
              {/*  <div className="product_img_div"><img src="/assets/default_image.png" className="product_img" alt={'img'}/></div>*/}
              {/*  <h5 className="product_title1"> 루프 플라이 팝니다</h5>*/}
              {/*  <div className="product_mon"> 가격: 210,000￦</div>*/}
              {/*  <a href={"#!"} className="product_des text-decoration-none"> 2룸 루프 플라이 팔고 있습니다. 인기 많은 것 같은데 네고 안됩니다..</a>*/}
              {/*  <div className={'row my-2'}>*/}
              {/*    <div className={'row col-6 text-start'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-person"></i><span>홍길동</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*    <div className={'row col-5 p-0 text-end'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-alarm"></i><span> 14:23</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*    <div className={'row col-3 p-0 text-end'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-eye"></i><span>11회</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="product col-3  box2">*/}
              {/*  <div className="product_img_div"><img src="/assets/default_image.png"  alt={"img"} className="product_img"/></div>*/}
              {/*  <h5 className="product_title2"> 루프 플라이 삽니다!!</h5>*/}
              {/*  <div className="product_mon"> 가격: 190,000￦</div>*/}
              {/*  <a href={"#!"}  className="product_des text-decoration-none"> 2룸 루프 플라이 사고 싶습니다. 많은 관심 부탁드립니다!!..</a>*/}
              {/*  <div className={'row my-2'}>*/}
              {/*    <div className={'row col-6 text-start'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-person"></i><span>홍길동</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*    <div className={'row col-5 p-0 text-end'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-alarm"></i><span> 14:23</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*    <div className={'row col-3 p-0 text-end'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-eye"></i><span>11회</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="product col-3 py-2 my-3 box2">*/}
              {/*  <div className="product_img_div"><img src="/assets/default_image.png"  alt={"img"} className="product_img"/></div>*/}
              {/*  <h5 className="product_title2"> 루프 플라이 삽니다</h5>*/}
              {/*  <div className="product_mon"> 가격: 170,000￦</div>*/}
              {/*  <a href={"#!"}  className="product_des text-decoration-none"> 2룸 루프 플라이 사고 싶습니다. 많은 관심 부탁드립니..</a>*/}
              {/*  <div className={'row my-2'}>*/}
              {/*    <div className={'row col-6 text-start'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-person"></i><span>홍길동</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*    <div className={'row col-5 p-0 text-end'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-alarm"></i><span> 14:23</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*    <div className={'row col-3 p-0 text-end'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-eye"></i><span>11회</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="product col-3 py-2 my-3 box3">*/}
              {/*  <div className="product_img_div"><img src="/assets/default_image.png"  alt={"img"} className="product_img"/></div>*/}
              {/*  <h5 className="product_title2"> 코베아 네스트3 구매해요!</h5>*/}
              {/*  <div className="product_mon"> 가격: 34,000￦</div>*/}
              {/*  <a href={"#!"}  className="product_des text-decoration-none"> 4번 정도 피칭 했고요 . 11월 13일 원남 저수지에서 마지막 사용 했습니다. 캠핑의 환상에서*/}
              {/*    벗어나 판매합니다.상태 전반적으로 괜찮아요..</a>*/}
              {/*  <div className={'row my-2'}>*/}
              {/*    <div className={'row col-6 text-start'}>*/}
              {/*      <ul className={'list-unstyled '}>*/}
              {/*        <li><i className="bi bi-person"></i><span>홍길동</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*    <div className={'row col-5 p-0 text-end'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-alarm"></i><span> 14:23</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*    <div className={'row col-3 p-0 text-end'}>*/}
              {/*      <ul className={'list-unstyled'}>*/}
              {/*        <li><i className="bi bi-eye"></i><span>11회</span></li>*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>

            <div className="product text-end">
              <a href="tradeWrite" className="w-btn w-btn-indigo mx-3">글 등록</a>
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
          </div>
      </main>
  )
}

export default TradeListPage;