import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {format, formatDistance} from "date-fns";
import {ko} from "date-fns/locale";
import axios from "axios";



function CampReservationPage3(props) {
  const location = useLocation();
  const [reserveData, setReserveData] = useState(location.state);

  const stateObj = location.state;

  // 날짜, 숙박 관련
  const startDate = format((stateObj.dateRange[0].startDate), "MM.dd(EEE)", {locale: ko});
  const endDate = format((stateObj.dateRange[0].endDate), "MM.dd(EEE)", {locale: ko});
  const nightCnt = formatDistance(stateObj.dateRange[0].startDate, stateObj.dateRange[0].endDate, {
    includeSeconds: false,
    addSuffix: false,
    locale: ko
  });
  const nightCntInt = Number(nightCnt.slice(0, -1));
  const sitePriceDays = stateObj.sitePrice * nightCntInt;

  // 예약자 정보 폼 상태
  const [reserveFrom, setReserveForm] = useState({
    userReservationName: '',
    userPhoneNumber: '',
    userCarNum: '',
    userMemo: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setReserveForm({...reserveFrom, [name]: value});
  };

  const handleSubmit = (e) => {
    const requestData = {
      ...reserveFrom,
      userSiteInfoIdx: stateObj.siteInfo.idx,
      userSiteListIdx: stateObj.selectedSiteIdx,
      userMemberIdx: 1,
      userReservationStart: stateObj.dateRange[0].startDate,
      userReservationEnd: stateObj.dateRange[0].endDate,
      userReservationCnt: stateObj.people,
      userParkCnt: stateObj.cars,
      userEleCnt: stateObj.ele,
      userReservationTotalPrice: sitePriceDays + stateObj.addPrice + stateObj.parkPrice + stateObj.elePrice + "원"
    }
    console.log(requestData);

    axios.post("http://localhost:8080/reserve/insertReservation", requestData)
      .then(res => {
        alert(`예약 성공`);
      })
      .catch(err => {
        alert(`통신 에러 : ${err}`);
      });
    e.preventDefault();
  };

  return (
    <main className={"container"}>
      <form onSubmit={handleSubmit}>
        <div className={"row"}>
          <div className="col-sm-6 mx-auto">
            {/*예약자 정보 입력*/}
            <div>
              <div className={"my-3"}>
                <label htmlFor="reservationName" className={"form-label"}>예약자 이름</label>
                <input
                  type="text"
                  id={"reservationName"}
                  name={"userReservationName"}
                  value={reserveFrom.userReservationName}
                  onChange={handleChange}
                  className={"form-control"} required={true}/>
              </div>

              <div className={"my-3"}>
                <label htmlFor="reservationPhone" className={"form-label"}>휴대폰 번호</label>
                <input
                  type="text"
                  id={"reservationPhone"}
                  name={"userPhoneNumber"}
                  value={reserveFrom.userPhoneNumber}
                  onChange={handleChange}
                  className={"form-control"}/>
              </div>

              <div className={"my-3"}>
                <label htmlFor="carNumber" className={"form-label"}>차량번호</label>
                <input
                  type="tel"
                  id={"carNumber"}
                  name={"userCarNum"}
                  value={reserveFrom.userCarNum}
                  onChange={handleChange}
                  className={"form-control"}/>
              </div>

              <div className={"my-3"}>
                <label htmlFor="memo" className={"form-label"}>요청사항</label>
                <input
                  type="text"
                  id={"memo"}
                  name={"userMemo"}
                  value={reserveFrom.userMemo}
                  onChange={handleChange}
                  className={"form-control"}/>
              </div>
            </div>


            {/*결제 정보*/}
            <div>
              <table className={"table table-hover"}>
                <thead></thead>
                <tbody>
                <tr>
                  <td className={"text-start"}>사이트</td>
                  <td className={"text-end"}>{stateObj.selectedSite}</td>
                </tr>
                <tr>
                  <td className={"text-start"}>기간</td>
                  <td className={"text-end"}>{startDate}~{endDate} / {nightCntInt}박</td>
                </tr>
                <tr>
                  <td className={"text-start"}>예약인원</td>
                  <td className={"text-end"}>{stateObj.people}명</td>
                </tr>
                <tr>
                  <td className={"text-start"}>예약차량</td>
                  <td className={"text-end"}>{stateObj.cars}대</td>
                </tr>
                </tbody>
              </table>

              <div className="card my-3 p-2">
                <div className="card my-1">
                  <div className="card-header d-flex justify-content-between">
                    <p className={"mb-0 fw-bold"}>숙박요금</p>
                    <p className={"mb-0 fw-bold"}>{sitePriceDays}원</p>
                  </div>
                  <div className="card-body d-flex justify-content-between">
                    <p className="card-text mb-0">{startDate}~{endDate} / {nightCntInt}박</p>
                    <p className="card-text mb-0">{sitePriceDays}원</p>
                  </div>
                </div>

                {stateObj.addPrice !== 0 &&
                  <div className="card my-1">
                    <div className="card-header d-flex justify-content-between">
                      <p className="card-text fw-bold mb-0">인원추가 ({stateObj.people - stateObj.siteInfo.peopleMin
                      }명)</p>
                      <p className={"mb-0 fw-bold"}>{stateObj.addPrice}원</p>
                    </div>
                  </div>
                }

                {stateObj.addPrice !== 0 &&
                  <div className="card my-1">
                    <div className="card-header d-flex justify-content-between">
                      <p className={"mb-0 fw-bold"}>차량 추가({stateObj.cars}대)</p>
                      <p className={"mb-0 fw-bold"}>{stateObj.addPrice}원</p>
                    </div>
                  </div>
                }

                {stateObj.ele !== 0 &&
                  <div className="card my-1">
                    <div className="card-header d-flex justify-content-between">
                      <p className={"mb-0 fw-bold"}>전기 추가({stateObj.ele})</p>
                      <p className={"mb-0 fw-bold"}>{stateObj.elePrice}원</p>
                    </div>
                  </div>
                }
                <hr/>
                <div className="card-footer d-flex justify-content-between">
                  <p className={"mb-0 fw-bold"}>총 결제 금액</p>
                  <p
                    className={"mb-0 fw-bold"}>{sitePriceDays + stateObj.addPrice + stateObj.parkPrice + stateObj.elePrice}원</p>
                </div>
              </div>
            </div>

            {/*결제 수단*/}
            <div>
              <div>
                <select className={"form-select"}>
                  <option defaultValue={"카드결제(신용, 체크)"}>카드결제(신용, 체크)</option>
                </select>
              </div>
            </div>
            <div className={"d-grid my-3"}>
              <button type={"submit"} className={"btn btn-primary"}>예약하기(결제)</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default CampReservationPage3;