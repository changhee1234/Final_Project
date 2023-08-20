import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {format, formatDistance} from "date-fns";
import {ko} from "date-fns/locale";
import axios from "axios";


function CampReservationPage3(props) {
  const location = useLocation();
  const navigate = useNavigate();
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
  const totalPrice = sitePriceDays + stateObj.addPrice + stateObj.parkPrice + stateObj.elePrice;

  // 예약자 정보 폼 상태
  const [reserveFrom, setReserveForm] = useState({
    userReservationName: '',
    userPhoneNumber: '',
    userEmail: '',
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
      userReservationTotalPrice: totalPrice + "원"
    }
    console.log(requestData);

    axios.post("http://localhost:8080/reserve/insertReservation", requestData)
      .then(res => {
        alert(`예약을 완료하였습니다.`);
      })
      .catch(err => {
        alert(`통신 에러 : ${err}`);
      });
  };

  const doPayment = async () => {
    const {IMP} = window;
    IMP.init('imp56656734');


    const reqData = {
      pg: "html5_inicis.INIpayTest",
      pay_method: "card",
      merchant_uid: `campRe_${new Date()}`,
      name: `예약_${stateObj.campName}_${stateObj.selectedSite}`,
      amount: 1, // totalPrice
      buyer_name: reserveFrom.userReservationName,
      buyer_tel: reserveFrom.userPhoneNumber,
      buyer_email: reserveFrom.userEmail,
    }

    IMP.request_pay(reqData, callback);

    async function callback(rsp) {
      // 결제 사후 검증
      const {data} = await axios.post("http://localhost:8080/payments/" + rsp.imp_uid)
      if (rsp.paid_amount === data.response.amount) {
        alert(`결제 성공 및 검증확인`);
        handleSubmit();
        // 예약테이블에 imp_uid, m_uid저장?

        const reqPayData = {
          payAmount: data.response.amount,
          payState: data.response,
          payDate: data.response
        }
        axios.post("http://localhost:8080/payments/save", reqPayData)
          .then(res => alert(`결제 db 저장 완료`))
          .catch(err => alert(err));
        // 결제 내역 결제 테이블에 저장

        return navigate("/")
      } else {
        alert(`결제 실패하였습니다.`);
        //결제 취소 처리
      }
    }
  };

  return (
    <main className={"container"}>
      <form>
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
                <label htmlFor="userEmail" className={"form-label"}>이메일</label>
                <input
                  type="email"
                  id={"userEmail"}
                  name={"userEmail"}
                  value={reserveFrom.userEmail}
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
                    className={"mb-0 fw-bold"}>{totalPrice}원</p>
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
              {/*<button type={"submit"} className={"btn btn-primary"}>예약하기(결제)</button>*/}
              <button type={"button"} className={"btn btn-primary"} onClick={doPayment}>결제하기</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default CampReservationPage3;