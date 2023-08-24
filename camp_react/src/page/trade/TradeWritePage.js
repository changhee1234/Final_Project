// 장터 글 등록 페이지 js파일(TradeWritePage)
import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
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

function TradeWritePage({userInfo}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [tradePrice, setTradePrice] = useState('');
  const [tradeCate, setTradeCate] = useState('');
  const [createDt, setCreateDt] = useState(new Date());
  const [imageUrl, setImageUrl] = useState('');
  const [quillIns, setQuillIns] = useState(null); // Quill 에디터 인스턴스 상태 추가
  // const [memberIdx, setMemberIdx] = useState([{idx : 0}]);
  // const [file, setFile] = useState(null);
  // userInfo에서 nickName 가져오기
  useEffect(() => {
    // userInfo를 어떻게 가져오는지에 따라서 아래 코드를 조정해야 합니다.
    const nickNameFromUserInfo = userInfo.nickName;
    setUserName(nickNameFromUserInfo);
  }, []);
  // Quill 에디터 초기화
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
  const navi = useNavigate();

  const [desc, setDesc] = useState('');
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
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

  // const handleImageUpload = async (e) => {
  //   const imageFile = e.target.files[0];
  //   const storageRef = storage.ref();
  //   const imageRef = storageRef.child(`images/${imageFile.name}`);
  //
  //   try {
  //     const snapshot = await imageRef.put(imageFile);
  //     const imageUrl = await snapshot.ref.getDownloadURL();
  //
  //     // Quill 에디터 내에 이미지 삽입
  //     if (quillIns) {
  //       const range = quillIns.getSelection();
  //       quillIns.insertEmbed(range.index, 'image', imageUrl);
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };
  const quillRef = useRef(null);

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
        // Firebase Method : uploadBytes, getDownloadURL
        // await uploadBytes(storageRef, file).then((snapshot) => {
        //   getDownloadURL(snapshot.ref).then((url) => {
        //     // 이미지 URL 에디터에 삽입
        //     editor.insertEmbed(range.index, 'image', url);
        //     // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
        //     editor.setSelection(range.index + 1);
        //   });
        // });
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
  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };


  // // 파일 업로드
  //   const handleFile = () => {
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //
  //       axios.post("http://localhost:8080/board/write", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //           .then((response) => {
  //             // 파일 업로드 성공 처리
  //           })
  //           .catch((error) => {
  //             // 파일 업로드 실패 처리
  //           });
  //     }
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      title: title,
      content: content,
      userName: userName,
      tradePrice: tradePrice,
      tradeCate: tradeCate,
      createDt: createDt.toISOString().substr(0, 16),
    };

    axios.post("http://localhost:8080/board/write", requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(res => {
          navi('/trade');
        })
        .catch(err => alert(`통신 오류 : ${err}`));
  };

  const handleCancel = () => {
    navi(-1); // 이전 페이지로 이동
  };
  const onEditorChange = (value) => {
    setContent(value);
  };

  // // 이미지 압축 함수
  // const compressImage = async (imageFile) => {
  //   const options = {
  //     quality: 0.7, // 압축 품질 설정 (0.1 ~ 1.0 사이의 값)
  //     maxWidth: 800, // 이미지의 최대 너비 설정
  //   };
  //
  //   try {
  //     const compressedFile = await new ImageCompressor(imageFile, options);
  //     return compressedFile;
  //   } catch (error) {
  //     console.error('Error compressing image:', error);
  //     throw error;
  //   }
  // };
  // function onEditorChange(value) {
  //   setContent(value);
  //
  //   const imgTags = value.match(/<img\s+src="data:image[^"]+"\s*>/g);
  //   if (imgTags) {
  //     const extractedImageUrls = imgTags.map(tag => {
  //       const srcMatch = tag.match(/src="([^"]+)"/);
  //       if (srcMatch && srcMatch[1]) {
  //         return srcMatch[1];
  //       }
  //       return null;
  //     });
  //
  //     setImageUrl(extractedImageUrls[0] || '');
  //   }
  // }
  //
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //
  //   try {
  //     const requestData = {
  //       title: title,
  //       content: content,
  //       userName: userName,
  //       tradePrice: tradePrice,
  //       tradeCate: tradeCate,
  //       createDt: createDt.toISOString().substr(0, 16),
  //       imageUrl: imageUrl,
  //     };
  //
  //     // 글 등록
  //     const createResponse = await axios.post("http://localhost:8080/board/write", requestData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //
  //     // 글 등록 성공 후 이미지 업로드
  //     if (createResponse.status === 200) {
  //       await handleUploadImage();
  //     }
  //
  //     navi('/trade');
  //   } catch (err) {
  //     alert(`통신 오류 : ${err}`);
  //   }
  // };

  // const handleUploadImage = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:8080/board/upload-image", {
  //       imageUrl: imageUrl,
  //     });
  //
  //     // 이미지 URL 저장 성공
  //     console.log("Image URL uploaded:", response.data.imageUrl);
  //   } catch (error) {
  //     // 오류 처리
  //     console.error("Image URL upload error:", error);
  //   }
  // };


  return (
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-2 my-4"></div>
          <div className="col-sm-8 text-center my-5">
            <ul className={'col-sm text-center my-4 mt-5'}>
              <li><i className="bi bi-cart4"></i><span className={'text3'}> 장터 게시판 글 등록</span></li>
            </ul>
            <form className={'my-5'} onSubmit={handleSubmit} encType="multipart/form-data">
              <input className={'form-control'} id={'createDt'} name={'createDt'} type="hidden" value={createDt.toISOString().substr(0, 16)} onChange={(e) => setCreateDt(new Date(e.target.value))} />
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
                  <input type="hidden" className="form-control" id="user-name" name="userName" placeholder="사용자 ID를 입력하세요" onChange={(e) => setUserName(e.target.value)}></input>
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
                  {/* 이미지 업로드 인풋 추가 */}
                  {/* 이미지 핸들러 추가 */}
                  <button type="button" className="w-btn w-btn-gray" onClick={imageHandler}>
                    이미지 업로드
                  </button>
                  <ReactQuill
                      ref={quillRef} // Quill 에디터에 ref 추가
                      value={content}
                      onChange={onEditorChange}
                      modules={modules}
                      formats={formats}
                      style={{ height: '500px' }}
                  />
                </div>
                <div className="row input-group my-5">
                  <div className="row input-group my-5">
                    <div className="my-3 col-sm d-flex justify-content-end gap-3 mx-0 px-0">
                      <button type="submit" className="w-btn w-btn-indigo">등록</button>
                      <button type="reset" className="w-btn w-btn-gray" onClick={handleCancel}>취소</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

  )
}

export default TradeWritePage;