import React, {useEffect, useState} from "react";
import axios from "axios";
import SiteInfo from "../../components/reserve/SiteInfo";
import {useLocation, useParams} from "react-router-dom";
import Notice from "../../components/reserve/Notice";
import SiteLists from "../../components/reserve/SiteLists";
import SelectOptions from "../../components/reserve/SelectOptions";


function CampReservationPage2(props) {
  const location = useLocation();
  const siteIdx = useParams();
  const dateRange = location.state.dateRange;
  const campName = location.state.campName;
  const campMainIdx = location.state.campMainIdx;
  const [siteInfo, setSiteInfo] = useState([]);
  const [siteLists, setSiteLists] = useState([]);
  const [availSiteList, setAvailSiteList] = useState([]);
  const [selectedSite, setSelectedSite] = useState([]);
  const [selectedSiteIdx, setSelectedSiteIdx] = useState();

  const siteListFromSelectOptions = (data) => {
    setAvailSiteList(data);
  };

  const selectedSiteFromSiteLists = (data) => {
    setSelectedSite(data);
  };

  const selectedSiteIdxFromSiteLists = (data) => {
    setSelectedSiteIdx(data);
  }

  useEffect(() => {
    axios.get("http://localhost:8080/reserve/reserveStep/" + siteIdx.siteIdx)
      .then(res => {
        const sitePrice = (res.data.campSiteInfo.sitePrice).toLocaleString("ko-KR");
        const addPrice = (res.data.campSiteInfo.addPrice).toLocaleString("ko-KR");
        const parkPrice = (res.data.campSiteInfo.parkPrice).toLocaleString("ko-KR");
        const elePrice = (res.data.campSiteInfo.elePrice).toLocaleString("ko-KR");
        setSiteInfo({
          ...res.data.campSiteInfo,
          formatSitePrice:sitePrice,
          formatAddPrice:addPrice,
          formatParkPrice:parkPrice,
          formatElePrice:elePrice
        })

        setSiteLists(res.data.campSiteInfo.campSiteLists)
      })
      .catch(err => {
        alert(`통신 오류 : ${err}`);
      });
  }, []);

  return (
    <main className={"container"}>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-3">
          <SiteInfo siteInfo={siteInfo}/>
          <Notice siteInfo={siteInfo}/>
          <SiteLists siteLists={siteLists} availSiteList={availSiteList} selectedSite={selectedSiteFromSiteLists}
                     selectedSiteIdx={selectedSiteIdxFromSiteLists}/>
        </div>
        <div className="col-sm-5">
          <SelectOptions siteInfo={siteInfo} dateRange={dateRange} campMainIdx={campMainIdx} campName={campName}
                         siteIdx={siteIdx} availSiteList={siteListFromSelectOptions} selectedSite={selectedSite}
                         selectedSiteIdx={selectedSiteIdx}/>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </main>
  );
}

export default CampReservationPage2;