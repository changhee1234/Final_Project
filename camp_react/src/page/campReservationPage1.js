import React, {useEffect, useState} from "react";
import CampIntro from "../components/CampIntro";
import AreaList from "../components/AreaList";
import './styles.css';
import './default.css';
import {DateRange} from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import {addDays, format} from 'date-fns';
import axios from "axios";

function CampReservationPage1(props) {
  const [mainInfo, setMainInfo] = useState([]);
  const [siteEmptyCnt, setSiteEmptyCnt] = useState(0);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ]);

  useEffect(() => {
    axios.get("http://localhost:8080/reserve/" + 1)
      .then(res => {
        setMainInfo(res.data.mainInfo);
      })
      .catch(err => {
        alert(`통신 오류 : ${err}`);
      });
  }, []);


  const handleOnChange = item => {
    setDateRange([item.selection])

    const params = new URLSearchParams;
    const startDate = format((item.selection.startDate), "yyyy-MM-dd");
    const endDate = format((item.selection.endDate), "yyyy-MM-dd");

    if (startDate !== endDate) {
      const siteInfoIdxs = mainInfo.siteInfoLists.map(m => m.idx);

      params.append('startDate', startDate)
      params.append('endDate', endDate)
      params.append('siteInfoIdxs', siteInfoIdxs)
      axios.post("http://localhost:8080/reserve/selectDate", null, {params: params})
        .then(res => {
          setSiteEmptyCnt(res.data);
          // setMainInfo(prev => ({
          //   ...prev,
          //   siteInfoLists: prev.siteInfoLists.map((m) => {
          //     return {...prev, siteEmptyCnt: res.data}
          //   }),
          //   }));
        })
        .catch(err => {
          alert(`통신 오류 : ${err}`);
        });
    }
  };

  return (
    <main className={"container"}>
      <div className="row my-4">
        <div className="col-sm-4">
          <CampIntro mainInfo={mainInfo}/>
        </div>
        <div className="col-sm">
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

      <div><img className={'img-fluid'} src="/Site_batch.gif"/></div>

      <AreaList mainInfo={mainInfo} siteEmptyCnt={siteEmptyCnt}/>
    </main>
  );
}

export default CampReservationPage1;