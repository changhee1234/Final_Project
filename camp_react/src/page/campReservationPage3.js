import React from "react";
import {useLocation} from "react-router-dom";
import {format, formatDistance} from "date-fns";
import {ko} from "date-fns/locale";


function CampReservationPage3(props) {
  const location = useLocation();
  const stateObj = location.state;
  const startDate = format((location.state.dateRange[0].startDate), "MM.dd(EEE)", {locale: ko});
  const endDate = format((location.state.dateRange[0].endDate), "MM.dd(EEE)", {locale: ko});
  const nightCnt = formatDistance(location.state.dateRange[0].startDate, location.state.dateRange[0].endDate, {
    includeSeconds: false,
    addSuffix: false,
    locale: ko
  });
  const nightCntString = nightCnt.slice(0, -1);
  const nightCntInt = Number(nightCntString);

  const sitePriceDays = stateObj.sitePrice * nightCntInt;

  console.log(sitePriceDays);

  return (
    <main className={"container"}>
      <div className={"row"}>
        <div className="col-sm-6 mx-auto">
          {/*예약자 정보 입력*/}
          <div>
            <div className={"my-3"}>
              <label htmlFor="reservationName" className={"form-label"}>예약자 이름</label>
              <input type="text" id={"reservationName"} className={"form-control"}/>
            </div>
            <div className={"my-3"}>
              <label htmlFor="reservationPhone" className={"form-label"}>휴대폰 번호</label>
              <input type="text" id={"reservationPhone"} className={"form-control"}/>
            </div>

            <div className={"my-3"}>
              <label htmlFor="carNumber" className={"form-label"}>차량번호</label>
              <input type="tel" id={"carNumber"} className={"form-control"}/>
            </div>

            <div className={"my-3"}>
              <label htmlFor="memo" className={"form-label"}>요청사항</label>
              <input type="text" id={"memo"} className={"form-control"}/>
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
                <td className={"text-end"}>{startDate}~{endDate} / {nightCntString}박</td>
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
                <p className={"mb-0 fw-bold"}>{sitePriceDays + stateObj.addPrice + stateObj.parkPrice + stateObj.elePrice}원</p>
              </div>
            </div>
          </div>

          {/*결제 수단*/}
          <div>
            <div>
              <select className={"form-select"}>
                <option selected>카드결제(신용, 체크)</option>
              </select>
            </div>
          </div>
          <div className={"d-grid my-3"}>
            <button type={"button"} className={"btn btn-primary"}>예약하기(결제)</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CampReservationPage3;