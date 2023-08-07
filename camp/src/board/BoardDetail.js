import React from "react";
import './boardDetail.css'

function BoardDetail(props) {

  return (
      <main className="container my-4">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <div className="d-flex justify-content-center my-3 mb-5 ">
              <h2 className={'text1'}>장터 상세 게시글</h2>
            </div>
            <div className="col-sm d-flex justify-content-end my-3">
              <button type="button" className="w-btn w-btn-indigo me-2" id="btn-update">수정</button>
              <button type="button" className="btn btn-outline-danger" id="btn-delete">삭제</button>
            </div>
            <div className="bg-secondary bg-opacity-10 rounded-1 p-2">
              <form id="frm" method="post">
                <div className="row">
                  <div className="col-sm-9">
                    <input type="hidden" name="idx" id="idx"></input>
                    <input type="text" className="form-control-plaintext fs-5 fw-bold" placeholder={'제목 부분'} name="title" readOnly></input>
                  </div>
                  <div className="col-sm-3  ">
                    <input type="hidden" name="idx" id="idx"></input>
                    <input type="text" className="form-control-plaintext fs-5 fw-bold" placeholder={'희망가: 50,000원'} name="title" readOnly></input>
                  </div>
                </div>

                <div className="col-sm-4 text-end">
                  <input type="hidden" name="idx" id="idx"></input>
                  <input type="text" className="form-control-plaintext fs-5 fw-bold" placeholder={'지역: 부산 사상구'} name="title" readOnly></input>
                </div>
                <div className="row my-3 bg-light">
                  <div className="col-sm-4 d-flex justify-content-start">
                    <input type="text" className="form-control-plaintext fs-5 fw-semibold mx-0" readOnly></input>
                    <input type="text" className="form-control-plaintext fw-light text-body-outline-light w-auto"
                           readOnly></input>
                  </div>
                  <div className="col-sm d-flex justify-content-end py-2">
                    <div className="mx-2">
                      <p className="text-end mb-0 pb-0">조회수</p>
                      <input type="text"
                             className="form-control-plaintext fw-light text-body-outline-light text-end mt-0 pt-0"
                             readOnly></input>
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-sm">
                    <div className="my-3">
                      <img width="100%"></img>
                    </div>
                    <textarea className="form-control-plaintext" rows="15" id="contents" name="contents"
                              readOnly></textarea>
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

export default BoardDetail;