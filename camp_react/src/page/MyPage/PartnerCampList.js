import React from 'react';
import SelectPartnerCamp from "../../componunt/jeongGyuHo/SelectPartnerCamp";

function PartnerCampList(props) {

    return (
        <>
            <SelectPartnerCamp user={props.user}/>
        </>
    )
}

export default PartnerCampList;