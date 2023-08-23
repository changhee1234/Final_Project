// 장터 글 수정페이지 js파일(UpdatePage)
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';

function UpdatePage(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [tradePrice, setTradePrice] = useState('');
  const [tradeCate, setTradeCate] = useState('');
  const [createDt, setCreateDt] = useState(new Date());
  // const [memberIdx, setMemberIdx] = useState([{idx : 0}]);
  // const [file, setFile] = useState(null);

  const navi = useNavigate();

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  const {tradeBoardIdx} = useParams();
  const [campDetails, setCampDetails] = useState(null);
  const [updateBoard, setUpdateBoard] = useState({
    tradeBoardIdx: '',
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

  // 값 불러오기
  useEffect(() => {
    axios.get(`http://localhost:8080/board/trade/${tradeBoardIdx}`)
        .then(res => {
          console.log(res.data); // 응답 데이터를 콘솔에 기록
          setCampDetails(res.data);
          setUpdateBoard({...res.data});
          setUpdateBoard({
            tradeBoardIdx: res.data.tradeBoardIdx,
            content: res.data.content,
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

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작 막기
    axios.post("http://localhost:8080/board/updateBoard", updateBoard,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateBoard((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-2 my-4"></div>
          <div className="col-sm-8 text-center my-5">
            <ul className={'col-sm text-center my-4 mt-5'}>
              <li><i className="bi bi-cart4"></i><span className={'text3'}> 장터 게시판 글 수정</span></li>
            </ul>
            {/*action={'/UpdatePage'} method={'post'}*/}
            <form className={'my-5'} onSubmit={handleSubmit} enctype="multipart/form-data">
              <input className={'form-control'} id={'createDt'} name={"createDt"} type="hidden"
                     value={createDt.toISOString().substr(0, 16)}
                     onChange={(e) => setCreateDt(new Date(e.target.value))}/>
              {/*<input className={'form-control'} id={'memberIdx'} type="hidden" name={"memberIdx"} value={memberIdx}*/}
              {/*        onChange={(e) => setMemberIdx(e.target.value)}/>*/}
              <div className="row">
                <div className="my-3 row">
                  <div className="col-sm-2">
                    <select
                        id="box-office" className="form-control me-3"
                        name="tradeCate" value={updateBoard.tradeCate} onChange={handleInputChange}>
                      <option value="">분류</option>
                      <option value={"1"}>팝니다</option>
                      <option value={"2"}>삽니다</option>
                    </select>
                  </div>
                  <input type="hidden" className="form-control" id="user-name" name="userName"
                         placeholder="사용자 ID를 입력하세요" onChange={(e) => setUserName(e.target.value)}></input>
                  <div className="col-sm">
                    <input type="text" className="form-control" id="title" name="title" placeholder="제목을 입력하세요"
                           value={updateBoard.title} onChange={handleInputChange} ></input>
                  </div>
                  <div className={"mt-3"}>
                    <input type="number" className="form-control" id="tradePrice" name="tradePrice"
                           placeholder="희망하는 가격을 입력하세요(원)" onChange={handleInputChange}
                           value={updateBoard.tradePrice || ''}></input>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="mb-3">
                    <textarea className="form-control" id="content" name="content" rows="20"
                              placeholder="글 내용을 입력하세요" defaultValue={updateBoard.content}
                              onChange={handleInputChange}></textarea>
                  </div>
                </div>
                <div className="row input-group">
                  <div className="my-3 col-sm d-flex justify-content-start gap-3">
                    <div className="input-group">
                      <input type="file" className="form-control" id="files" name="files" multiple></input>
                    </div>
                  </div>
                  <div className="my-3 col-sm d-flex justify-content-end gap-3 mx-0 px-0">
                    <button type="submit" className="w-btn w-btn-indigo">재등록</button>
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

export default UpdatePage;