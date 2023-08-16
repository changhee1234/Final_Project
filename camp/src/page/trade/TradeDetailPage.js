import React, { useEffect, useState } from 'react';
import './tradeboardDetail.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

// import {match} from "http-proxy-middleware/dist/context-matcher";
// import { Link } from 'react-router-dom'; // 추가: 상세 페이지로 이동하기 위한 링크 생성


function TradeDetailPage(props) {
  const [trade, setTrade] = useState({});
  const { id } = useParams(); // id 값을 추출

  useEffect(() => {
    fetchTrade();
  }, []);


  const fetchTrade = async () => {
    try {
      const response = await axios.get(`/api/trades/${id}`);
      setTrade(response.data);
    } catch (error) {
      console.error('Error fetching trade:', error);
    }
  };

  // const handleUpdateClick = () => {
  //
  // }
  //
  //   const handleDeleteClick = async () => {
  //     try {
  //       await axios.delete(`/api/trades/${trade.idx}`); // 서버에 삭제 요청 보내기
  //
  //       // 삭제 후 목록 페이지로 이동
  //       props.history.push('/TradeListPage'); // 목록 페이지 경로로 수정해야 합니다.
  //     } catch (error) {
  //       console.error("Error", error);
  //     }
  //   };


    return (
        <main className="container">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <div className="d-flex justify-content-center my-3 mb-5 ">
                <h2 className={'text1'}>장터 상세 게시글</h2>
              </div>
              <div className="col-sm d-flex justify-content-end my-3">
                <button type="button" className="w-btn w-btn-indigo me-2" id="btn-update">수정</button>
                <button type="button" className="w-btn-outline w-btn-red-outline" id="btn-delete">삭제</button>
              </div>
              <div className="bg-secondary bg-opacity-10 rounded-1 p-2">
                <form id="frm" method="post">
                  <div className="row">
                    <div className="col-sm-9">
                      <input type="hidden" value={trade.idx} name="idx" id="idx"></input>
                      <input type="text" name="title" value={trade.title} readOnly></input>
                    </div>
                    <div className="col-sm-3">
                      <input type="hidden" value={trade.idx} name="idx" id="idx"></input>
                      <input type="text" className="form-control-plaintext fs-5 fw-bold text-center"
                             placeholder={'희망가: 50,000원'} name="tradePrice" value={trade.tradePrice} readOnly></input>
                    </div>
                  </div>

                  <div className="col-sm-4 text-end">
                    <input type="hidden" value={trade.idx} name="idx" id="idx"></input>
                    <input type="text" className="form-control-plaintext fs-5 fw-bold" placeholder={'지역: 부산 사상구'}
                           name="tradeLocation" value={trade.tradeLocation} readOnly></input>
                  </div>
                  <div className="row my-3 bg-light">
                    <div className="col-sm-4 d-flex justify-content-start">
                      <input type="text" className="form-control-plaintext fs-5 fw-semibold mx-0" value={trade.userName}
                             readOnly></input>
                      <input type="text" className="form-control-plaintext fw-light text-body-outline-light w-auto"
                             value={trade.createDt}
                             readOnly></input>
                    </div>
                    <div className="col-sm d-flex justify-content-end py-2">
                      <div className="mx-2">
                        <p className="text-end mb-0 pb-0">조회수 79회</p>
                        <input type="text"
                               className="form-control-plaintext fw-light text-body-outline-light text-end mt-0 pt-0"
                               value={trade.cnt} readOnly></input>
                      </div>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-sm">
                      <div className="my-3">
                        <img width="100%" alt={"content"}></img>
                      </div>
                      <textarea className="form-control-plaintext" rows="15" id="contents" name="contents"
                                value={trade.idx} readOnly></textarea>
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