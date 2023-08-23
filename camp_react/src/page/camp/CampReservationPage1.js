import React, {useEffect, useState} from "react";
import CampIntro from "../../components/reserve/CampIntro";
import AreaList from "../../components/reserve/AreaList";
import '../styles.css';
import '../default.css';
import {DateRange} from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import {addDays, format} from 'date-fns';
import axios from "axios";
import {useParams} from "react-router-dom";

function CampReservationPage1(props) {
  const campIdx = useParams();
  const [mainInfo, setMainInfo] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [siteInfos, setSiteInfos] = useState([]);
  const [siteEmptyCnt, setSiteEmptyCnt] = useState([0]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  useEffect(() => {
    // 캠핑장 메인 정보 저장
    axios.get("http://localhost:8080/reserve/" + campIdx.campIdx)
      .then(res => {
        setMainInfo(res.data.mainInfo);
        setSiteInfos(res.data.mainInfo.siteInfoLists);
      })
      .catch(err => {
        alert(`통신 오류 : ${err}`);
      });

  }, []);

  // 날짜 선택 시 예약 가능한 자리수 저장
  const handleOnChange = item => {
    setDateRange([item.selection]);

    // 최대 숙박예약 기간(수정 필요)
    if (item.selection.endDate > addDays(item.selection.startDate, siteInfos[0].campReservePeriod)) {
      alert(`최대 ${siteInfos[0].campReservePeriod}박까지 예약 가능합니다.`);
      return;
    }

    const params = new URLSearchParams();
    const startDate = format((item.selection.startDate), "yyyy-MM-dd");
    const endDate = format((item.selection.endDate), "yyyy-MM-dd");

    if (startDate !== endDate) {
      const siteInfoIdxs = mainInfo.siteInfoLists.map(m => m.idx);

      params.append('startDate', startDate);
      params.append('endDate', endDate);
      params.append('siteInfoIdxs', siteInfoIdxs);
      axios.post("http://localhost:8080/reserve/selectDate", null, {params: params})
        .then(res => {
          setSiteEmptyCnt(res.data);
          // siteEmptyCnt가 0일 때 날짜 선택 비활성화 미구현(alert창으로 재선택 메시지 출력 처리)
        })
        .catch(err => {
          alert(`통신 오류 : ${err}`);
        });
    }
  };

  useEffect(() => {
    const siteInfoAddData = siteInfos.map((siteInfo, index) => {
      return { ...siteInfo, available: siteEmptyCnt[index] };
    });
    setSiteInfos(siteInfoAddData);
  }, [siteEmptyCnt]);

  return (
    <main className={"container"} style={{marginTop: `160px`}}>
      <div className="row my-4">
        <div className="col-sm-4 mx-auto">
          <CampIntro mainInfo={mainInfo}/>
        </div>
        <div className="col-sm mx-auto">
          <DateRange
            editableDateInputs={false}
            onChange={handleOnChange}
            moveRangeOnFirstSelection={false}
            minDate={addDays(new Date(), 0)}
            maxDate={addDays(new Date(), 60)}
            ranges={dateRange}
            dateDisplayFormat={'yyyy년 MMM d일'}
            locale={locales['ko']}
          />
        </div>
      </div>

      <AreaList siteInfos={siteInfos} siteEmptyCnt={siteEmptyCnt} dateRange={dateRange} campMainIdx={mainInfo.idx} campName={mainInfo.campName}/>

      <div><img className={'img-fluid'} alt={"배치도이미지"} src="/Site_batch.gif"/></div>
    </main>
  );
}

export default CampReservationPage1;