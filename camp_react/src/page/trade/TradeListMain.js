// 메인페이지 하단 부분, 장터 목록리스트 컴포넌트 js파일(TradeListMain)
import React, {useEffect, useState} from "react";
import './tradeListpage.css';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

function TradeListMain(props) {
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

  return (
      // 불러올 장터 게시판
      <main className={'container'}>
        <div className={'row'}>
          {tradeListPage.map(item => (
              <div key={item.index} className="my-2 mb-0 col-3">
                <Link to={`/trade/${item.tradeBoardIdx}`} className="text-decoration-none">
                  {/*삽니다/팝니다 선택에 따라 다른 css 디자인 적용하여 구분*/}
                  <div className={`box${item.tradeCate === '1' ? '1' : '2'}`}>
                    <div className="product_img_div">
                      <Link to={`/trade/${item.tradeBoardIdx}`}>
                        <img src="/assets/default_image.png" alt={"img"} className="product_img"/>
                      </Link>
                    </div>
                    <div className={'product_mon mx-3 text-center'}>
                      {item.title}
                    </div>
                    <div className="product_mon text-center">
                      <i className="bi bi-coin"></i>희망가: {item.tradePrice.toLocaleString()}원
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
          ))}
        </div>
      </main>
  )
}

export default TradeListMain;