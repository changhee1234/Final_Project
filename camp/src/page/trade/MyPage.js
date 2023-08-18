// import React from "react";
//
// function MyPage(props) {
//
//   return (
//       <main className={'container my-4'}>
//         <div className={'row my-4'}>
//           <div className={'com-sm-8'}>
//             <div className={'row my-5 mb-3'}>
//               <div className={'col-sm text-center'}><h1>마이 페이지</h1></div>
//               {/*게시판 최신순 및 조회수 정렬*/}
//               <form action='/TradeListPage.js' method={"post"} id={'listCheck'} name={'listCheck'}>
//                 <div className={'col-sm btn-group d-flex justify-content-end'}>
//                   <div className={'form-check mx-3 form-control-inline'}>
//                     <input type='radio' className={'form-check-input'} name={'newest'} value={'newest'} checked></input>
//                     <label htmlFor='newest' className={'form-check-label'}>최신순</label>
//                   </div>
//                   <div className={'form-check mx-3 form-control-inline'}>
//                     <input type='radio' className={'form-check-input'} name={'viewest'} value={'viewest'} ></input>
//                     <label htmlFor='viewest' className={'form-check-label'}>조회순</label>
//                   </div>
//                 </div>
//               </form>
//             </div>
//             {/*게시판 리스트*/}
//             <form action="/TradeListPage.js" method={'post'} id={'form'}>
//               <div>
//                 <table className={'table table-hover table-striped'}>
//                   <colgroup>
//                     <col width="5%" />
//                     <col width="*" />
//                     <col width="50%" />
//                     <col width="*" />
//                     <col width="*" />
//                     <col width="*" />
//                     <col width="*" />
//                   </colgroup>
//                   <thead>
//                   <tr className={'table-secondary text-center'}>
//                     <th>번호</th>
//                     <th>구분</th>
//                     <th className={'text-start'}>제목</th>
//                     <th>작성자</th>
//                     <th>작성일</th>
//                     <th>조회수</th>
//                   </tr>
//                   </thead>
//                   <tbody id={'tbody'}>
//                   <tr className={'text-center'}>
//                     <td>1</td>
//                     <td>판매</td>
//                     <td className={'text-start'}>제목
//                       <a href="#" className={'text-decoration-none'}></a></td>
//                     <td>닉네임</td>
//                     <td>2023.08.04</td>
//                     <td>50</td>
//                   </tr>
//                   </tbody>
//                 </table>
//                 {/*글 등록 및 삭제 버튼*/}
//                 <div className={'d-flex justify-content-end my-3'}>
//                   <a href="#" className={'btn btn-outline-primary mx-2'}>글쓰기</a>
//                   <button type={'button'} className={'btn btn-outline-danger'} id={'delete'}>삭제</button>
//                 </div>
//               </div>
//             </form>
//             {/* ajax 페이징*/}
//             <div className={'my-3'}>
//               <ul className={'pagination justify-content-center'} id={'paginationAjax'}>
//                 <li className={'page-item disabled'}>
//                   <a href="#" className={'page-link'}>&laquo;</a>
//                 </li>
//                 <li className={'page-item disabled'}>
//                   <a href="#" className={'page-link'}>1</a>
//                 </li>
//                 <li className={'page-item disabled'}>
//                   <a href="#" className={'page-link'}>&raquo;</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </main>
//
//   )
// }
//
// export default MyPage;