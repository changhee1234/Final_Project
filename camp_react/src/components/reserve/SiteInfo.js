import React from 'react';

function SiteInfo(props) {

  return (
    <div>
      <div className="card">
        <img src="/area02.png" alt="구역 대표 이미지" className="card-img-top"/>
        <div className="card-body">
          <h5 className="card-title">{props.siteInfo.areaName}</h5>
          <p className="card-text mb-0">가격 : {props.siteInfo.sitePrice}</p>
        </div>
      </div>
    </div>
  )
}

export default SiteInfo;