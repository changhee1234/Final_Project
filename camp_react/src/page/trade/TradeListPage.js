import React, { useEffect, useState } from "react";
import './tradeListpage.css';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function TradeListPage(props) {
  const [tradeListPage, setTradeListPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleToSend] = useState([]);
  const navi = useNavigate();
  const goWrite = () => navi('/tradeWrite');
  const params = new URLSearchParams();
  const [sortOption, setSortOption] = useState('newest'); // 최신순을 기본으로 설정
  // 폼 제출 이벤트 핸들러
  const handleFormSubmit = (event) => {
    event.preventDefault(); // 폼의 제출 동작 막음
  };
  params.append("title", titleToSend);

  useEffect(() => {
    fetchData();
  }, [sortOption]);

  const fetchData = () => {
    let apiUrl = `http://localhost:8080/board/list?sortOption=${sortOption}`;
    if (sortOption === "newest") {
      apiUrl += "&sortBy=created_at"; // 최신순으로 정렬
    } else if (sortOption === "viewest") {
      apiUrl += "&sortBy=views"; // 조회순으로 정렬
    }

    axios.get(apiUrl)
        .then(res => {
          const tradeListPageData = res.data.result;
          setTradeListPage(tradeListPageData);
          setLoading(false); // 데이터 로딩 완료
        })
        .catch(err => {
          alert(`통신 오류 : ${err}`);
          setLoading(false); // 데이터 로딩 실패
        });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // useEffect(() => {
  //   fetchData(); // Fetch data whenever sort option changes
  // }, [sortOption]);
  //
  // const fetchData = () => {
  //   axios.get(`http://localhost:8080/board/list?sortOption=${sortOption}`)
  //       .then(res => {
  //         console.log(res.data); // 확인용 로그
  //         const tradeListPageData = res.data.result
  //         setTradeListPage(tradeListPageData);
  //         // setLoading(false); // 데이터 로딩 완료
  //       })
  //       .catch(err => {
  //         alert(`통신 오류 : ${err}`);
  //         setLoading(false); // 데이터 로딩 실패
  //       });
  // };

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/board/list?sortOption=${sortOption}`)
  //       .then(res => {
  //         console.log(res.data); // 확인용 로그
  //         const tradeListPageData = res.data.result
  //         setTradeListPage(tradeListPageData);
  //         // setLoading(false); // 데이터 로딩 완료
  //       })
  //       .catch(err => {
  //         alert(`통신 오류 : ${err}`);
  //         setLoading(false); // 데이터 로딩 실패
  //       });
  // }, [sortOption]); // sortOption이 변경될 때마다 실행

  // 정렬 옵션 변경 핸들러

// 등록일을 ~시간 전으로 표기, 24시간 후에는 날짜로 표기하는 함수
  const getTimeOrDate = (dateTime) => {
    const now = new Date();
    const postedTime = new Date(dateTime);
    const timeDiff = Math.floor((now - postedTime) / (60 * 60 * 1000)); // 시간 간격 계산

    if (timeDiff < 24) {
      return `${timeDiff}시간 전`;
    } else {
      const options = {year: "numeric", month: "long", day: "numeric"};
      return postedTime.toLocaleDateString(undefined, options);
    }
  };

  // 등록된 게시판 리스트
  return (
      <main className={'container my-5'}>
        <div className={'row my-5'}>
          <div className={'com-sm-8 my-5'}>
            <div className={'row my-5 mb-0'}>
              <ul className={'col-sm text-center my-4'}>
                <li><i className="bi bi-cart4"></i><span className={'text3'}> 장터 게시판</span></li>
              </ul>
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
                  <form onSubmit={handleFormSubmit} id={'listCheck'} name={'listCheck'}>
                  <div className="col-sm btn-group d-flex justify-content-end">
                      <div className="form-check mx-3 form-control-inline">
                        <input
                            type="radio" className="form-check-input" name="sortOption"
                            value="newest" id="newest" checked={sortOption === "newest"}
                            onChange={handleSortChange}/>
                        <label htmlFor="newest" className="form-check-label">최신순</label>
                      </div>
                      <div className="form-check mx-3 form-control-inline">
                        <input
                            type="radio" className="form-check-input"
                            name="sortOption" value="viewest" id="viewest"
                            checked={sortOption === "viewest"}
                            onChange={handleSortChange}/>
                        <label htmlFor="viewest" className="form-check-label">조회순</label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/*게시판 리스트*/}
            <div className={'row'}>
              {tradeListPage.map(item => (
                  <div key={item.index} className="my-2 mb-0 col-3">
                    <Link to={`/trade/${item.idx}`} className="text-decoration-none">
                      {/*삽니다/팝니다 선택에 따라 다른 css 디자인 적용하여 구분*/}
                      <div className={`box${item.tradeCate === '1' ? '1' : '2'}`}>
                        <div className="product_img_div">
                          <Link to={`/trade/${item.idx}`}>
                            <img src="/assets/default_image.png" alt={"img"} className="product_img"/>
                          </Link>
                        </div>
                        <div className={'product_mon mx-3 text-center'}>
                          {item.title}
                        </div>
                        <div className="product_mon text-center">
                          <i className="bi bi-coin"></i>가격: {item.tradePrice.toLocaleString()}원
                        </div>
                        <h5 className="product_content">{item.content}</h5>
                        <a className="product_des text-decoration-none">{item.description}</a>
                        <div className="row my-2">
                          <div className="row col-5 text-start">
                            <ul className="list-unstyled mx-2">
                              <li><i className="bi bi-person"></i><span>{item.userName}</span></li>
                            </ul>
                          </div>
                          <div className="row col-6 p-0 text-end">
                            <ul className="list-unstyled">
                              <li><i className="bi bi-alarm"></i> <span>{getTimeOrDate(item.createDt)}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="row col-3 p-0 text-center">
                            <ul className="list-unstyled">
                              <li><i className="bi bi-eye"></i><span>{item.cnt}회</span></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
              ))
              }
            </div>
          </div>

          <div className="product text-end">
            <button type={'button'} className="w-btn w-btn-indigo mx-3" onClick={goWrite}>글 등록</button>
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