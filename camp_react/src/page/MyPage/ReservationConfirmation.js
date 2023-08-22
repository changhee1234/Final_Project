import React from 'react';
import UserReservationConfirmation from "../../components/reserve/UserReservationConfirmation";
import PartnerReservationConfirmation from "../../components/reserve/PartnerReservationConfirmation";
function ReservationConfirmation(props) {

    return (
        <>
          {
            props.userInfo.grade === "user" ? <UserReservationConfirmation/> : <PartnerReservationConfirmation userInfo={props.userInfo}/>
          }
        </>
    )
}

export default ReservationConfirmation;