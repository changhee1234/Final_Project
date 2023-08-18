import React from "react";
import {Link} from "react-router-dom";


function Footer(props) {

    return (
        <footer className={"container-fluid py-3 my-4 border-top"}>
            <ul className={"nav justify-content-center border-bottom pb-3 mb-3"}>
                <li className={"nav-item"}>
                    <a href={"#"} className={"nav-link px-2 text-body-secondary"}>Home</a>
                </li>
                <li className={"nav-item"}>
                    <a href={"#"} className={"nav-link px-2 text-body-secondary"}>Features</a>
                </li>
                <li className={"nav-item"}>
                    <a href={"#"} className={"nav-link px-2 text-body-secondary"}>Pricing</a>
                </li>
                <li className={"nav-item"}>
                    <a href={"#"} className={"nav-link px-2 text-body-secondary"}>About</a>
                </li>
                <li className={"nav-item"}>
                    <a href={"#"} className={"nav-link px-2 text-body-secondary"}>Announcement</a>
                </li>
            </ul>
            <p className={"text-center text-body-secondary"}>2023 full505 team3 final</p>
        </footer>
    );
}

export default Footer;