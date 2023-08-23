import React from 'react';
import CampRegisterCombined from "../../componunt/jeongGyuHo/campRegisterCombined";

function ManagerCampRegister(props) {

    return (
        <div>
            <CampRegisterCombined userInfo={props.userInfo}/>
        </div>
    )
}

export default ManagerCampRegister;