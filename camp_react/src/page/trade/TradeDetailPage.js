// 장터 글 상세페이지 js파일(TradeDetailPage)
import React, {useEffect, useState} from 'react';
import './tradeboardDetail.css'
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

function TradeDetailPage(props) {
  // const board = useParams();
  // const [tradeDetailPage, setTradeDetailPage] = useState(0);
  const {tradeBoardIdx} = useParams();
  const [campDetails, setCampDetails] = useState(null);
  const [updateBoard, setUpdateBoard] = useState({
    tradeBoardIdx: tradeBoardIdx,
    title: '',
    content: '',
    createDt: '',
    userName: '',
    tradePrice: '',
    tradeLocation: '',
    tradeCate: '',
    imgUrl: '',
    memberIdx: '',
  });

  const navi = useNavigate();
  const goList = () => navi('/trade');

  useEffect(() => {
    axios.get(`http://localhost:8080/board/trade/${tradeBoardIdx}`)
        .then(res => {
          // console.log(res.data); // 응답 데이터를 콘솔에 기록
          setCampDetails(res.data);
          setUpdateBoard({...res.data});
          setUpdateBoard({
            tradeBoardIdx: res.data.tradeBoardIdx,
            title: res.data.title,
            campDt: res.data.campDt,
            userName: res.data.userName,
            tradePrice: res.data.tradePrice,
            tradeLocation: res.data.tradeLocation,
            createDt: res.data.createDt,
            tradeCate: res.data.tradeCate,
            imgUrl: res.data.imgUrl
          });
        })
        .catch(err => {
          console.log(`에러: ${err}`);
        });
  }, []);

  if (!campDetails) {
    return <div>로딩 중...</div>;
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUpdateBoard(prevData => ({...prevData, [name]: value}));
  };

  const handleCheckboxChange = (e) => {
    const {name, checked} = e.target;
    setUpdateBoard(prevData => ({...prevData, [name]: checked ? "Y" : "N"}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const handleCancel = () => {
    setUpdateBoard(campDetails);
  };

  const dtTruncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength);
  };

// 수정 페이지로 이동
  const handleUpdateClick = () => {
    const updateUrl = `/board/edit/${tradeBoardIdx}`;
    window.location.href = updateUrl;
  };

  // 삭제
  const handleDelete = (e) => {
    if (window.confirm('정말 삭제하겠습니까?') === true) {
      axios.delete(`http://localhost:8080/board/delete/${tradeBoardIdx}`)
          .then(res => {
            alert('삭제되었습니다.');
          })
          .catch(err => alert(`통신 오류 : ${err}`));
    } else {
      alert('삭제가 취소되었습니다.');
      e.preventDefault();
    }
  }

  function adjustImageStyle(content) {
    const adjustedContent = content.replace(/<img[^>]*>/g, (match) => {
      return match.replace(/<img/, '<img style="max-width: 100%; height: auto;"');
    });
    return adjustedContent;
  }
  return (
      <main className="container MY">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <div className="col-sm d-flex justify-content-end my-3">
              <button type={'button'} className={'w-btn w-btn-list me-auto'} onClick={goList}>다른 물건</button>
              <button onClick={handleUpdateClick} className="w-btn w-btn-indigo me-2">수정</button>

              <button type="button" className="w-btn-outline w-btn-red-outline" id="btn-delete"
                      onClick={handleDelete}>삭제
              </button>
            </div>
            <div className="bg-secondary bg-opacity-10 rounded-1 p-2">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-9">
                    <input type="hidden" value={campDetails.idx} name="idx" id="idx"></input>
                    <input type="text" name="title" value={updateBoard.title || ''} readOnly
                           className={'form-control text-center text1'} onChange={handleInputChange}></input>
                  </div>
                  <div className="col-sm-3">
                    <input type="text" className="form-control-plaintext fs-3 fw-bold text-center"
                           name="tradePrice" value={updateBoard.tradePrice.toLocaleString() + '원' || ''}
                           onChange={handleCancel} readOnly></input>
                  </div>
                </div>

                <div className="col text-end">
                  <div className={'col-sm-3'}>
                    <div className={'input-group row'}>
                    </div>
                  </div>
                  <input type="hidden" value={campDetails.idx} name="idx" id="idx"></input>
                  <div className="d-flex">
                    <input type="text" className="px-2 form-control-plaintext fw-semibold mx-0 text-start"
                           value={campDetails.userName} readOnly></input>
                    <input type="text" className="px-4 text-end form-control-plaintext fs-6 text-start fw-bold"
                           placeholder={'부산 사상구'}
                           name="tradeLocation" value={campDetails.tradeLocation} readOnly
                           onChange={handleInputChange}></input>
                  </div>

                  <div className="row my-2 bg-light">
                    <input type="text" className="form-control-plaintext fw-light text-body-outline-light w-auto mx-2"
                           value={`${campDetails.createDt[0]}-${campDetails.createDt[1]}-${campDetails.createDt[2]}`} readOnly={true}/>
                    <div className="col-sm d-flex justify-content-end py-2">
                      <div className="mx-2">
                        <p className="text-end mb-0 pb-0"></p>
                        <input type="text"
                               className="form-control-plaintext fw-light text-body-outline-light text-end mt-0 pt-0"
                               value={campDetails.cnt} onChange={handleInputChange} readOnly></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-sm">
                    <div className="my-3">
                      <div dangerouslySetInnerHTML={{ __html: adjustImageStyle(campDetails.content) }} />
                    </div>
                  </div>
                </div>
                {/*REST 방식 사용 시 form태그의 데이터 전송 방식을 변경하기 위한 태그*/}
                <input type="hidden" id="method" name="_method"></input>
              </form>

              <div className="row my-3 bg-white">
                <div className="col-sm-2 d-flex justify-content-start">
                  <p className="text-body-outline-light text-opacity-25 fw-bolder fs-6 mx-0 my-2">댓글</p>
                </div>
                <div className="col-sm d-flex justify-content-end py-2">
                  <a className="btn m-0 p-0" href="#comment" aria-label="pensil">
                    {/*icon*/}
                    <i className="bi bi-pencil-fill"></i>
                  </a>
                </div>
              </div>
              <div className="my-3">
                {/*comment 레이아웃 불러오기*/}
                {/*<div th:replace="~{layout/comment :: comment(${comment}, ${idx})}"></div>*/}

                <form action="/disCommentWrite" method="post" id="comment">
                  <div className="input-group mb-3">
                    <input type="hidden" name="disIdx"></input>
                    <input type="hidden" name="id"></input>
                    <input type="hidden" name="userName"></input>
                    <input type="text" className="form-control border-outline-light p-1" name="content"
                           placeholder="댓글을 입력해주세요" aria-label="Recipient's username"
                           aria-describedby="button-addon2" width="60%"></input>
                    <button className="btn btn-outline-outline-light" type="submit" id="btn-content">등록</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-sm d-flex justify-content-end">
                <button type="button" className="btn btn-outline-light" id="btn-list">목록</button>
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </main>
  )
}

export default TradeDetailPage;