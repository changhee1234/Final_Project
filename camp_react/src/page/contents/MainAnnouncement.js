// import React from "react";
// import {Link} from "react-router-dom";
//
// function MainAnnouncement(props) {
//
//     const adImg = {
//         backgroundColor: '#c4c4c4',
//         width: '640px',
//         height: '100px'
//     }
//     return (
//         <div>
//             <div className={'row bg-light my-4'}>
//                 <div className={'col-sm-4 mx-auto my-3'}>
//                     <div className={'ms-4'}>
//                         <div className={'d-flex justify-content-between'}>
//                             <h4 className={'align-middle'}>알려드립니다</h4>
//                             <Link to={'/announcementList'}
//                                   className={'text-decoration-none text-black fs-4 align-middle'}>+</Link>
//                         </div>
//                         <ul className={'mt-4'}>
//                             <li>
//                                 <Link to={'/announcementDetail/*'}
//                                       className={'d-flex justify-content-start text-decoration-none text-secondary'}>공지사항
//                                     1</Link>
//                             </li>
//                             <li>
//                                 <Link to={'/announcementDetail/*'}
//                                       className={'d-flex justify-content-start text-decoration-none text-secondary'}>공지사항
//                                     2</Link>
//                             </li>
//                             <li>
//                                 <Link to={'/announcementDetail/*'}
//                                       className={'d-flex justify-content-start text-decoration-none text-secondary'}>공지사항
//                                     3</Link>
//                             </li>
//                             <li>
//                                 <Link to={'/announcementDetail/*'}
//                                       className={'d-flex justify-content-start text-decoration-none text-secondary'}>공지사항
//                                     4</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className={'col-sm-8'}>
//                     <div className={'d-flex justify-content-center align-center'}>
//                         <span style={adImg} className={'mt-4'}></span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default MainAnnouncement;