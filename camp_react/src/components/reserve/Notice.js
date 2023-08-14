import React from 'react';

function Notice(props) {

  return (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title">이용안내</h5>
        <p className="card-text mb-0">특징 {props.siteInfo.campStyle}</p>
        <p className="card-text mb-0">최대예약기간 {props.siteInfo.campReservePeriod}박 {props.siteInfo.campReservePeriod + 1}일</p>
        <p className="card-text mb-0">기준 인원 총{props.siteInfo.peopleMin}명</p>
        <p className="card-text mb-0">최대 인원 총{props.siteInfo.peopleMax}명</p>
        <p className="card-text mb-0">기준 차량 총 1대</p>
      </div>
    </div>
  )
}
export default Notice;