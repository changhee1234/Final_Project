import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function TradeWritePage(props) {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [createId, setCreateId] = useState('');
  const [tradePrice, setTradePrice] = useState('');
  const navi = useNavigate();

  const handleSubmit = () => {
    axios.post("http://localhost:8080/board/write", null,
        {
          params: {
            title: title,
            contents: contents,
            createId: createId,
            tradePrice : tradePrice
          }
        })
        .then(res => {
          navi('/board/');
        })
        .catch(err => alert(`통신 오류 : ${err}`));
  };


  return (
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-2 my-4"></div>
          <div className="col-sm-8 text-center my-5">
            {/*<h3 className={'mt-5'}>장터 게시판 글 등록</h3>*/}
            <ul className={'col-sm text-center my-4 mt-5'}>
              <li><i className="bi bi-cart4"></i><span className={'text3'}> 장터 게시판 글 등록</span></li>
            </ul>
            <form className={'my-5'} onSubmit={handleSubmit}>
              <div className="row">
                <div className="my-3 row">
                  <div className="col-sm-2">
                    <select id="box-office" className="form-control me-3" name="movieNm">
                      <option value="{tradeCate}" selected="selected">분류</option>
                      <option value={"1"}>삽니다</option>
                      <option value={"2"}>팝니다</option>
                    </select>
                  </div>
                  <input type="hidden" className="form-control" id="create-id" name="createId"
                         placeholder="사용자 ID를 입력하세요" onChange={e => setCreateId(e.target.value)}></input>
                  <div className="col-sm">
                    <input type="text" className="form-control" id="title" name="title" placeholder="제목을 입력하세요"
                           value={title} onChange={e => setTitle(e.target.value)}></input>
                  </div>
                  <div className={"mt-3"}>
                    <input type="number" className="form-control" id="tradePrice" name="tradePrice"
                           placeholder="희망하는 가격을 입력하세요(원)" value={tradePrice}
                           onChange={e => setTradePrice(e.target.value)}></input>
                  </div>
                </div>
                <div className="mb-3">
                        <textarea className="form-control" id="content" name="content" rows="20"
                                  placeholder="글 내용을 입력하세요" onChange={e => setContents(e.target.value)}></textarea>
                </div>
                <div className="row input-group">
                  <div className="my-3 col-sm d-flex justify-content-start gap-3">
                    <div className="input-group">
                      <input type="file" className="form-control" id="files" name="files" multiple></input>
                    </div>
                  </div>
                  <div className="my-3 col-sm d-flex justify-content-end gap-3 mx-0 px-0">
                    <button type="submit" className="w-btn w-btn-indigo">등록</button>
                    <button type="reset" className="w-btn w-btn-gray" id="btn-cancel">취소
                    </button>
                  </div>
                </div>
                <div className="col-sm-2"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default TradeWritePage;