import React from 'react';

function CampIntro(props) {

    console.log(props.mainInfo.campMainTitleNewImg);
  return (
    <div className={"card"}>
      <img src={props.mainInfo.campMainTitleNewImg} alt="캠프 대표 이미지" className="card-img-top"/>
      <div className={"card-body"}>
        <h5 className={"card-title"}>{props.mainInfo.campName}</h5>
        <p className={"card-text mb-0"}>{props.mainInfo.campIntro}</p>
        <span className="card-text text-muted">{props.mainInfo.campAddress}</span>
      </div>
    </div>
  )
}

export default CampIntro;