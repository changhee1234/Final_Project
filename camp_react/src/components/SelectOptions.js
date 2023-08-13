import React, {useEffect, useState} from 'react';
import {el} from "date-fns/locale";
import {DateRange} from "react-date-range";
import {addDays, format} from "date-fns";
import * as locales from "react-date-range/dist/locale";
import axios from "axios";
import {Link} from "react-router-dom";

function SelectOptions(props) {
  const [people, setPeople] = useState(1);
  const [cars, setCars] = useState(0);
  const [ele, setEle] = useState(0);
  const [addPrice, setAddPrice] = useState(0);
  const [parkPrice, setParkPrice] = useState(0);
  const [elePrice, setElePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(props.siteInfo.sitePrice);
  const [dateRange, setDateRange] = useState(props.dateRange);

  const handleOnChange = item => {
    setDateRange([item.selection])

    const params = new URLSearchParams;
    const startDate = format((item.selection.startDate), "yyyy-MM-dd");
    const endDate = format((item.selection.endDate), "yyyy-MM-dd");

    // if (startDate !== endDate) {
    //   const siteInfoIdxs = mainInfo.siteInfoLists.map(m => m.idx);
    //
    //   params.append('startDate', startDate)
    //   params.append('endDate', endDate)
    //   params.append('siteInfoIdxs', siteInfoIdxs)
    //   axios.post("http://localhost:8080/reserve/selectDate", null, {params: params})
    //     .then(res => {
    //       const toArr = Object.keys(res.data).map(key => ({[key]: res.data[key]}));
    //       setSiteEmptyCnt(toArr);
    //       // console.log(mainInfo.siteInfoLists);
    //       // console.log(res.data);
    //       // setMainInfo(prev => ({
    //       //   ...prev,
    //       //   siteInfoLists: prev.siteInfoLists.map((m) => {
    //       //     return {...prev, siteEmptyCnt: res.data}
    //       //   }),
    //       //   }));
    //     })
    //     .catch(err => {
    //       alert(`통신 오류 : ${err}`);
    //     });
    // }
  };


  // 인원 추가 옵션
  const handleAddPeople = (e) => {
    if (people === props.siteInfo.peopleMax) {
      alert(`최대 ${props.siteInfo.peopleMax}명까지 선택가능`);
      return false;
    } else {
      setPeople(prev => (prev + 1));
    }
  };

  const handleSubtractPeople = (e) => {
    if (people <= 1) {
      alert("최소 1명 이상");
      return false;
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
    if (cars !== 0) {
      setParkPrice(cars * props.siteInfo.parkPrice);
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

  // 총 가격
  useEffect(() => {
    setTotalPrice(props.siteInfo.sitePrice);
  }, [props.siteInfo.sitePrice]);

  useEffect(() => {
    setDateRange(props.dateRange);
  }, [props.dateRange]);

  return (
    <div className="card">
      <h5 className="card-title">예약 정보</h5>
      <div>
        <p>예약 날짜</p>
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
      <div className="my-3">
        <p className="mb-0">예약인원</p>
        <button type="button" className="btn btn-outline-secondary" onClick={handleAddPeople}>+</button>
        <span className={"mx-3"}>{people}</span>
        <button type="button" className="btn btn-outline-secondary" onClick={handleSubtractPeople}>-</button>
      </div>

      <div>
        <p>추가 차량</p>
        <button type="button" className="btn btn-outline-secondary" onClick={handleAddCars}>+</button>
        <span className={"mx-3"}>{cars}</span>
        <button type="button" className="btn btn-outline-secondary" onClick={handleSubtractCars}>-</button>
        <p>차량 번호 입력</p>
        <input type="text"/>
      </div>
      <div>
        <p>캠핑카 전기 사용</p>
        <button type="button" className="btn btn-outline-secondary" onClick={handleAddEle}>+</button>
        <span className={"mx-3"}>{ele}</span>
        <button type="button" className="btn btn-outline-secondary" onClick={handleSubtractEle}>-</button>
      </div>
      <div className={"my-3"}>
        <p className={"mb-0"}>추가인원 : {addPrice}원</p>
        <p className={"mb-0"}>추가차량 : {parkPrice}원</p>
        <p className={"mb-0"}>추가전기 : {elePrice}원</p>
        <hr/>
        <p className={"mb-0"}>총 결제금액</p>
        <span>{totalPrice + addPrice + parkPrice + elePrice}원</span>
      </div>
      <Link to={`/reservation3`} className="btn btn-primary">예약하기</Link>
    </div>
  )
}

export default SelectOptions;