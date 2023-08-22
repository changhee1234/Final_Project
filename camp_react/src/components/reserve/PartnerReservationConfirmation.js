import React, {useEffect, useState} from 'react';
import "./partnerReConfirm.css"
import axios from "../../page/layout/axios";

function PartnerReservationConfirmation(props) {
  const [reservationList, setReservationList] = useState([]);
  const [partnerInfo, setPartnerInfo] = useState([]);

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

  return (
    <div className={"partner-container"}>
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
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PartnerReservationConfirmation;