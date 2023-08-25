import React from 'react';

function SiteInfo(props) {

  return (
    <div>
      <div className="card">
        <img src={props.siteInfo.campSiteNewImg} alt="구역 대표 이미지" className="card-img-top"/>
        <div className="card-body">
          <h5 className="card-title fw-bold">{props.siteInfo.areaName}</h5>
          <div className={"d-flex justify-content-between"}>
            <p>가격</p>
            <p className={"fw-bold"}>{props.siteInfo.sitePrice}원</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiteInfo;