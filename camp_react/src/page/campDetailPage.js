import React from "react";
import {Link} from "react-router-dom";


function CampDetailPage(props) {

    return (
        <main className={"container"}>
            <h1 className={'text-center'}>campDetailPage.js</h1>
            <h1 className={'text-center'}>test</h1>
            <Link to={'/reservation1/' + 1} className={'text-decoration-none btn btn-primary'}>예약하기</Link>
        </main>
    );
}

export default CampDetailPage;