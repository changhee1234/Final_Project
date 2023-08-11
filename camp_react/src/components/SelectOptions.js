import React, {useState} from 'react';

function SelectOptions(props) {
  const [people, setPeople] = useState(1);

  const handleClick = (e) => {
      setPeople(prev => (prev + 1));
  };

  return (
    <div className="card">
      <h5 className="card-title">예약 정보</h5>
      <div>
        <p>예약 날짜</p>
        <input type="text" value="08.09 - 08.10(1박)"/>
      </div>
      <div className="my-3">
        <p className="mb-0">예약인원</p>
        <button type="button" className="btn btn-outline-secondary">+</button>
        <span className={"mx-3"}>{people}</span>
        <button type="button" className="btn btn-outline-secondary">-</button>
      </div>
      <div>
        <p>추가 차량</p>
        <button type="button" onClick={handleClick} className="btn btn-outline-secondary">+</button>
        <span className={"mx-3"}>0</span>
        <button type="button" className="btn btn-outline-secondary">-</button>
        <p>차량 번호 입력</p>
        <input type="text"/>
      </div>
      <div>
        <p>캠핑카 전기 사용</p>
        <button type="button" className="btn btn-outline-secondary">+</button>
        <span className={"mx-3"}>0</span>
        <button type="button" className="btn btn-outline-secondary">-</button>
      </div>
      <button className="btn btn-primary">예약하기</button>
    </div>
  )
}

export default SelectOptions;