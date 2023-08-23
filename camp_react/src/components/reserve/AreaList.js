import React from 'react';
import {Link} from "react-router-dom";
import {formatDistance} from "date-fns";

function AreaList(props) {
  return (
    <div>
      {
        props.siteInfos && props.siteInfos.map((m) => {
          return (
            <Link to={`/reservation2/reserveStep/${m.idx}`}
                  state={{dateRange: props.dateRange, campName: props.campName, campMainIdx: props.campMainIdx}}
                  key={m.idx}
                  className={'text-decoration-none'}
                  onClick={(e) => {
                    const distance = formatDistance(props.dateRange[0].startDate, props.dateRange[0].endDate);
                    if (m.available === undefined || m.available === 0) {
                      alert(`예약 가능한 자리가 없습니다. 날짜를 다시 선택해주세요`);
                      e.preventDefault();
                    } else if (distance === "less than a minute") {
                      alert(`1박 이상 선택하세요.`);
                      e.preventDefault();
                    }
                  }}>
              <div className="card my-2">
                <div className="row g-0">
                  <div className="col-sm-3">
                    <img src="/area01.png" className="img-fluid" alt=""/>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-body">
                      <h5 className="card-title">{m.areaName}</h5>
                      <p>예약가능 {m.available === undefined ? 0 : m.available}/{m.areaSiteCnt}</p>
                      <p className="card-text text-end">{m.sitePrice}원</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      }
    </div>
  );
}

export default AreaList;