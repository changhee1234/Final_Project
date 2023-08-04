import React from "react";
import Header from "./Header";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import BoardWrite from "../board/BoardWrite";

function Layout(props) {

  return (
      <div className={'my-4'}>
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
  )
}

export default Layout;