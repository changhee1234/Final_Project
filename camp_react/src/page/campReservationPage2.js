import React, {useEffect, useState} from "react";
import axios from "axios";
import SiteInfo from "../components/SiteInfo";
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import Notice from "../components/Notice";
import SiteLists from "../components/SiteLists";
import SelectOptions from "../components/SelectOptions";


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
          <Notice siteInfo={siteInfo}/>
          <SiteLists siteLists={siteLists}/>
        </div>
        <div className="col-sm">
          <SelectOptions/>
        </div>
      </div>
    </main>
  );
}

export default CampReservationPage2;