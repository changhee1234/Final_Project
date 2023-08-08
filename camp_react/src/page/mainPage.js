import React from "react";
import MainCarousel from "../contents/main/mainCarousel";
import MainAnnouncement from "../contents/main/mainAnnouncement";


function MainPage(props) {

    return (
        <main className={"container"}>
            <MainCarousel/>
            <MainAnnouncement/>
        </main>
    );
}

export default MainPage;