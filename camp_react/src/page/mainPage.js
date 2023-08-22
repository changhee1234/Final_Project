import React from "react";
import CampRegisterCombined from "../componunt/jeongGyuHo/campRegisterCombined.js";
import SelectPartnerCamp from "../componunt/jeongGyuHo/SelectPartnerCamp.js";








function MainPage(props) {

    return (
        <main className={"container"}>
            {/*<CampRegisterCombined/>*/}
            <SelectPartnerCamp/>
        </main>
    );
}

export default MainPage;