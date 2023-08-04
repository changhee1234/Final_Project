import React from "react";

function BoardWrite(props) {

  return (
      <div className="container my-4">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 text-center">
            <h2>장터 게시판 글 등록</h2>
            <div className="row">
              <form action="/BoardWrite" method="post" encType="multipart/form-data">
                <div className="my-3 row">
                  <div className="col-sm-2">
                    <select id="box-office" className="form-control me-3" name="movieNm">
                      <option value="" selected="selected">분류</option>
                      <option value={"1"}>삽니다</option>
                      <option value={"2"}>팝니다</option>
                    </select>
                  </div>
                  <div className="col-sm">
                    <input type="text" className="form-control" id="title" name="title" placeholder="제목을 입력하세요"></input>
                  </div>
                </div>
                <div className="my-3">
                        <textarea className="form-control" id="content" name="content" rows="20"
                                  placeholder="글 내용을 입력하세요"></textarea>
                </div>
                <div className="row input-group">
                  <div className="my-3 col-sm d-flex justify-content-start gap-3">
                    <div className="input-group">
                      <input type="file" className="form-control" id="files" name="files" multiple></input>
                    </div>
                  </div>
                  <div className="my-3 col-sm d-flex justify-content-end gap-3 mx-0 px-0">
                    <button type="submit" className="btn btn-primary">등록</button>
                    <button type="reset" className="btn btn-secondary" id="btn-cancel">취소</button>
                  </div>
                </div>
                {/*<input type="hidden" className="form-control" id="user-name" name="userName" th:value="${session.userName}"></input>*/}
                {/*  <input type="hidden" className="form-control" id="user-id" name="id" th:value="${session.id}"></input>*/}
              </form>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
)
}

export default BoardWrite;