import React, {useEffect, useState} from 'react';
import axios from "axios";

function CampIntro(props) {
  // const [mainInfo, setMainInfo] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:8080/reserve/")
  //     .then(res => {
  //       console.log(res.data);
  //       setMainInfo(res.data.mainInfo);
  //     })
  //     .catch(err => {
  //       alert(`통신 오류 : ${err}`);
  //     });
  // }, []);

  return (
    <div className={"card"}>
      <img src="/camp_img.jpg" alt="캠프 대표 이미지" className="card-img-top"/>
      <div className={"card-body"}>
        <h5 className={"card-title"}>{props.mainInfo.campName}</h5>
        <p className={"card-text mb-0"}>{props.mainInfo.campIntro}</p>
        <span className="card-text text-muted">{props.mainInfo.campAddress}</span>
      </div>
    </div>
  )
}

export default CampIntro;