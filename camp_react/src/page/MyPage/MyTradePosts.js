import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import '../trade/tradeListpage.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function MyTradePosts({user}) {
  const [MyTradePosts, setMyTradePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleToSend] = useState([]);
  const navi = useNavigate();
  const goWrite = () => navi('/tradeWrite');
  const params = new URLSearchParams();
  const [sortOption, setSortOption] = useState('newest'); // 최신순을 기본으로 설정
  const [myPosts, setMyPosts] = useState([]);
  // const { user } = useAuth(); // 사용자 정보를 받아오는 컨텍스트 사용

  useEffect(() => {
    if (user) {

      const memberIdx = parseInt(user.memberIdx);
      // 사용자 정보가 있을 경우에만 실행
      axios.get(`/board/myPosts/${memberIdx}`)
          .then(response => {
            setMyPosts(response.data.result);
          })
          .catch(error => {
            console.error('Error fetching my posts:', error);
          });
    }
  }, []);
  
  // 폼 제출 이벤트 핸들러
  const handleFormSubmit = (event) => {
    event.preventDefault(); // 폼의 제출 동작 막음
  };
  params.append("title", titleToSend);

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
      <div className={'container'}>
        <div className={'row'}>
          <ul className={'text-center my-4'}>
            <li><i className="bi bi-cart4"></i><span className={'text3 my-4 fw-bold'}> 내가 쓴 장터글</span></li>
          </ul>
          {myPosts.map(item => (
              <div key={item.index} className="my-2 mb-0 col-4">
                <Link to={`/trade/${item.tradeBoardIdx}`} className="text-decoration-none">
                  {/*삽니다/팝니다 선택에 따라 다른 css 디자인 적용하여 구분*/}
                  <div className={`box${item.tradeCate === '1' ? '1' : '2'}`}>
                    <div className="product_img_div">
                      <Link to={`/board/trade/${item.tradeBoardIdx}`}>
                        <img src={item.img} alt={"img"} className="product_img"/>
                        {/*"/assets/default_image.png"*/}
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
          ))
          }
        </div>
      </div>
  )
}

export default MyTradePosts;