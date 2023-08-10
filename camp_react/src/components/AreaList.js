import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function AreaList(props) {
  return (
    <div>
      {
        props.mainInfo.siteInfoLists && props.mainInfo.siteInfoLists.map(m => {
          return (
            <Link to={'/reservation2/' + m.idx} className={'text-decoration-none'}>
              <div className="card my-2" key={m.idx}>
                <div className="row g-0">
                  <div className="col-sm-3">
                    <img src="/area01.png" className="img-fluid" alt=""/>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-body">
                      <h5 className="card-title">{m.areaName}</h5>
                      <p>예약가능 {m.siteEmptyCnt}/{m.areaSiteCnt}</p>
                      <p className="card-text text-end">{m.sitePrice}원</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })
      }
    </div>
  );
}

export default AreaList;