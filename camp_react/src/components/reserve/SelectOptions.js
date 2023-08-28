import React, {useEffect, useState} from 'react';
import {DateRange} from "react-date-range";
import {addDays, format, formatDistance} from "date-fns";
import * as locales from "react-date-range/dist/locale";
import axios from "axios";
import {Link} from "react-router-dom";
import {ko} from "date-fns/locale";

function SelectOptions(props) {
  const [people, setPeople] = useState(1);
  const [cars, setCars] = useState(1);
  const [ele, setEle] = useState(0);
  const [addPrice, setAddPrice] = useState(0);
  const [parkPrice, setParkPrice] = useState(0);
  const [elePrice, setElePrice] = useState(0);
  const [sitePrice, setSitePrice] = useState(props.siteInfo.sitePrice);
  const [dateRange, setDateRange] = useState(props.dateRange);
  const [selectedSite, setSelectedSite] = useState(props.selectedSite);
  const [selectedSiteIdx, setSelectedSiteIdx] = useState(props.selectedSiteIdx);

  // 날짜 포맷
  const startDateFormat = format((dateRange[0].startDate), "MM.dd(EEE)", {locale: ko});
  const endDateFormat = format((dateRange[0].endDate), "MM.dd(EEE)", {locale: ko});
  const distance = formatDistance(dateRange[0].startDate, dateRange[0].endDate, {locale: ko});

  const distanceInt = Number(distance.slice(0, -1));


  useEffect(() => {
    setDateRange(props.dateRange);
  }, [props.dateRange]);

  useEffect(() => {
    setSelectedSite(props.selectedSite);
  }, [props.selectedSite]);

  useEffect(() => {
    setSelectedSiteIdx(props.selectedSiteIdx);
  }, [props.selectedSiteIdx]);

  // 이전 페이지에서 선택한 예약 날짜에 예약 가능한 자리 리스트
  useEffect(() => {
    const params = new URLSearchParams();
    const startDate = format((dateRange[0].startDate), "yyyy-MM-dd");
    const endDate = format((dateRange[0].endDate), "yyyy-MM-dd");

    if (startDate !== endDate) {
      const siteInfoIdx = props.siteIdx.siteIdx;

      params.append('startDate', startDate);
      params.append('endDate', endDate);
      params.append('siteInfoIdx', siteInfoIdx);
      axios.post("http://localhost:8080/reserve/availableSiteList", null, {params: params})
        .then(res => {
          props.availSiteList(res.data);
        })
        .catch(err => {
          alert(`통신 오류 : ${err}`);
        });
    }
  }, []);

  // 예약 날짜 변경 - 해당 날짜 예약 가능한 자리 리스트
  const handleOnChange = item => {
    if (item.selection.endDate > addDays(item.selection.startDate, props.siteInfo.campReservePeriod)) {
      alert(`최대 ${props.siteInfo.campReservePeriod}박까지 예약 가능합니다.`);
      return;
    }
    setDateRange([item.selection]);

    const params = new URLSearchParams();
    const startDate = format((item.selection.startDate), "yyyy-MM-dd");
    const endDate = format((item.selection.endDate), "yyyy-MM-dd");

    if (startDate !== endDate) {
      const siteInfoIdx = props.siteInfo.idx;
      params.append('startDate', startDate)
      params.append('endDate', endDate)
      params.append('siteInfoIdx', siteInfoIdx)
      axios.post("http://localhost:8080/reserve/availableSiteList", null, {params: params})
        .then(res => {
          props.availSiteList(res.data);
        })
        .catch(err => {
          alert(`통신 오류 : ${err}`);
        });
    } else {
      props.availSiteList([]);
    }
  };

  // ******** 옵션 추가, 삭제 *******
  // 인원 추가 옵션
  const handleAddPeople = (e) => {
    if (people === props.siteInfo.peopleMax) {
      alert(`최대 ${props.siteInfo.peopleMax}명까지 예약 가능합니다.`);
      return false;
    } else {
      setPeople(prev => (prev + 1));
    }
  };

  const handleSubtractPeople = (e) => {
    if (people <= 1) {
      return;
    } else {
      setPeople(prev => (prev - 1));
    }
  };

  // 차량 추가 옵션
  const handleAddCars = e => {
    setCars(prev => (prev + 1));
  };

  const handleSubtractCars = e => {
    if (cars > 0) {
      setCars(prev => (prev - 1));
    } else {
      return false;
    }
  };

  // 전기 추가 옵션
  const handleAddEle = e => {
    setEle(prev => (prev + 1));
  };

  const handleSubtractEle = e => {
    if (ele > 0) {
      setEle(prev => (prev - 1));
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (people > props.siteInfo.peopleMin) {
      setAddPrice(prev => prev + props.siteInfo.addPrice);
    } else if (people === props.siteInfo.peopleMin) {
      setAddPrice(0);
    }
  }, [people]);

  useEffect(() => {
    if (cars > 1) {
      setParkPrice((cars - 1) * props.siteInfo.parkPrice);
    } else {
      setParkPrice(0);
    }
  }, [cars]);

  useEffect(() => {
    if (ele !== 0) {
      setElePrice(ele * props.siteInfo.elePrice);
    } else {
      setElePrice(0);
    }
  }, [ele]);
  // ******** 옵션 추가, 삭제 끝 *******

  // 기본 가격
  useEffect(() => {
    setSitePrice(props.siteInfo.sitePrice);
  }, [props.siteInfo.sitePrice]);

  const sitePriceDays = sitePrice * distanceInt;
  const addPriceDays = addPrice * distanceInt;
  const parkPriceDays = parkPrice * distanceInt;
  const elePriceDays = elePrice * distanceInt;
  const totalPrice = sitePriceDays + addPriceDays + parkPriceDays + elePriceDays;


  const formatSitePriceDays = sitePriceDays.toLocaleString("ko-KR");
  const formatAddPriceDays = addPriceDays.toLocaleString("ko-KR");
  const formatParkPriceDays = parkPriceDays.toLocaleString("ko-KR");
  const formatElePriceDays = elePriceDays.toLocaleString("ko-KR");
  const formatTotalPriceDays = totalPrice.toLocaleString("ko-KR");

  // html
  return (
    <div className="card">
      <p className={"card-title text-center my-2 fs-4 fw-bold"}>{props.campName}</p>

      <div className={"mx-auto"}>
        <DateRange
          editableDateInputs={true}
          onChange={handleOnChange}
          moveRangeOnFirstSelection={false}
          minDate={addDays(new Date(), 0)}
          maxDate={addDays(new Date(), 60)}
          ranges={dateRange}
          dateDisplayFormat={'yyyy년 MMM d일'}
          locale={locales['ko']}
        />
      </div>

      <p className={"mx-5 mb-0 fs-5 fw-bold"}>예약정보</p>
      {
        selectedSite.length !== 0 &&
        <>
          <div className={"mx-5 my-3"}>
            {!isNaN(distanceInt) ?
              <p className={"mb-0"}>예약날짜 - {startDateFormat} ~ {endDateFormat} / {distanceInt}박</p> :
              <p className={"mb-0"}>예약날짜 - {startDateFormat} ~ {endDateFormat}</p>}
          </div>

          <div className={"mx-5 my-3 d-flex justify-content-between"}>
            <p className={"mb-0"}>예약 사이트</p>
            <p className={"mb-0"}>{selectedSite}</p>
          </div>

          <div className={"d-flex justify-content-between my-3  mx-5"}>
            <span className="mb-0">예약 인원</span>
            <div>
              <button type="button" className="btn btn-outline-secondary" onClick={handleSubtractPeople}>-</button>
              <span className={"mx-3"}>{people}</span>
              <button type="button" className="btn btn-outline-secondary" onClick={handleAddPeople}>+</button>
            </div>
          </div>

          <div className={"d-flex flex-column my-3 mx-5"}>
            <div className={"d-flex justify-content-between"}>
              <span className="mb-0 me-5">예약 차량</span>
              <div>
                <button type="button" className="btn btn-outline-secondary" onClick={handleSubtractCars}>-</button>
                <span className={"mx-3"}>{cars}</span>
                <button type="button" className="btn btn-outline-secondary" onClick={handleAddCars}>+</button>
              </div>
            </div>
          </div>


          <div className={"d-flex justify-content-between mx-5 my-3"}>
            <span className="mb-0">캠핑카 전기 사용(캠핑카 사용 시 필수 선택)</span>
            <div>
              <button type="button" className="btn btn-outline-secondary" onClick={handleSubtractEle}>-</button>
              <span className={"mx-3"}>{ele}</span>
              <button type="button" className="btn btn-outline-secondary" onClick={handleAddEle}>+</button>
            </div>
          </div>


          {startDateFormat !== endDateFormat &&
            <div className={"mx-5 my-3"}>
              <div className={"d-flex justify-content-between"}>
                <p className={"mb-0"}>사이트 금액</p>
                {!isNaN(sitePriceDays) && <p className={"mb-0"}>{formatSitePriceDays}원 / {distanceInt}박</p>}
              </div>
              <div className={"d-flex justify-content-between"}>
                <p className={"mb-0"}>추가 인원</p>
                <p className={"mb-0"}>{formatAddPriceDays}원</p>
              </div>
              <div className={"d-flex justify-content-between"}>
                <p className={"mb-0"}>추가 차량</p>
                <p className={"mb-0"}>{formatParkPriceDays}원</p>
              </div>
              <div className={"d-flex justify-content-between"}>
                <p className={"mb-0"}>추가 전기</p>
                <p className={"mb-0"}>{formatElePriceDays}원</p>
              </div>
              <hr/>
              <div className={"d-flex justify-content-between fw-bold"}>
                <p className={"mb-0"}>총 결제 금액</p>
                <p className={"mb-0"}>{formatTotalPriceDays}원</p>
              </div>
            </div>
          }
        </>
      }

      <Link to={`/reservation3/payment/${props.siteInfo.idx}/`}
            state={{
              dateRange: dateRange,
              siteInfo: props.siteInfo,
              selectedSite: selectedSite,
              selectedSiteIdx: selectedSiteIdx,
              people: people,
              cars: cars,
              ele: ele,
              addPrice: addPrice,
              parkPrice: parkPrice,
              elePrice: elePrice,
              sitePrice: sitePrice,
              formatAddPriceDays: formatAddPriceDays,
              formatParkPriceDays: formatParkPriceDays,
              formatElePriceDays: formatElePriceDays,
              formatSitePriceDays: formatSitePriceDays,
              formatTotalPriceDays: formatTotalPriceDays,
              campName: props.campName,
              campMainIdx: props.campMainIdx
            }}
            className="btn btn-primary mt-3"
            onClick={(e) => {
              const distance = formatDistance(dateRange[0].startDate, dateRange[0].endDate);

              if (selectedSite.length === 0) {
                alert(`사이트(객실)을 선택해주십시오.`);
                e.preventDefault();
              } else if (distance === "less than a minute") {
                alert(`1박 이상 선택하세요.`);
                e.preventDefault();
              } else if (selectedSite === "-") {
                alert(`사이트(객실)을 다시 선택해주십시오.`);
                e.preventDefault();
              }
            }}
      >예약신청</Link>
    </div>
  );
}

export default SelectOptions;