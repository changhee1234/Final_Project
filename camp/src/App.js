import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layout/Layout";
import BoardList from "./board/BoardList";
import BoardWrite from "./board/BoardWrite";
import ErrorPage from "./layout/ErrorPage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import BoardDetail from "./board/BoardDetail";

function SelectBoardDetail() {
  return null;
}

function App(props) {
  return (
      <BrowserRouter>
        <Routes>
          {/*<Route path={"/"} element={<BoardList/>}>*/}
          {/*<Route path={"/"} element={<BoardWrite/>}>*/}
          <Route path={"/"} element={<BoardDetail/>}>
            {/*<Route index element={<BoardWrite/>}/>*/}
            {/*<Route path={"board/:boardIdx"} element={<SelectBoardDetail/>}/>*/}
            {/*<Route path={"write"} element={<BoardWrite/>}/>*/}
            <Route path={"*"} element={<ErrorPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
