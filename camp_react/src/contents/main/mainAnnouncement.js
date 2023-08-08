import React from "react";
import {Link} from "react-router-dom";

function MainAnnouncement(props) {

    const announcementImg = {
        backgroundColor: '#c4c4c4',
        height: '100px',
        width: '640px'
    }

    return (
        <div className={'border bg-light'}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-sm-4 my-3'}>
                        <div className={'d-flex justify-content-between'}>
                            <h4 className={'align-middle'}>알려드립니다</h4>
                            <Link className={'fs-4 text-decoration-none text-dark align-middle'}
                                  to={'/AnnouncementList'}>+</Link>
                        </div>
                        {/*글 목록*/}
                        <ul className={'mt-3'}>
                            <li>
                                <Link to={'/announcementDetail/*'}
                                      className={'text-decoration-none text-secondary d-flex justify-content-start'}>공자시항1</Link>
                            </li>
                            <li>
                                <Link to={'/announcementDetail/*'}
                                      className={'text-decoration-none text-secondary d-flex justify-content-start'}>공자시항2</Link>
                            </li>
                            <li>
                                <Link to={'/announcementDetail/*'}
                                      className={'text-decoration-none text-secondary d-flex justify-content-start'}>공자시항3</Link>
                            </li>
                            <li>
                                <Link to={'/announcementDetail/*'}
                                      className={'text-decoration-none text-secondary d-flex justify-content-start'}>공자시항4</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={'col-sm-8'}>
                        <div className={'d-flex justify-content-center'}>
                            <div style={announcementImg} className={'align-self-center'}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainAnnouncement;