import React from "react";
import MainCarousel from "../componunt/main/mainCarousel";
import CampRegister from "../componunt/jeongGyuHo/campRegister";
import CampRegister2 from "../componunt/jeongGyuHo/campRegister2";
import CampRegisterCombined from "../componunt/jeongGyuHo/campRegisterCombined";
import SelectPartnerCamp from "../componunt/SelectPartnerCamp";







function MainPage(props) {

    return (
        <main className={"container"}>
            {/*<MainCarousel/>*/}
            {/*<CampRegister/>*/}
            {/*<CampRegister2/>*/}
            {/*<CampRegisterCombined/>*/}
            <SelectPartnerCamp/>
        </main>
    );
}

export default MainPage;