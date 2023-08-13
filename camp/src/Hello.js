import React from "react";
import axios from "axios";

function Hello(props) {

  return (
      <div>
        <button type={'button'} onClick={() => {
        axios.get('http://localhost:8080/hello')
            .then(res => {
              alert(`통신 성공\n${res.data}`)
            })
            .catch(err => {
              alert('통신 실패');
            })
        }}>확인</button>
      </div>
  )
}

export default Hello;