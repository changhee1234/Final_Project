import React, {useEffect, useState} from 'react';
import "./partnerReConfirm.css"
import axios from "../../page/layout/axios";
import {format, fromUnixTime} from "date-fns";

function PartnerReservationConfirmation(props) {
  const [reservationList, setReservationList] = useState([]);
  const [partnerInfo, setPartnerInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [cancelPaymentInfo, setCancelPaymentInfo] = useState(null);
  const [dateFormat, setDateFormat] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/partnerInfo/" + props.userInfo.memberIdx
          );
          setPartnerInfo(res.data);

          const reserveRes = await axios.get(
            "http://localhost:8080/reserve/reservationList/" + res.data.idx
          );
          setReservationList(reserveRes.data.result);
        } catch (error) {
          alert(error.message);
        }
    };

    fetchData();
  }, [props.userInfo.memberIdx]);

  const getPaymentInfo = (idx) =>{
    axios.get(`http://localhost:8080/payments/${idx}`)
      .then(res => {
        setPaymentInfo(res.data);
        const timeData = res.data.payDate;
        const timestamp = Math.floor(timeData / 1000)
        const toDate = fromUnixTime(timestamp);
        const dateFormat = format(toDate, "yyyy년 MM월 dd일 HH시 mm분 ss초");
        setDateFormat(dateFormat);
      })
      .catch(err => console.log(err));
  }


  // 파트너 캠핑장예약건 취소
  const cancelReservation = (impUid) => {
    axios.post(`http://localhost:8080/payments/cancel/${impUid}`)
      .then(res => {
        //1. 결제 취소시
        //2. 결제 테이블 결제 상태,취소금액,취소일 수정
        alert(`예약이 취소되었습니다.`);
        setCancelPaymentInfo(res.data.response);

        const cancelData = res.data.response;

        const cancelReqData = {
          cancelAmount: cancelData.cancelAmount,
          cancelledAt: cancelData.cancelledAt,
          status: cancelData.status
        }

        // 예약 테이블 상태 결제 취소로 수정
        axios.put(`http://localhost:8080/reserve/cancel/${impUid}`)
          .catch(err=>console.log(err));

        //결제 테이블 결제 상태,취소금액,취소일 수정
        // axios.put(`http://localhost:8080/payments/cancelDb/${res.data.impUid}`)
        //   .catch(err=>console.log(err));
      })
      .catch(err => {
        console.log(err);
        alert(`환불실패`);
      });
  }

  return (
    <div className={"my-5"}>
      <h4 className={"text-center"}>캠핑장 예약 관리</h4>

      <div>
        <table className={"table table-hover"}>
          <colgroup>
            <col/>
          </colgroup>
          <thead>
          <tr>
            <th>예약주문명</th>
            <th>예약자</th>
            <th>휴대폰번호</th>
            <th>입실일</th>
            <th>퇴실일</th>
            <th>인원수</th>
            <th>차량수</th>
            <th>차량번호</th>
            <th>전기추가</th>
            <th>요청사항</th>
            <th>결제금액</th>
            <th>결제상태</th>
            <th>imp_uid</th>
            <th>결제내역</th>
            <th>예약취소</th>
          </tr>
          </thead>
          <tbody>
          {
            reservationList.map(item =>{
              return (
                <tr key={item.idx}>
                  <td>{item.name}</td>
                  <td>{item.userReservationName}</td>
                  <td>{item.userPhoneNumber}</td>
                  <td>{item.userReservationStart}</td>
                  <td>{item.userReservationEnd}</td>
                  <td>{item.userReservationCnt}</td>
                  <td>{item.userParkCnt}</td>
                  <td>{item.userCarNum}</td>
                  <td>{item.userEleCnt}</td>
                  <td>{item.userMemo}</td>
                  <td>{item.userReservationTotalPrice}</td>
                  <td>{item.payStatus}</td>
                  <td>{item.impUid}</td>
                  {item.payStatus === "결제완료" ? <td><button className={"btn-confirm btn-confirm-primary"} data-bs-toggle="modal" data-bs-target="#paymentModal" onClick={()=>{getPaymentInfo(item.idx)}}>결제내역</button></td> : <td>-</td>}
                  {item.payStatus === "결제완료" ? <td><button className={"btn-confirm btn-confirm-primary"} onClick={()=>{cancelReservation(item.impUid)}}>예약취소</button></td> : <td>-</td>}
                </tr>
              )
            })
          }
          </tbody>
        </table>

        {/* 결제내역 모달*/}
        <div className="modal fade" id="paymentModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content-payment">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">결제내역</h5>
              </div>
              <div className="modal-body">
                {paymentInfo &&
                  <table className={"table table-hover"}>
                    <colgroup>
                      <col style={{width: `20%`}}/>
                      <col style={{width: `80%`}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                      <td>imp_uid</td>
                      <td>{paymentInfo.impUid}</td>
                    </tr>
                    <tr>
                      <td>merchant_uid</td>
                      <td>{paymentInfo.merchantUid}</td>
                    </tr>
                    <tr>
                      <td>예약주문명</td>
                      <td>{paymentInfo.name}</td>
                    </tr>
                    <tr>
                      <td>결제금액</td>
                      <td>{paymentInfo.payAmount}</td>
                    </tr>
                    <tr>
                      <td>결제방법</td>
                      <td>{paymentInfo.payMethod}</td>
                    </tr>
                    <tr>
                      <td>카드이름</td>
                      <td>{paymentInfo.cardName}</td>
                    </tr>
                    <tr>
                      <td>카드번호</td>
                      <td>{paymentInfo.cardNumber}</td>
                    </tr>
                    <tr>
                      <td>결제일</td>
                      <td>{dateFormat}</td>
                    </tr>
                    <tr>
                      <td>결제상태</td>
                      <td>{(() => {
                        if (paymentInfo.payStatus === "paid") {
                          return "결제완료";
                        } else if (paymentInfo.payStatus === "cancel") {
                          return "결제실패";
                        } else {
                          return "-";
                        }
                      })()}</td>
                    </tr>
                    <tr>
                      <td>취소금액</td>
                      <td>{paymentInfo.cancelAmount}</td>
                    </tr>
                    <tr>
                      <td>취소일</td>
                      <td>{paymentInfo.cancelDate}</td>
                    </tr>
                    <tr>
                      <td>온라인 영수증</td>
                      <td><a href={paymentInfo.receiptUrl} className={"text-decoration-none"} target={"_blank"}>온라인 영수증 바로가기</a></td>
                    </tr>
                    </tbody>
                  </table>
                }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PartnerReservationConfirmation;