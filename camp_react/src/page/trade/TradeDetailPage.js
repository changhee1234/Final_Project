import React, {useEffect, useState} from 'react';
import './tradeboardDetail.css'
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

function TradeDetailPage(props) {
  // const board = useParams();
  const {tradeBoardIdx} = useParams();
  // const [tradeDetailPage, setTradeDetailPage] = useState(0);
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
  const goList = () => navi('/board/');

  useEffect(() => {
    axios.get(`http://localhost:8080/trade/${tradeBoardIdx}`)
        .then(res => {
          console.log(res.data); // 응답 데이터를 콘솔에 기록
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
  }, [tradeBoardIdx]);

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

    const handleCancel = () => {
      setUpdateBoard(campDetails);
    };

    const dtTruncateText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      }
      return text.slice(0, maxLength);
    };

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

    return (
        <main className="container">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <div className="d-flex justify-content-center my-3 mb-5 ">
                <h2 className={'text1'}>장터 상세 게시글</h2>
              </div>
              <div className="col-sm d-flex justify-content-end my-3">
                <button type={'button'} className={'btn btn-dart me-auto'} onClick={goList}>목록</button>
                <Link to={`/board/edit/${campDetails.tradeBoardIdx}`} className="w-btn w-btn-indigo me-2">수정</Link>
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
                             onChange={handleInputChange}></input>
                    </div>
                    <div className="col-sm-3">
                      <input type="text" className="form-control-plaintext fs-5 fw-bold text-center"
                             name="tradePrice" value={updateBoard.tradePrice || ''}
                             onChange={handleCancel} readOnly></input>
                    </div>
                  </div>

                  <div className="col-sm-4 text-end">
                    <div className={'col-sm-3'}>
                      <div className={'input-group'}>
                        <span className={'input-group-text'}>등록일자</span>
                        <input className={'form-control'} value={dtTruncateText(campDetails.createDt, 10)}
                               readOnly={true}/>
                      </div>
                    </div>
                    <input type="hidden" value={campDetails.idx} name="idx" id="idx"></input>
                    <input type="text" className="form-control-plaintext fs-5 fw-bold" placeholder={'지역: 부산 사상구'}
                           name="tradeLocation" value={campDetails.tradeLocation} readOnly
                           onChange={handleInputChange}></input>
                  </div>
                  <div className="row my-3 bg-light">
                    <div className="col-sm-4 d-flex justify-content-start">
                      <input type="text" className="form-control-plaintext fs-5 fw-semibold mx-0"
                             value={campDetails.userName}
                             readOnly></input>
                      <input type="text" className="form-control-plaintext fw-light text-body-outline-light w-auto"
                             value={dtTruncateText(campDetails.createDt, 10)} readOnly={true}/>
                    </div>
                    <div className="col-sm d-flex justify-content-end py-2">
                      <div className="mx-2">
                        <p className="text-end mb-0 pb-0">조회수 79회</p>
                        <input type="text"
                               className="form-control-plaintext fw-light text-body-outline-light text-end mt-0 pt-0"
                               value={campDetails.cnt} onChange={handleInputChange} readOnly></input>
                      </div>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-sm">
                      <div className="my-3">
                        <img width="100%" alt={"content"} src={campDetails.imgUrl}
                             onChange={handleInputChange}></img>
                      </div>
                      <textarea className="form-control-plaintext" rows="15" id="contents" name="contents"
                                value={updateBoard.content || ''} readOnly></textarea>
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
}

export default TradeDetailPage;