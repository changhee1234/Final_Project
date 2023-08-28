import React from 'react';

function Notice(props) {

  return (
    <div className="card my-3">
      <div className="card-body pb-1">
        <h5 className="card-title fw-bold">이용안내</h5>
        <table className={"table mt-3"} style={{fontSize: `0.9rem`}}>
          <tbody>
          <tr>
            <td>특징</td>
            <td>{props.siteInfo.campStyle}</td>
          </tr>
          <tr>
            <td>최대예약기간</td>
            <td>{props.siteInfo.campReservePeriod}박 {props.siteInfo.campReservePeriod + 1}일</td>
          </tr>
          <tr>
            <td>기준 인원 총</td>
            <td>총 {props.siteInfo.peopleMin}명</td>
          </tr>
          <tr>
            <td>최대 인원 총</td>
            <td>총 {props.siteInfo.peopleMax}명</td>
          </tr>
          <tr>
            <td>기준 차량</td>
            <td>총 1대</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Notice;