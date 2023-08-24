import React from 'react';
import UserReservationConfirmation from "../../components/reserve/UserReservationConfirmation";
import PartnerReservationConfirmation from "../../components/reserve/PartnerReservationConfirmation";
function ReservationConfirmation(props) {

    return (
        <>
          {
              props.userInfo.grade === "user" || props.userInfo.grade === "admin" ? <UserReservationConfirmation userInfo={props.userInfo}/> : <PartnerReservationConfirmation userInfo={props.userInfo}/>          }
        </>
    )
}

export default ReservationConfirmation;