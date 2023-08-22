import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function TradeWritePage(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [tradePrice, setTradePrice] = useState('');
  const [tradeCate, setTradeCate] = useState('');
  const [createDt, setCreateDt] = useState(new Date());
  // const [memberIdx, setMemberIdx] = useState([{idx : 0}]);
  const [file, setFile] = useState(null);

  const navi = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

    const handleFile = () => {
      const formData = new FormData();
      formData.append("file", file);

      axios.post("your_server_url", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
          .then((response) => {
            // 파일 업로드 성공 처리
          })
          .catch((error) => {
            // 파일 업로드 실패 처리
          });
    };

  const handleSubmit = () => {
    axios.post("http://localhost:8080/board/write", null,
        {
          params: {
            // memberIdx: memberIdx,
            title: title,
            content: content,
            userName: userName,
            tradePrice: tradePrice,
            tradeCate: tradeCate,
            createDt: createDt.toISOString().substr(0, 16),
          }
        })
        .then(res => {
          navi('/trade');
        })
        .catch(err => alert(`통신 오류 : ${err}`));
  };

  // 취소 버튼 클릭 시
  const handleCancel = () => {
    navi(-1); // 이전 페이지로 이동
  };

  return (
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-2 my-4"></div>
          <div className="col-sm-8 text-center my-5">
            <ul className={'col-sm text-center my-4 mt-5'}>
              <li><i className="bi bi-cart4"></i><span className={'text3'}> 장터 게시판 글 등록</span></li>
            </ul>
            <form className={'my-5'} onSubmit={handleSubmit} enctype="multipart/form-data">
              <input className={'form-control'} id={'createDt'} name={"createDt"} type="hidden"
                      value={createDt.toISOString().substr(0, 16)}
                      onChange={(e) => setCreateDt(new Date(e.target.value))}/>
              {/*<input className={'form-control'} id={'memberIdx'} type="hidden" name={"memberIdx"} value={memberIdx}*/}
              {/*        onChange={(e) => setMemberIdx(e.target.value)}/>*/}
              <div className="row">
                <div className="my-3 row">
                  <div className="col-sm-2">
                    <select id="box-office" className="form-control me-3" name="tradeCate"
                            value={tradeCate} onChange={(e) => setTradeCate(e.target.value)}>
                      <option value="">분류</option>
                      <option value={"1"}>삽니다</option>
                        <option value={"2"}>팝니다</option>
                    </select>
                  </div>
                  <input type="hidden" className="form-control" id="user-name" name="userName"
                          placeholder="사용자 ID를 입력하세요" onChange={(e) => setUserName(e.target.value)}></input>
                  <div className="col-sm">
                    <input type="text" className="form-control" id="title" name="title" placeholder="제목을 입력하세요"
                            value={title} onChange={(e) => setTitle(e.target.value)}></input>
                  </div>
                  <div className={"mt-3"}>
                    <input type="number" className="form-control" id="tradePrice" name="tradePrice"
                            placeholder="희망하는 가격을 입력하세요(원)" value={tradePrice}
                            onChange={e => setTradePrice(e.target.value)}></input>
                  </div>
                </div>
                <div className="mb-3">
                        <textarea className="form-control" id="content" name="content" rows="20"
                                  placeholder="글 내용을 입력하세요" onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div className="row input-group">
                  <div className="my-3 col-sm d-flex justify-content-start gap-3">
                    <div className="input-group">
                      <input type="file" className="form-control" id="files" name="files" multiple
                             onChange={handleFileChange} onClick={handleFile}></input>
                    </div>
                  </div>
                  <div className="my-3 col-sm d-flex justify-content-end gap-3 mx-0 px-0">
                    <button type="submit" className="w-btn w-btn-indigo" onClick={handleSubmit}>등록</button>
                    <button type="reset" className="w-btn w-btn-gray" onClick={handleCancel}>취소
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