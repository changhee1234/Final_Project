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
  // const { user } = useAuth(); // 사용자 정보를 받아오는 컨텍스트 사용S

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
  const getTimeOrDate = (dateTimeArray) => {
    const [year, month, day, hour, minute] = dateTimeArray;
    const postedTime = new Date(year, month - 1, day, hour, minute);
    const now = new Date();
    const timeDiff = Math.floor((now - postedTime) / (60 * 60 * 1000)); // 시간 간격 계산

    if (timeDiff < 24) {
      return `${timeDiff}시간 전`;
    } else {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return postedTime.toLocaleDateString(undefined, options);
    }
  };

  // 글자 수를 제한하고 나머지는 ".."으로 출력하는 함수
  function limitText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "..";
    }
    return text;
  }

  const tradeImg = {
    weight: "130px",
    height: "200px"
  }


  const stripHtmlTags = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
      <div className={'container'}>
        <div className={'row'}>
          <ul className={'text-center my-4'}>
            <li><i className="bi bi-cart4"></i><span className={'me-5 text3 my-4'}> 내가 쓴 장터글</span></li>
          </ul>
          {myPosts.map(item => (
              <div key={item.index} className="my-2 mb-0 col-4">
                <Link to={`/trade/${item.tradeBoardIdx}`} className="text-decoration-none">
                  {/*삽니다/팝니다 선택에 따라 다른 css 디자인 적용하여 구분*/}
                  <div className={`box${item.tradeCate === '1' ? '1' : '2'}`}>
                    <div className="product_img_div">
                      <Link to={`/board/trade/${item.tradeBoardIdx}`}>
                        <img src={extractImageUrl(item.content)} alt={"img"} style={tradeImg} className="product_img"/>
                        {/*"/assets/default_image.png"*/}
                      </Link>
                    </div>
                    <div className={'product_mon mx-3 text-center'}>
                      {limitText(stripHtmlTags(item.title), 14)}
                    </div>
                    <div className="product_mon text-center">
                      <i className="bi bi-coin"></i>희망가: {item.tradePrice.toLocaleString()}원
                    </div>
                    <h5 className="product_content">{limitText(stripHtmlTags(item.content), 18)}</h5>
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

// 이미지 URL 추출 함수
function extractImageUrl(content) {
  const imageRegex = /<img[^>]*src="([^"]+)"[^>]*>/g;
  const matches = content.match(imageRegex);
  if (matches && matches.length > 0) {
    const imageUrl = matches[0].match(/src="([^"]+)"/)[1];
    return imageUrl;
  }
  return ''; // 이미지가 없을 경우 빈 문자열 반환
}

export default MyTradePosts;