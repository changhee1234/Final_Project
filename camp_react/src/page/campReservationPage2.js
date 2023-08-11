import React, {useEffect, useState} from "react";
import axios from "axios";
import SiteInfo from "../components/SiteInfo";
import {useLocation, useParams, useSearchParams} from "react-router-dom";


function CampReservationPage2(props) {
  const siteIdx = useParams();
  const [siteInfo, setSiteInfo] = useState([]);
  const [siteLists, setSiteLists] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/reserve/reserveStep/" + siteIdx.siteIdx)
      .then(res => {
        setSiteInfo(res.data.campSiteInfo);
        setSiteLists(res.data.campSiteInfo.campSiteLists)
      })
      .catch(err => {
        alert(`통신 오류 : ${err}`);
      });
  }, []);

  return (
    <main className={"container"}>
      <div className="row">
        <div className="col-sm-6">
          <SiteInfo siteInfo={siteInfo}/>

          <div className="card my-3">
            <div className="card-body">
              <h5 className="card-title">이용안내</h5>
              <p className="card-text mb-0">캠핑장 소개</p>
            </div>
          </div>

          <div className="row row-cols-3 text-center">
            <div className="card g-1 gx-1">
              <h5 className="card-title py-4">자리들</h5>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <h5 className="card-title">예약 정보</h5>
            <div>
              <p>예약 날짜</p>
              <input type="text" value="08.09 - 08.10(1박)"/>
            </div>
            <div className="my-3">
              <p className="mb-0">예약인원</p>
              <button type="button" className="btn btn-outline-secondary">+</button>
              <span>0</span>
              <button type="button" className="btn btn-outline-secondary">-</button>
            </div>
            <div>
              <p>추가 차량</p>
              <button type="button" className="btn btn-outline-secondary">+</button>
              <span>0</span>
              <button type="button" className="btn btn-outline-secondary">-</button>
              <p>차량 번호 입력</p>
              <input type="text"/>
            </div>
            <div>
              <p>캠핑카 전기 사용</p>
              <button type="button" className="btn btn-outline-secondary">+</button>
              <span>0</span>
              <button type="button" className="btn btn-outline-secondary">-</button>
            </div>
            <button className="btn btn-primary">예약하기</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CampReservationPage2;