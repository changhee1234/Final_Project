import React from 'react';
import CampRegisterCombined from "../../componunt/jeongGyuHo/campRegisterCombined";

function ManagerCampRegister(props) {

    // console.log(props.userInfo);
    return (
        <>
            <CampRegisterCombined user={props.user}/>
        </>
    )
}

export default ManagerCampRegister;