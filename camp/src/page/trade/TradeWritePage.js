import React, {useEffect, useState} from "react";
import axios from 'axios';

function TradeWritePage(props) {

    const [boards, setBoards] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
      fetchBoards();
    }, []);

    const fetchBoards = async () => {
      const response = await axios.get('/api/boards');
      setBoards(response.data);
    };

    // const createBoard = async () => {
    //   const newBoard = { title, content };
    //   const response = await axios.post('/api/boards', newBoard);
    //   setBoards([...boards, response.data]);
    //   setTitle('');
    //   setContent('');
    // };

    // const deleteBoard = async (id) => {
    //   await axios.delete(`/api/boards/${id}`);
    //   setBoards(boards.filter(board => board.id !== id));
    // };
  useEffect(() => {
    function getBoxOffice() {
      fetch('/nowMovie')
          .then(response => response.json())
          .then(data => {
            const selectBox = document.getElementById('box-office');
            let options = "";
            for (let i = 0; i < data.length; i++) {
              options += `<option value="${data[i].movieNm}">${data[i].movieNm}</option>`;
            }
            selectBox.innerHTML = options;
          })
          .catch(error => {
            console.error(error);
          });
    }

    getBoxOffice();
  }, []);


  return (
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-2 my-4"></div>
          <div className="col-sm-8 text-center my-5">
            {/*<h3 className={'mt-5'}>장터 게시판 글 등록</h3>*/}
            <ul className={'col-sm text-center my-4 mt-5'}>
              <li><i className="bi bi-cart4"></i><span className={'text3'}> 장터 게시판 글 등록</span></li></ul>
            <div className="row">
              <form action="/TradeWritePage" method="post" encType="multipart/form-data">
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
                  <div className={"mt-3"}>
                    <input type="number" className="form-control" id="tradePrice" name="tradePrice" placeholder="희망하는 가격을 입력하세요(원)"></input>
                  </div>
                </div>
                <div className="mb-3">
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
                    <button type="submit" className="w-btn w-btn-indigo">등록</button>
                    <button type="reset" className="w-btn w-btn-gray" id="btn-cancel">취소</button>
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

export default TradeWritePage;