// 장터 글 수정페이지 js파일(UpdatePage)
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import ReactQuill from "react-quill";
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3ytVVGW-_CXGnmGXRh8FeGVlvYQB9dLk",
  authDomain: "team3-9bc93.firebaseapp.com",
  projectId: "team3-9bc93",
  storageBucket: "team3-9bc93.appspot.com",
  messagingSenderId: "735474377822",
  appId: "1:735474377822:web:55e48ac1f8e537baff40cf",
  measurementId: "G-FWDJF34RZS"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig) : getApp();
export const analytics = getAnalytics(app);
export const storage = getStorage();
function UpdatePage({userInfo}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [tradePrice, setTradePrice] = useState('');
  const [tradeCate, setTradeCate] = useState('');
  const [createDt, setCreateDt] = useState(new Date());
  const [quillIns, setQuillIns] = useState(null); // Quill 에디터 인스턴스 상태 추가
  const [imageUrl, setImageUrl] = useState('');
  // const [memberIdx, setMemberIdx] = useState([{idx : 0}]);
  // const [file, setFile] = useState(null);

  useEffect(() => {
    if (quillIns) {
      // Quill 에디터 인스턴스가 준비되었을 때
      quillIns.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        // 에디터 내에서 이미지 태그가 추가될 때마다 이미지 URL 추출
        if (node.tagName && node.tagName.toUpperCase() === 'IMG') {
          const imageUrl = node.getAttribute('src');
          if (imageUrl) {
            setImageUrl(imageUrl);
          }
        }
        return delta;
      });
    }
  }, [quillIns]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background',
  ];
  const quillRef = useRef(null);
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
          setCampDetails(res.data);
          // setUpdateBoard({...res.data});
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

  // 이미지 핸들러 함수
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);

      try {
        // 파일명을 "image/Date.now()"로 저장
        const storageRef = ref(storage, `image/${Date.now()}`);

        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // 이미지 삽입
            quillRef.current.getEditor().insertEmbed(range.index, 'image', url);
            // 커서 이동
            quillRef.current.getEditor().setSelection(range.index + 1);
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작 막기

    let updateBoardData = updateBoard;
    updateBoardData.content = content;
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
          console.log(content);
        })
        .catch(err => alert(`통신 오류 : ${err}`));
  };


  // 취소 버튼 클릭 시


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateBoard((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    navi(-1); // 이전 페이지로 이동
  };

  useEffect(() => {
    setContent(updateBoard.content);
  }, [updateBoard.content]);


  const onEditorChange = (editText) => {
    console.log(`dddddddd : ${editText}`);
    setContent(editText); // 사용자가 편집한 내용을 content 상태로 업데이트
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
            <form className={'my-5'} onSubmit={handleSubmit} encType="multipart/form-data">
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
                    {/* 이미지 업로드 인풋 추가 */}
                    {/* 이미지 핸들러 추가 */}
                    <button type="button" className="w-btn w-btn-gray" onClick={imageHandler}>
                      이미지 업로드
                    </button>
                    <ReactQuill
                        ref={quillRef} // Quill 에디터에 ref 추가
                        value={content} // content 상태 사용
                        onChange={onEditorChange}
                        modules={modules}
                        formats={formats}
                        style={{ height: '500px' }}
                    />
                  </div>
                </div>
                <div className="row input-group">
                  {/*<div className="my-3 col-sm d-flex justify-content-start gap-3">*/}
                  {/*  <div className="input-group">*/}
                  {/*    <input type="file" className="form-control" id="files" name="files" multiple></input>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
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

export default UpdatePage;