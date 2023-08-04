import React from "react";
import BoardList from "../board/BoardList";
import BoardWrite from "../board/BoardWrite";

function main(props) {

  return (
      <div className={'container my-3 p-3'}>
        {/*<BoardList/>*/}
        <BoardWrite/>
      </div>
  )
}

export default main;